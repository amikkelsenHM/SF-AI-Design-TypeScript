import { Typography } from '@/components/components/ui/typography';
import { NotificationDialog } from '@/components/v2/dialog/notification-dialog';
import {
  useGetAllOrganisations,
  useGetUserById,
} from '@/hooks/queries/accountQuery';
import { useSyncUserMemberships } from '@/hooks/queries/mutations/useSyncUserMemberships';
import { buildOrganisationOptions } from '@/utils/v2/options/transform-organisations';
import { buildRoleOptions } from '@/utils/v2/options/transform-roles';
import { normalizeRoleToKey } from '@/utils/v2/roles';
import { IMembership } from 'models/interfaces/IMembership';
import { RoleKey } from 'models/interfaces/v2/users';
import { useMemo, useRef, useState } from 'react';
import { Organisation } from '../../columns/account-settings/organisation';
import {
  USER_ROLE_DIALOG_BUTTON_CONFIG,
  USER_ROLE_DIALOG_TITLES,
  USER_ROLE_FALLBACK_USER_NAME,
  UserRoleDialogType,
} from './constants';
import UserRoleActionForm, {
  UserRoleActionFormHandle,
  UserRoleFormValues,
} from './user-role-action-form';
import {
  buildManagerRoleKey,
  DEFAULT_MANAGER_ROLE_NAME,
  findOrgWhereUserIsLastManager,
} from './util';

type DialogState =
  | { kind: UserRoleDialogType.None }
  | {
      kind: UserRoleDialogType.Edit;
      values: UserRoleFormValues;
    }
  | {
      kind: UserRoleDialogType.Delete;
      orgName: string;
      values: UserRoleFormValues;
    }
  | {
      kind: UserRoleDialogType.Lockout;
      orgName: string;
      values: UserRoleFormValues;
      origin: UserRoleDialogType.Edit | UserRoleDialogType.Delete;
    };

type DescriptionContext = {
  dialog: DialogState;
  userName: string;
  currentRow: Organisation;
  roleOptions: ReturnType<typeof buildRoleOptions>;
  organisationOptions: ReturnType<typeof buildOrganisationOptions>;
  isLoading: boolean;
  formRef: React.RefObject<UserRoleActionFormHandle>;
  handleFormSubmit: (values: UserRoleFormValues) => Promise<void>;
  triggerFormDelete: (index: number, orgName: string) => Promise<void>;
};

type DescriptionBuilder = (ctx: DescriptionContext) => JSX.Element | null;

const DESCRIPTION_BUILDERS: Partial<
  Record<UserRoleDialogType, DescriptionBuilder>
> = {
  [UserRoleDialogType.Edit]: ({
    dialog,
    roleOptions,
    organisationOptions,
    isLoading,
    formRef,
    handleFormSubmit,
    triggerFormDelete,
  }) => {
    const editDialog = dialog as Extract<
      DialogState,
      { kind: UserRoleDialogType.Edit }
    >;

    return (
      <UserRoleActionForm
        ref={formRef}
        roleOptions={roleOptions}
        defaultValues={editDialog.values}
        organisationOptions={organisationOptions}
        isLoading={isLoading}
        onSubmit={handleFormSubmit}
        onDeleteClick={triggerFormDelete}
      />
    );
  },

  [UserRoleDialogType.Delete]: ({ dialog, currentRow }) => {
    const deleteDialog = dialog as Extract<
      DialogState,
      { kind: UserRoleDialogType.Delete }
    >;

    return (
      <Typography>
        Are you sure you want to remove this {currentRow.role} from{' '}
        {deleteDialog.orgName}? To add the user again you will need to reinvite
        them.
      </Typography>
    );
  },

  [UserRoleDialogType.Lockout]: ({ dialog, userName }) => {
    const lockoutDialog = dialog as Extract<
      DialogState,
      { kind: UserRoleDialogType.Lockout }
    >;

    return (
      <div className="space-y-3">
        <div>
          <Typography>
            <strong>Name:</strong> {userName}
          </Typography>
          <Typography>
            <strong>Organisation:</strong> {lockoutDialog.orgName}
          </Typography>
        </div>
        <Typography>
          This is the last remaining manager for this organisation. If you
          change their role or remove them, you will be locked out of the
          manager-level access and will need to contact the support team to
          reinstate access.
        </Typography>
        <Typography>Are you sure you want to make this change?</Typography>
      </div>
    );
  },
};
interface UseUserRoleActionDialogParams {
  memberships: IMembership[];
  userId: string;
  currentRow: Organisation;
  managerRoleName?: string;
}

export const useUserRoleActionDialog = ({
  memberships,
  userId,
  currentRow,
  managerRoleName = DEFAULT_MANAGER_ROLE_NAME,
}: UseUserRoleActionDialogParams) => {
  const [dialog, setDialog] = useState<DialogState>({
    kind: UserRoleDialogType.None,
  });

  const formRef = useRef<UserRoleActionFormHandle>(null);

  const {
    data: organisations,
    isLoading: isOrgLoading,
    isError,
  } = useGetAllOrganisations();

  const { data: user } = useGetUserById(userId);
  const userName = user
    ? `${user.firstName} ${user.lastName}`
    : USER_ROLE_FALLBACK_USER_NAME;

  const roleOptions = useMemo(() => buildRoleOptions(), []);

  const organisationOptions = useMemo(
    () => buildOrganisationOptions(organisations, isError),
    [organisations, isError]
  );

  const defaultValues: UserRoleFormValues = useMemo(() => {
    const list = memberships ?? [];
    return {
      organisations: list.map(({ organization, role }) => ({
        organizationID: organization?.id,
        role: normalizeRoleToKey(role?.name) as RoleKey,
      })),
    };
  }, [memberships]);

  const { syncMemberships, isSyncing } = useSyncUserMemberships(userId);

  const managerRoleKey: RoleKey = useMemo(
    () => buildManagerRoleKey(managerRoleName),
    [managerRoleName]
  );

  const triggerEdit = () => {
    setDialog({
      kind: UserRoleDialogType.Edit,
      values: defaultValues,
    });
  };

  const triggerTableDelete = async () => {
    const updatedOrganisations: UserRoleFormValues['organisations'] =
      memberships
        .filter((m) => m.organization.id !== currentRow.id)
        .map(({ organization, role }) => ({
          organizationID: organization?.id,
          role: normalizeRoleToKey(role?.name) as RoleKey,
        }));

    const values: UserRoleFormValues = { organisations: updatedOrganisations };

    const dangerousOrg = await findOrgWhereUserIsLastManager(
      memberships,
      values,
      managerRoleKey
    );

    if (dangerousOrg) {
      setDialog({
        kind: UserRoleDialogType.Lockout,
        origin: UserRoleDialogType.Delete,
        orgName: dangerousOrg.orgName,
        values,
      });
      return;
    }

    setDialog({
      kind: UserRoleDialogType.Delete,
      orgName: currentRow.name,
      values,
    });
  };

  const triggerFormDelete = async (index: number, orgName: string) => {
    const updatedOrganisations = defaultValues.organisations.filter(
      (_, idx) => idx !== index
    );

    const values: UserRoleFormValues = { organisations: updatedOrganisations };

    const dangerousOrg = await findOrgWhereUserIsLastManager(
      memberships,
      values,
      managerRoleKey
    );

    if (dangerousOrg) {
      setDialog({
        kind: UserRoleDialogType.Lockout,
        origin: UserRoleDialogType.Delete,
        orgName: dangerousOrg.orgName,
        values,
      });
      return;
    }

    setDialog({
      kind: UserRoleDialogType.Delete,
      orgName,
      values,
    });
  };

  const handleFormSubmit = async (values: UserRoleFormValues) => {
    const dangerousOrg = await findOrgWhereUserIsLastManager(
      memberships,
      values,
      managerRoleKey
    );

    if (dangerousOrg) {
      setDialog({
        kind: UserRoleDialogType.Lockout,
        origin: UserRoleDialogType.Edit,
        orgName: dangerousOrg.orgName,
        values,
      });
      return;
    }

    await syncMemberships(memberships, values.organisations);
    setDialog({ kind: UserRoleDialogType.None });
  };

  const handleConfirm = async () => {
    if (dialog.kind === UserRoleDialogType.Edit) {
      formRef.current?.submit();
      return;
    }

    if (
      dialog.kind === UserRoleDialogType.Delete ||
      dialog.kind === UserRoleDialogType.Lockout
    ) {
      await syncMemberships(memberships, dialog.values.organisations);
      setDialog({ kind: UserRoleDialogType.None });
      return;
    }
  };

  const handleClose = () => {
    if (
      dialog.kind === UserRoleDialogType.Lockout &&
      dialog.origin === UserRoleDialogType.Edit
    ) {
      setDialog({
        kind: UserRoleDialogType.Edit,
        values: dialog.values,
      });
      return;
    }

    setDialog({ kind: UserRoleDialogType.None });
  };

  const isOpen = dialog.kind !== UserRoleDialogType.None;

  const { primaryButtonText, secondaryButtonText, variant } =
    USER_ROLE_DIALOG_BUTTON_CONFIG[dialog.kind];

  const title = USER_ROLE_DIALOG_TITLES[dialog.kind];

  const descriptionBuilder = DESCRIPTION_BUILDERS[dialog.kind];

  const description =
    descriptionBuilder && dialog.kind !== UserRoleDialogType.None
      ? descriptionBuilder({
          dialog,
          userName,
          currentRow,
          roleOptions,
          organisationOptions,
          isLoading: isOrgLoading || isSyncing,
          formRef,
          handleFormSubmit,
          triggerFormDelete,
        })
      : null;

  const Dialog = (
    <NotificationDialog
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title={title}
      description={description}
      primaryButtonText={primaryButtonText}
      secondaryButtonText={secondaryButtonText}
      variant={variant}
      isLoading={isSyncing}
    />
  );

  return {
    triggerEdit,
    triggerTableDelete,
    triggerFormDelete,
    Dialog,
  };
};

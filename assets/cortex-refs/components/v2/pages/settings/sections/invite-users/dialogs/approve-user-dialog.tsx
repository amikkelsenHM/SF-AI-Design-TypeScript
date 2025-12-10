'use client';

import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useGetAllOrganisations } from '@/hooks/queries/accountQuery';
import { RoleKey } from 'models/interfaces/v2/users';
import { NotificationDialog } from '@/components/v2/dialog/notification-dialog';
import { PendingUser } from '@/components/v2/table/columns/account-settings/pending-users';
import { useCreateUserAccount } from '@/hooks/queries/mutations/useApproveUser';
import { UserDetailsSection } from './user-details-section';
import { buildOrganisationOptions } from '@/utils/v2/options/transform-organisations';
import { buildRoleOptions } from '@/utils/v2/options/transform-roles';

export interface OrganisationInput {
  organisation: string;
  role: RoleKey;
}

interface ApproveUserForm {
  organisations: OrganisationInput[];
}

interface ApproveUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApproveUserForm) => Promise<void>;
  isLoading?: boolean;
  user?: PendingUser | null;
}

export const ApproveUserDialog = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  user,
}: ApproveUserDialogProps) => {
  const { mutateAsync: createUser, isPending } = useCreateUserAccount();
  const {
    id = '',
    email = '',
    firstName = '',
    lastName = '',
    company = '',
    reason = '',
    phoneNumber = '',
  } = user || {};

  const form = useForm<ApproveUserForm>({
    defaultValues: {
      organisations: [{ organisation: '', role: '' as RoleKey }],
    },
  });

  const { control, handleSubmit, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'organisations',
  });

  const {
    data: organisations,
    isLoading: isOrgLoading,
    isError,
  } = useGetAllOrganisations();

  const organisationOptions = useMemo(
    () => buildOrganisationOptions(organisations, isLoading, isError),
    [organisations, isLoading, isError]
  );

  const roleOptions = useMemo(() => buildRoleOptions(), []);

  const onDialogSubmit = async ({ organisations }: ApproveUserForm) => {
    if (!user) return;

    const payload = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber ?? '',
      registrationId: id,
      role: 'client',
      disabled: false,
      organizations: organisations.map(({ organisation, role }) => ({
        organizationID: organisation,
        role: role,
      })),
    };

    await createUser(payload);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <NotificationDialog
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleSubmit(onDialogSubmit)}
      title={'Approve User'}
      variant="default"
      isLoading={isLoading}
      primaryButtonText="Cancel"
      secondaryButtonText="Confirm"
      description={
        user && (
          <UserDetailsSection
            user={user}
            showOrganisationFields
            control={control}
            fields={fields}
            append={append}
            remove={remove}
            organisationOptions={organisationOptions}
            roleOptions={roleOptions}
          />
        )
      }
    />
  );
};

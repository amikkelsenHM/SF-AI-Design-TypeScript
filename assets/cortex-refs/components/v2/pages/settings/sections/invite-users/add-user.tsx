'use client';

import { Button } from '@/components/components/ui/button';
import { Typography } from '@/components/components/ui/typography';
import { InfoBlock } from '@/components/v2/info-block';
import { SFDataTable } from '@/components/v2/table-new';
import { addUserColumns } from '@/components/v2/table/columns/account-settings/add-user';
import {
  useAccountMy,
  useGetAllOrganisations,
} from '@/hooks/queries/accountQuery';
import { useBulkCreateAccounts } from '@/hooks/queries/mutations/useBulkCreateAccounts';
import { buildBulkInvitePayload } from '@/utils/v2/csv/build-bulk-payload';
import { buildOrganisationOptions } from '@/utils/v2/options/transform-organisations';
import { buildRoleOptions } from '@/utils/v2/options/transform-roles';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUserSchema } from 'helpers/v2/validations/add-user';
import { OrganizationRole, SpacefluxRole } from 'models/enums/v2/roles';
import { AddUserRow, AddUsersForm } from 'models/interfaces/v2/users';
import Link from 'next/link';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const DEFAULT_USER: AddUserRow = {
  name: '',
  surname: '',
  email: '',
  organisation: '',
  role: '',
};

interface ParentProps {
  title: string;
  description: string;
  onError: (msg: string) => void;
}

export const AddUserSection = ({
  title,
  description,
  onError,
}: ParentProps) => {
  const { data: organisations, isLoading, isError } = useGetAllOrganisations();
  const { data: accountData } = useAccountMy();
  const { payload: account } = accountData || {};
  const { mutateAsync, isPending, isSuccess } = useBulkCreateAccounts();

  const userOrganisations = useMemo(() => {
    if (!organisations || !account) return [];

    const isAdmin = account.roles?.includes(SpacefluxRole.Admin);

    if (isAdmin) return organisations;

    if (!account.memberships) return [];

    const managerOrgIds = new Set(
      account.memberships
        .filter((m: { role?: string }) => m.role === OrganizationRole.Manager)
        .map((m: { organizationId: string }) => m.organizationId)
    );

    return organisations.filter((org) => managerOrgIds.has(org.id));
  }, [organisations, accountData]);

  const organisationOptions = useMemo(
    () => buildOrganisationOptions(userOrganisations, isLoading, isError),
    [userOrganisations, isLoading, isError]
  );

  const roleOptions = useMemo(() => buildRoleOptions(), []);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<AddUsersForm>({
    defaultValues: {
      users: [{ name: '', surname: '', email: '', organisation: '', role: '' }],
    },
    resolver: yupResolver(addUserSchema),
    mode: 'onChange',
  });

  const columns = useMemo(
    () => addUserColumns(control, organisationOptions, roleOptions),
    [control, organisationOptions, roleOptions]
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
  });

  const onSubmit = async ({ users }: AddUsersForm) => {
    const payload = buildBulkInvitePayload(users);
    if (!payload.length) return;

    try {
      await mutateAsync(payload);
      reset({ users: [DEFAULT_USER] });
    } catch (err) {
      const message = (err as Error).message;
      onError(message);
    }
  };

  return (
    <>
      <InfoBlock title={title} description={description} className="mb-4" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SFDataTable
          columns={columns}
          data={fields}
          enableSorting={false}
          enablePagination={false}
        />

        <div className="flex gap-4">
          <Button
            type="button"
            variant="tertiary"
            onClick={() => append(DEFAULT_USER)}
          >
            Add Row
          </Button>
          <Button
            type="button"
            variant="tertiary"
            onClick={() => remove(fields.length - 1)}
            disabled={fields.length <= 1}
          >
            Remove Row
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={!isValid} isLoading={isPending}>
            Send
          </Button>
          {isSuccess && (
            <Typography>
              <span className="text-green-500 mr-1">Invites sent:</span>
              You can review the invite status via the
              <Link href="/settings?tab=users" className="underline mx-1">
                Users
              </Link>
              page
            </Typography>
          )}
        </div>
      </form>
    </>
  );
};

'use client';

import { Button } from '@/components/components/ui/button';
import { Typography } from '@/components/components/ui/typography';
import { ControlledSelectField } from '@/components/v2/select/controlled-select-field';
import { PendingUser } from '@/components/v2/table/columns/account-settings/pending-users';
import { RoleKey } from 'models/interfaces/v2/users';
import { OrganisationInput } from './approve-user-dialog';

interface UserDetailsSectionProps {
  user: PendingUser;
  showOrganisationFields?: boolean;
  control?: any;
  fields?: any[];
  append?: (value: OrganisationInput) => void;
  remove?: (index: number) => void;
  organisationOptions?: { label: string; value: string }[];
  roleOptions?: { label: string; value: string }[];
}

export const UserDetailsSection = ({
  user,
  showOrganisationFields = false,
  control,
  fields = [],
  append,
  remove,
  organisationOptions = [],
  roleOptions = [],
}: UserDetailsSectionProps) => {
  const {
    firstName = '',
    lastName = '',
    email = '',
    company = '',
    reason = '',
  } = user || {};

  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm">
        <p className="text-muted-foreground">
          {showOrganisationFields
            ? 'Please confirm user details before approval:'
            : 'Are you sure you want to reject the user below?'}
        </p>
        <div className="mt-1 leading-6 flex flex-col">
          <Typography variant="label">
            <span className="font-semibold">Name:</span> {firstName} {lastName}
          </Typography>
          <Typography variant="label">
            <span className="font-semibold">Email:</span> {email}
          </Typography>
          <Typography variant="label">
            <span className="font-semibold">Company:</span> {company || '—'}
          </Typography>
          <Typography variant="label">
            <span className="font-semibold">Request Reason:</span>
            {reason || '—'}
          </Typography>
        </div>
      </div>

      {showOrganisationFields && (
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-end">
              <div className="w-full">
                <ControlledSelectField
                  name={`organisations.${index}.organisation`}
                  control={control}
                  label="Organisation"
                  options={organisationOptions}
                  placeholder="Select organisation"
                  required
                />
              </div>
              <div className="w-full">
                <ControlledSelectField
                  name={`organisations.${index}.role`}
                  control={control}
                  label="Role"
                  options={roleOptions}
                  placeholder="Select role"
                  required
                />
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              onClick={() =>
                append?.({ organisation: '', role: '' as RoleKey })
              }
            >
              + Add Row
            </Button>

            <Button
              type="button"
              variant="tertiary"
              size="sm"
              disabled={fields.length === 1}
              onClick={() => remove?.(fields.length - 1)}
            >
              − Remove Row
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

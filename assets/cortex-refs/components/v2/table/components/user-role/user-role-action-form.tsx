'use client';

import { Button } from '@/components/components/ui/button';
import { AccountOrganization, RoleKey } from 'models/interfaces/v2/users';
import { Option } from 'models/types/common';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import TrashIcon from '../../../icons/trash';
import { ControlledSelectField } from '../../../select/controlled-select-field';

type MembershipRow = AccountOrganization;
export type UserRoleFormValues = { organisations: MembershipRow[] };

export type UserRoleActionFormProps = {
  defaultValues: UserRoleFormValues;
  roleOptions: Option[];
  organisationOptions: Option[];
  isLoading?: boolean;
  minRows?: number;
  onSubmit: (values: UserRoleFormValues) => Promise<void> | void;
  onDeleteClick?: (index: number, orgName: string) => void;
};

export type UserRoleActionFormHandle = {
  submit: () => void;
  reset: () => void;
};

const UserRoleActionForm = forwardRef<
  UserRoleActionFormHandle,
  UserRoleActionFormProps
>(
  (
    {
      defaultValues,
      roleOptions,
      organisationOptions,
      isLoading,
      minRows = 1,
      onSubmit,
      onDeleteClick,
    },
    ref
  ) => {
    const form = useForm<UserRoleFormValues>({
      defaultValues: defaultValues ?? {
        organisations: [{ organizationID: '', role: '' }],
      },
      mode: 'onChange',
    });
    const { control, handleSubmit, reset } = form;

    const { fields, append, remove, replace } = useFieldArray({
      control,
      name: 'organisations',
    });

    useEffect(() => {
      if (defaultValues) {
        reset(defaultValues);
        replace(
          defaultValues.organisations?.length
            ? defaultValues.organisations
            : [{ organizationID: '', role: '' as RoleKey }]
        );
      }
    }, [defaultValues, reset, replace]);

    useImperativeHandle(
      ref,
      () => ({
        submit: () => handleSubmit(onSubmit)(),
        reset: () => reset(defaultValues),
      }),
      [handleSubmit, onSubmit, reset, defaultValues]
    );

    const rows = useWatch({ control, name: 'organisations' }) ?? [];
    const selectedOrgIds = useMemo(
      () => rows.map((r) => r?.organizationID).filter(Boolean),
      [rows]
    );

    const orgOptionsForIndex = (index: number) => {
      const current = rows?.[index]?.organizationID ?? '';
      const used = new Set(selectedOrgIds);
      if (current) used.delete(current);
      return organisationOptions.filter((opt) => !used.has(opt.value));
    };

    const remainingOrgsCount = useMemo(() => {
      const used = new Set(selectedOrgIds);
      return organisationOptions.filter((opt) => !used.has(opt.value)).length;
    }, [organisationOptions, selectedOrgIds]);

    const canAdd = remainingOrgsCount > 0 && !isLoading;

    const handleAddRow = () => {
      const used = new Set(selectedOrgIds);
      const firstFree = organisationOptions.find((o) => !used.has(o.value));
      append({ organizationID: firstFree?.value ?? '', role: '' as RoleKey });
    };

    const handleDeleteButtonClick = (index: number) => {
      const orgId = rows[index]?.organizationID;
      const orgName =
        organisationOptions.find((o) => o.value === orgId)?.label ||
        'this organization';
      onDeleteClick?.(index, orgName);
    };

    return (
      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-end">
            <div className="w-full">
              <ControlledSelectField
                name={`organisations.${index}.organizationID`}
                control={control}
                label="Organisation"
                options={orgOptionsForIndex(index)}
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
            <Button
              type="button"
              variant="tertiary"
              size="icon"
              disabled={fields.length <= minRows || isLoading}
              onClick={() => handleDeleteButtonClick(index)}
              className="size-9 shrink-0"
            >
              <TrashIcon />
            </Button>
          </div>
        ))}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="tertiary"
            size="sm"
            onClick={handleAddRow}
            disabled={!canAdd}
          >
            + Add Row
          </Button>
        </div>
      </div>
    );
  }
);

UserRoleActionForm.displayName = 'UserRoleActionForm';
export default UserRoleActionForm;

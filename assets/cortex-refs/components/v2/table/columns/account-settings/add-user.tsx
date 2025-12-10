import { ControlledInputField } from '@/components/v2/inputs/controlled-input-field';
import { ControlledSelectField } from '@/components/v2/select/controlled-select-field';
import { ColumnDef } from '@tanstack/react-table';
import { AddUserRow } from 'models/interfaces/v2/users';
import { Control } from 'react-hook-form';

type Option = {
  value: string;
  label: string;
};

export const addUserColumns = (
  control: Control<{ users: AddUserRow[] }>,
  organisationOptions: Option[],
  roleOptions: Option[]
): ColumnDef<AddUserRow>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <ControlledInputField
        name={`users.${row.index}.name`}
        control={control}
        placeholder="Input name"
        inputSize="xs"
        required
        hideErrorMessage
      />
    ),
  },
  {
    accessorKey: 'surname',
    header: 'Surname',
    cell: ({ row }) => (
      <ControlledInputField
        name={`users.${row.index}.surname`}
        control={control}
        placeholder="Input surname"
        inputSize="xs"
        required
        hideErrorMessage
      />
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <ControlledInputField
        name={`users.${row.index}.email`}
        control={control}
        placeholder="Input email"
        inputSize="xs"
        type="email"
        required
        hideErrorMessage
      />
    ),
  },
  {
    accessorKey: 'organisation',
    header: 'Organisation',
    cell: ({ row }) => (
      <ControlledSelectField
        name={`users.${row.index}.organisation`}
        control={control}
        placeholder="Select organisation"
        options={organisationOptions}
        size="xs"
        required
        hideErrorMessage
        avoidCollision={false}
      />
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <ControlledSelectField
        name={`users.${row.index}.role`}
        control={control}
        placeholder="Select role type"
        options={roleOptions}
        size="xs"
        required
        hideErrorMessage
        avoidCollision={false}
      />
    ),
  },
];

'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { BulkInvitePreviewRow } from '@/hooks/useCsvBulkParse';
import Warning from '@/components/v2/icons/warning';
import SfTooltip from '@/components/v2/tooltip/sf-tooltip';

const toErrorStrings = (err?: unknown | unknown[]): string[] => {
  if (err == null) return [];
  const arr = Array.isArray(err) ? err : [err];
  return arr
    .map((e) => {
      if (e instanceof Error) return e.message;
      if (typeof e === 'string') return e;
      if (typeof e === 'number' || typeof e === 'boolean') return String(e);
      try {
        return JSON.stringify(e);
      } catch {
        return String(e);
      }
    })
    .map((s) => s?.trim())
    .filter(Boolean) as string[];
};

const renderCellWithIcon = (value: string, error?: string | string[]) => {
  const messages = toErrorStrings(error);
  const hasErrors = messages.length > 0;

  const tooltipContent = (
    <div>
      {messages.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </div>
  );
  return (
    <div className="flex items-center justify-between">
      <span>{value}</span>
      {hasErrors && <SfTooltip text={tooltipContent} trigger={<Warning />} />}
    </div>
  );
};

export const hasCellError = (
  {
    fieldErrors: { email, firstName, lastName, phoneNumber } = {},
    organizations,
  }: BulkInvitePreviewRow,
  columnId: string
): boolean => {
  const fieldMap: Record<string, unknown> = {
    email,
    firstName,
    lastName,
    phoneNumber,
    organizations: organizations?.some((o) => !!o.error),
  };

  return !!fieldMap[columnId];
};
export const ERROR_TD_CLASS = 'ring ring-inset ring-border-error';

export const createBulkInvitePreviewColumns =
  (): ColumnDef<BulkInvitePreviewRow>[] => [
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row, getValue }) => {
        const { fieldErrors } = row.original;
        return renderCellWithIcon(
          getValue<string>() || '—',
          fieldErrors?.email
        );
      },
      meta: {
        getStyles: ({ row, columnId }) => ({
          className: hasCellError(row as BulkInvitePreviewRow, columnId)
            ? ERROR_TD_CLASS
            : undefined,
        }),
      },
    },
    {
      accessorKey: 'firstName',
      header: 'First name',
      cell: ({ row, getValue }) => {
        const { fieldErrors } = row.original;
        return renderCellWithIcon(
          getValue<string>() || '—',
          fieldErrors?.firstName
        );
      },
      meta: {
        getStyles: ({ row, columnId }) => ({
          className: hasCellError(row as BulkInvitePreviewRow, columnId)
            ? ERROR_TD_CLASS
            : undefined,
        }),
      },
    },
    {
      accessorKey: 'lastName',
      header: 'Last name',
      cell: ({ row, getValue }) => {
        const { fieldErrors } = row.original;
        return renderCellWithIcon(
          getValue<string>() || '—',
          fieldErrors?.lastName
        );
      },
      meta: {
        getStyles: ({ row, columnId }) => ({
          className: hasCellError(row as BulkInvitePreviewRow, columnId)
            ? ERROR_TD_CLASS
            : undefined,
        }),
      },
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone',
      cell: ({ row, getValue }) => {
        const { fieldErrors } = row.original;
        return renderCellWithIcon(
          getValue<string | undefined>() || '—',
          fieldErrors?.phoneNumber
        );
      },
      meta: {
        getStyles: ({ row, columnId }) => ({
          className: hasCellError(row as BulkInvitePreviewRow, columnId)
            ? ERROR_TD_CLASS
            : undefined,
        }),
      },
    },
    {
      id: 'organizations',
      header: 'Memberships',
      cell: ({ row }) => {
        const { organizations } = row.original;

        const text = organizations?.length
          ? organizations
              .map(
                (i) => `${i.organizationName ?? '—'} (${i.roleLabel ?? '—'})`
              )
              .join(', ')
          : '—';

        const errors = organizations
          ?.map((o) => o.error)
          .filter((e): e is string => typeof e === 'string' && e.trim() !== '');

        return renderCellWithIcon(text, errors.length ? errors : undefined);
      },
      enableSorting: false,
      meta: {
        className: 'min-w-[320px]',
        getStyles: ({ row, columnId }) => ({
          className: hasCellError(row as BulkInvitePreviewRow, columnId)
            ? ERROR_TD_CLASS
            : undefined,
        }),
      },
    },
  ];

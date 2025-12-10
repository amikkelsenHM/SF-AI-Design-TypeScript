'use client';

import { Button } from '@/components/components/ui/button';
import { SFDataTable } from '@/components/v2/table-new';
import { createBulkInvitePreviewColumns } from '@/components/v2/table/columns/account-settings/bulk-preview';
import type { BulkInvitePreviewRow } from '@/hooks/useCsvBulkParse';

type Props = {
  data: BulkInvitePreviewRow[];
  isSending?: boolean;
  onSend: () => void;
  onDiscard: () => void;
  hasErrors?: boolean;
};

export const BulkInviteReview = ({
  data,
  isSending,
  onSend,
  onDiscard,
  hasErrors,
}: Props) => {
  const columns = createBulkInvitePreviewColumns();

  return (
    <div className="space-y-4">
      <SFDataTable
        columns={columns}
        data={data}
        enableSorting
        enablePagination={false}
        enableFiltering={false}
        enableGlobalFilter={false}
      />

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onDiscard} disabled={isSending}>
          Discard
        </Button>
        <Button onClick={onSend} isLoading={isSending} disabled={hasErrors}>
          Send
        </Button>
      </div>
    </div>
  );
};

import CopyToClipboardIcon from '@/components/v2/icons/copy-to-clipboard';
import { ColumnDef } from '@tanstack/react-table';
import { renderDateCell } from 'helpers/v2/dates';
import { DateFormat } from 'models/enums/v2/common';

export const apiKeyColumns: ColumnDef<{ token: string; expiration: string }>[] =
  [
    {
      accessorKey: 'token',
      header: 'API TOKEN',
      cell: (info) => {
        const fullToken = info.getValue() as string;
        return (
          <span
            title={fullToken}
            className="overflow-hidden whitespace-nowrap text-ellipsis block w-85"
          >
            {fullToken}
          </span>
        );
      },
    },
    {
      accessorKey: 'expiration',
      header: 'EXPIRES AT',
      cell: renderDateCell(DateFormat.TimeShort),
      meta: {
        className: 'border-none',
      },
    },
    {
      id: 'copy',
      header: '',
      cell: (info) => {
        const token = info.row.original.token;
        const handleCopy = () => {
          navigator.clipboard.writeText(token);
        };

        return (
          <button
            onClick={handleCopy}
            title="Copy token"
            className="cursor-pointer"
          >
            <CopyToClipboardIcon />
          </button>
        );
      },
      meta: {
        className: 'border-none',
      },
    },
  ];

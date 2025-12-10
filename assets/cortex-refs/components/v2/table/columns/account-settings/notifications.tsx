import { Switch } from '@/components/components/ui/switch';
import DeleteIcon from '@/components/v2/icons/delete';
import { ColumnDef } from '@tanstack/react-table';

interface Notifications {
  name: string;
  email: boolean;
}

export const notificationColumns: ColumnDef<Notifications>[] = [
  {
    accessorKey: 'name',
    header: 'NAME',
    cell: (info) => info.getValue(),
    meta: {
      className: 'border-none w-[420px] min-w-[420px]',
    },
  },
  {
    accessorFn: (row) => row?.email || false,
    id: 'email',
    header: 'EMAIL',
    cell: (info) => {
      // TODO: Add functionality to switch
      return (
        <Switch
          id="email-notification"
          defaultChecked={info.getValue() === true}
          onCheckedChange={(checked) => {
            console.log('Email notification:', checked);
          }}
        />
      );
    },
    meta: {
      className: 'border-none',
    },
  },
  {
    id: 'remove',
    header: 'REMOVE',
    cell: (info) => {
      // TODO: Add button with delete functionality
      return <DeleteIcon />;
    },
    meta: {
      className: 'border-none',
    },
  },
];

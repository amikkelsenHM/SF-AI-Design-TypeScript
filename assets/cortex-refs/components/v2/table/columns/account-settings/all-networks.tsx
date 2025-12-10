import { EditIcon } from '@/components/v2/icons';
import { ColumnDef } from '@tanstack/react-table';
import { platformNetworkColumns } from './platfrom-networks';

interface PlatformNetwork {
  name: string;
  sensors: number;
}

export const allNetworkColumns: ColumnDef<PlatformNetwork>[] = [
  ...platformNetworkColumns,

  // TODO: This column we will not use it right now, but soon need to be implemented

  // {
  //   id: 'action',
  //   header: '',
  //   cell: (info) => (
  //     // TODO: Implement the edit action functionality
  //     <div className="flex flex-row-reverse">
  //       <div className="cursor-pointer">
  //         <EditIcon />
  //       </div>
  //     </div>
  //   ),
  //   meta: {
  //     className: 'border-none',
  //   },
  // },
];

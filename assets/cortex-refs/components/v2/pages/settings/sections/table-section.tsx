'use client';

import { Button } from '@/components/components/ui/button';
import { cn } from '@/components/lib/utils';
import { InfoBlock } from '@/components/v2/info-block';
import { ColumnDef, Row, SFDataTable } from '@/components/v2/table-new';
import { useNavigation } from 'hooks/useNavigation';

interface TableSectionProps<TData> {
  title: string;
  description?: string;
  columns: ColumnDef<TData>[];
  features?: {
    tableKey: string;
    filtering?: boolean;
    globalFilter?: boolean;
    sorting?: boolean;
    pagination?: boolean;
    sortState?: { id: string; desc: boolean }[];
    enableSortingRemoval?: boolean;
  };
  data: TData[];
  event?: () => void;
  eventText?: string;
  disabled?: boolean;
  tableWidth?: string;
  buttonClassName?: string;
  linkTo?: string;
  variant?: 'square' | 'rounded';
  titleClasses?: string;
  readOnly?: boolean;
  showRowCursor?: boolean;
  onRowClick?: (row: Row<TData>) => void;
}

const TableSection = <TData extends object>({
  title,
  columns,
  data,
  event,
  eventText,
  disabled = false,
  tableWidth = 'w-full',
  buttonClassName,
  features,
  linkTo,
  variant = 'square',
  description,
  titleClasses,
  readOnly,
  showRowCursor = false,
  onRowClick,
}: TableSectionProps<TData>) => {
  const { navigate } = useNavigation({ linkTo, event });
  const { filtering, globalFilter, sorting, pagination, enableSortingRemoval } =
    features || {};

  return (
    <div className={cn(tableWidth)}>
      <InfoBlock
        title={title}
        description={description}
        className={titleClasses}
      />
      <SFDataTable
        tableKey={features?.tableKey}
        columns={columns}
        data={data}
        showRowCursor={showRowCursor}
        onRowClick={onRowClick}
        variant={variant}
        enableFiltering={filtering}
        enableGlobalFilter={globalFilter}
        enableSorting={sorting}
        enablePagination={pagination}
        enableSortingRemoval={enableSortingRemoval}
        filterSectionClassNames="px-0"
        initialState={{
          sorting: features?.sortState,
        }}
      />

      {(event || linkTo) && (
        <Button
          variant="secondary"
          onClick={navigate}
          disabled={disabled}
          className={cn('my-4', buttonClassName)}
        >
          {eventText}
        </Button>
      )}
    </div>
  );
};

export default TableSection;

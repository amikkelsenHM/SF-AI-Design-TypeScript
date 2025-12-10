import { Input } from '@/components/components/ui/input';
import { Table } from '@tanstack/react-table';
import { SearchIcon } from '../../icons';

interface SFTableSearchProps<TData> {
  table: Table<TData>;
  placeholder?: string;
}

export function SFTableSearch<TData>({
  table,
  placeholder = 'Search',
}: SFTableSearchProps<TData>) {
  const value = table.getState().globalFilter;

  return (
    <div className="relative flex items-center w-[350px]">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        inputSize="s"
        iconPosition="left"
        icon={<SearchIcon />}
      />
    </div>
  );
}

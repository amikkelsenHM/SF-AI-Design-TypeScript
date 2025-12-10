import { Badge } from '@/components/components/ui/badge';
import { getStatusProps } from 'utils/v2/getStatusProps';

export const StatusBadge = ({ status }: { status: string }) => {
  const { label, state } = getStatusProps(status);
  return <Badge state={state}>{label}</Badge>;
};

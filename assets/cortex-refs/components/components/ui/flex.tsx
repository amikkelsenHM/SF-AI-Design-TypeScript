import { cn } from '@/components/lib/utils';
import { HTMLAttributes } from 'react';

interface FlexProps extends HTMLAttributes<HTMLDivElement> {}

export const Flex = ({ className, ...props }: FlexProps) => {
  return <div className={cn('flex', className)} {...props} />;
};

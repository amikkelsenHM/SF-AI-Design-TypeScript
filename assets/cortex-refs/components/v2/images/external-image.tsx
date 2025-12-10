import { cn } from '@/components/lib/utils';
import Image, { ImageProps } from 'next/image';
import blobImageLoader from 'utils/imageLoader';

export function ExternalImage({ className, ...props }: ImageProps) {
  return (
    <Image
      loader={blobImageLoader}
      unoptimized={false}
      className={cn('rounded-b-lg', className)}
      {...props}
    />
  );
}

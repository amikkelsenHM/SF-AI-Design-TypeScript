import { Button } from '@/components/components/ui/button';
import DownloadIcon from '@/components/v2/icons/download-icon';
import { MouseEvent } from 'react';

interface ObjectTrackingDownloadCellProps {
  disabled?: boolean;
  isLoading: boolean;
  onDownload: () => void;
}

function ObjectTrackingDownloadCell({
  isLoading,
  disabled = false,
  onDownload,
}: ObjectTrackingDownloadCellProps) {
  const handleDownload = (event: MouseEvent) => {
    event.stopPropagation();
    onDownload();
  };

  return (
    <Button
      variant="tertiary"
      className="hover:bg-transparent hover:border-transparent selection:bg-transparent selection:border-transparent focus:bg-transparent focus:border-transparent active:border-transparent"
      size="icon-sm"
      isLoading={isLoading}
      disabled={disabled}
      onClick={handleDownload}
    >
      <DownloadIcon className="size-5" />
    </Button>
  );
}

export default ObjectTrackingDownloadCell;

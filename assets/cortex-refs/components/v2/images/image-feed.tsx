import { ExpandIcon } from '@/components/v2/icons';
import { formatInTimeZone } from 'date-fns-tz';
import { ImageOff } from 'lucide-react';
import { DateFormat } from 'models/enums/v2/common';
import Image from 'next/image';
import { ReactNode, useMemo, useState } from 'react';
import { UTC_TIME_ZONE } from '../date-picker/utils';
import { NotificationDialog } from '../dialog/notification-dialog';
import SectionTitle from '../section-title/section-title';
import {
  getIsImageOld,
  ImageData,
  IMAGE_PLACEHOLDER_DIMENSION,
  NOT_OBSERVING_DIALOG_CONFIG,
  OLD_IMAGE_DIALOG_CONFIG,
} from './image-feed-config';

interface ImageFeedProps {
  title: string;
  imageData: ImageData | null;
  imageAlt: string;
  expandable?: boolean;
  flex?: number;
  actions?: ReactNode;
  onRefreshImage: () => void;
  notObserving?: boolean;
}

const ImageFeed = ({
  title,
  imageData,
  imageAlt,
  expandable = false,
  actions,
  onRefreshImage,
  notObserving,
}: ImageFeedProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const isImageOld = getIsImageOld(imageData);

  const handleClose = () => setIsModalOpen(false);

  const timestampString = useMemo(() => {
    if (!imageData) return;

    const date = new Date(imageData.timestamp);
    const formattedDate = formatInTimeZone(
      date,
      UTC_TIME_ZONE,
      `${DateFormat.DateSlashShort} ${DateFormat.WeekDayShort} ${DateFormat.TimeWithSeconds} ${DateFormat.TimeZone}`
    );

    return `Timestamp: ${formattedDate}`;
  }, [imageData?.timestamp]);

  return (
    <div className="flex-1">
      <SectionTitle
        text={title}
        variant="s"
        actions={
          <>
            {timestampString && (
              <span className="typography-body-sm">{timestampString}</span>
            )}
            {expandable ? <ExpandIcon /> : actions}
          </>
        }
      />
      <div
        ref={(node) => setContainer(node)}
        className="relative aspect-[790/470] md:max-h-[470px] rounded-t-base rounded-b-lg overflow-hidden"
      >
        {isImageOld && container && (
          <NotificationDialog
            isOpen={isModalOpen}
            container={container}
            onClose={handleClose}
            onConfirm={onRefreshImage}
            {...(notObserving
              ? NOT_OBSERVING_DIALOG_CONFIG
              : OLD_IMAGE_DIALOG_CONFIG)}
          />
        )}
        {imageData ? (
          <Image
            alt={imageAlt}
            fill
            src={imageData.url}
            sizes="(max-width: 790px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-background-subtle rounded-b-lg flex flex-col items-center justify-center">
            <span className="text-text-muted">No image available</span>
            <ImageOff
              width={IMAGE_PLACEHOLDER_DIMENSION}
              height={IMAGE_PLACEHOLDER_DIMENSION}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageFeed;

export interface ImageData {
  url: string;
  timestamp: string;
}

const IMAGE_THRESHOLD_MINUTES = 30;
export const IMAGE_PLACEHOLDER_DIMENSION = 150;

const COMMON_IMAGE_DIALOG_CONFIG = {
  variant: 'warning',
  title: 'Old Image',
  contentClassName: 'absolute w-71',
  closeOnOutsideInteraction: false,
} as const;

export const OLD_IMAGE_DIALOG_CONFIG = {
  ...COMMON_IMAGE_DIALOG_CONFIG,
  description: `The image is more than ${IMAGE_THRESHOLD_MINUTES} minutes old. Please refresh to see a new image.`,
  primaryButtonText: 'Cancel',
  secondaryButtonText: 'Refresh',
} as const;

export const NOT_OBSERVING_DIALOG_CONFIG = {
  ...COMMON_IMAGE_DIALOG_CONFIG,
  description: `The image is more than ${IMAGE_THRESHOLD_MINUTES} minutes old.`,
  primaryButtonText: 'Ok',
} as const;

export const getIsImageOld = (imageData: ImageData | null) => {
  if (!imageData) return false;

  const now = new Date();

  const timestampDate = new Date(imageData.timestamp);

  const differenceInMs = now.getTime() - timestampDate.getTime();
  const differenceInMinutes = differenceInMs / 1000 / 60;

  return differenceInMinutes > IMAGE_THRESHOLD_MINUTES;
};

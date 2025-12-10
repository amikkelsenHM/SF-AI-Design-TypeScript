export const SKELETON_WIDTHS = {
  XS: 'w-8',
  SM: 'w-10',
  MD: 'w-12',
  LG: 'w-16',
  XL: 'w-20',

  TEXT_XS: 'w-24',
  TEXT_SM: 'w-28',
  TEXT_MD: 'w-32',
  TEXT_LG: 'w-36',
  TEXT_XL: 'w-40',

  CONTENT_XS: 'w-34',
  CONTENT_SM: 'w-42',
  CONTENT_MD: 'w-50',
  CONTENT_LG: 'w-56',
  CONTENT_XL: 'w-60',
  CONTENT_XXL: 'w-62',

  LARGE_XS: 'w-87',
  LARGE_SM: 'w-99',
  LARGE_MD: 'w-107',
  LARGE_LG: 'w-138',
  LARGE_XL: 'w-198',
  LARGE_XXL: 'w-249',

  CHART: 'w-400',
  FULL: 'w-full',

  RESPONSIVE_XS: 'w-full max-w-34',
  RESPONSIVE_SM: 'w-full max-w-42',
  RESPONSIVE_MD: 'w-full max-w-50',
  RESPONSIVE_LG: 'w-full max-w-56',
  RESPONSIVE_XL: 'w-full max-w-60',
  RESPONSIVE_XXL: 'w-full max-w-62',

  RESPONSIVE_LARGE_XS: 'w-full max-w-87',
  RESPONSIVE_LARGE_SM: 'w-full max-w-99',
  RESPONSIVE_LARGE_MD: 'w-full max-w-107',
  RESPONSIVE_LARGE_LG: 'w-full max-w-138',
  RESPONSIVE_LARGE_XL: 'w-full max-w-198',
} as const;

export const SKELETON_HEIGHTS = {
  XS: 'h-3',
  SM: 'h-4',
  MD: 'h-5',
  LG: 'h-6',
  XL: 'h-8',
  XXL: 'h-10',

  AVATAR_SM: 'h-8',
  AVATAR_MD: 'h-10',
  AVATAR_LG: 'h-12',
  AVATAR_XL: 'h-36',

  CONTENT_SM: 'h-[18px]',
  CONTENT_MD: 'h-20',
  CONTENT_LG: 'h-24',

  LARGE_SM: 'h-60',
  LARGE_MD: 'h-80',
  LARGE_LG: 'h-100',
  LARGE_XL: 'h-115',

  FULL: 'h-full',
} as const;

export const SKELETON_GAPS = {
  NONE: 'gap-0',
  XS: 'gap-1',
  SM: 'gap-2',
  MD: 'gap-3',
  LG: 'gap-4',
  XL: 'gap-5',
} as const;

export const SKELETON_PADDING = {
  NONE: 'p-0',
  XS: 'p-1',
  SM: 'p-2',
  MD: 'p-3',
  LG: 'p-4',
  XL: 'p-5',

  BOTTOM_SM: 'pb-5',
  BOTTOM_MD: 'pb-10',
  BOTTOM_LG: 'pb-12',

  TOP_SM: 'pt-0',
  TOP_MD: 'pt-6',

  VERTICAL_SM: 'py-5',
} as const;

export const SKELETON_CLASSES = {
  BACKGROUND_SUBTLE: 'bg-background-subtle',
  BACKGROUND_CONTRAST: 'bg-background-contrast',
  ROUNDED: 'rounded-lg',
  ROUNDED_MD: 'rounded-md',
  ROUNDED_FULL: 'rounded-full',
} as const;

export const SKELETON_SIZES = {
  AVATAR: {
    SM: `${SKELETON_WIDTHS.XS} ${SKELETON_HEIGHTS.AVATAR_SM}`,
    MD: `${SKELETON_WIDTHS.SM} ${SKELETON_HEIGHTS.AVATAR_MD}`,
    LG: `${SKELETON_WIDTHS.MD} ${SKELETON_HEIGHTS.AVATAR_LG}`,
    XL: `${SKELETON_WIDTHS.XL} ${SKELETON_HEIGHTS.AVATAR_XL}`,
  },
  TEXT: {
    SM: `${SKELETON_WIDTHS.TEXT_SM} ${SKELETON_HEIGHTS.SM}`,
    MD: `${SKELETON_WIDTHS.TEXT_MD} ${SKELETON_HEIGHTS.SM}`,
    LG: `${SKELETON_WIDTHS.TEXT_LG} ${SKELETON_HEIGHTS.MD}`,
    XL: `${SKELETON_WIDTHS.TEXT_XL} ${SKELETON_HEIGHTS.MD}`,
  },
  CONTENT: {
    SM: `${SKELETON_WIDTHS.CONTENT_SM} ${SKELETON_HEIGHTS.SM}`,
    MD: `${SKELETON_WIDTHS.CONTENT_MD} ${SKELETON_HEIGHTS.SM}`,
    LG: `${SKELETON_WIDTHS.CONTENT_LG} ${SKELETON_HEIGHTS.SM}`,
    XL: `${SKELETON_WIDTHS.CONTENT_XL} ${SKELETON_HEIGHTS.SM}`,
  },
} as const;

export const ANIMATION_SHIMMER = 'skeleton-shimmer';

import React from 'react';
import { cn } from '../utils';
import {
  SKELETON_CLASSES,
  SKELETON_GAPS,
  SKELETON_HEIGHTS,
  SKELETON_PADDING,
  SKELETON_WIDTHS,
} from './constants';
import { LayoutBuilder } from './index';

class SkeletonFactory {
  static create(): LayoutBuilder {
    return new LayoutBuilder();
  }

  static card(config?: {
    titleWidth?: string;
    contentWidth?: string;
    metaWidth?: string;
    padding?: string;
    gap?: string;
    className?: string;
    showHeader?: boolean;
  }): LayoutBuilder {
    const {
      titleWidth = SKELETON_WIDTHS.CONTENT_MD,
      contentWidth = SKELETON_WIDTHS.CONTENT_SM,
      metaWidth = SKELETON_WIDTHS.CONTENT_XS,
      padding = SKELETON_PADDING.BOTTOM_SM,
      gap = SKELETON_GAPS.SM,
      className = `${SKELETON_CLASSES.BACKGROUND_SUBTLE} ${SKELETON_CLASSES.ROUNDED}`,
    } = config || {};

    return new LayoutBuilder()
      .layout({
        direction: 'column',
        gap,
        padding,
        className,
      })
      .text(titleWidth)
      .text(contentWidth)
      .text(contentWidth)
      .text(metaWidth);
  }

  private static createCardGroup(
    builder: LayoutBuilder,
    cardConfig?: Parameters<typeof SkeletonFactory.card>[0]
  ): LayoutBuilder {
    const {
      titleWidth = SKELETON_WIDTHS.RESPONSIVE_XXL,
      contentWidth = SKELETON_WIDTHS.RESPONSIVE_MD,
      metaWidth = SKELETON_WIDTHS.TEXT_MD,
      padding = `${SKELETON_PADDING.BOTTOM_SM} pt-2`,
      gap = SKELETON_GAPS.MD,
      className = `${SKELETON_WIDTHS.FULL} ${SKELETON_CLASSES.BACKGROUND_SUBTLE} ${SKELETON_CLASSES.ROUNDED}`,
    } = cardConfig || {};

    return builder.group(
      (builder) =>
        builder
          .layout({
            direction: 'column',
            gap,
            padding,
            className,
          })
          .text(titleWidth)
          .text(contentWidth)
          .text(contentWidth)
          .text(metaWidth),
      {}
    );
  }

  static cardGrid(config?: {
    count?: number;
    gap?: string;
    className?: string;
    cardConfig?: Parameters<typeof SkeletonFactory.card>[0];
  }): LayoutBuilder {
    const {
      count = 4,
      gap = SKELETON_GAPS.XL,
      cardConfig,
      className = '',
    } = config || {};

    return new LayoutBuilder()
      .layout({
        direction: 'column',
        gap: SKELETON_GAPS.SM,
        className: SKELETON_WIDTHS.FULL,
      })
      .text(
        SKELETON_WIDTHS.TEXT_MD,
        SKELETON_HEIGHTS.SM,
        cardConfig?.showHeader !== false ? 'inline' : 'hidden'
      )
      .group((builder) => {
        let gridBuilder = builder.layout({
          direction: 'row',
          gap,
          className,
        });

        for (let i = 0; i < count; i++) {
          gridBuilder = this.createCardGroup(gridBuilder, cardConfig);
        }

        return gridBuilder;
      });
  }

  static sensorDetailHeader(config?: {
    titleWidth?: string;
    contentWidth?: string;
    metaWidth?: string;
    padding?: string;
    gap?: string;
    className?: string;
    avatarSize?: 'sm' | 'md' | 'lg' | 'xl';
  }): LayoutBuilder {
    const {
      titleWidth = SKELETON_WIDTHS.CONTENT_XS,
      contentWidth = SKELETON_WIDTHS.CONTENT_XL,
      metaWidth = SKELETON_WIDTHS.CONTENT_MD,
      padding = SKELETON_PADDING.VERTICAL_SM,
      gap = SKELETON_GAPS.LG,
      className = `${SKELETON_CLASSES.BACKGROUND_SUBTLE} ${SKELETON_CLASSES.ROUNDED}`,
      avatarSize = 'xl',
    } = config || {};

    return new LayoutBuilder()
      .layout({
        direction: 'row',
        gap,
        padding,
        className,
      })
      .group(
        (builder) =>
          builder
            .layout({
              direction: 'column',
              gap: SKELETON_GAPS.XL,
              className: 'align-center justify-center',
            })
            .text(titleWidth)
            .text(contentWidth)
            .text(metaWidth),
        {
          className: 'flex-1',
        }
      );
  }

  static launchpadHeader(config?: {
    titleWidth?: string;
    contentWidth?: string;
    sectionHeaderWidth?: string;
    padding?: string;
    gap?: string;
    className?: string;
  }): LayoutBuilder {
    const {
      titleWidth = SKELETON_WIDTHS.LARGE_SM,
      contentWidth = SKELETON_WIDTHS.LARGE_XL,
      sectionHeaderWidth = SKELETON_WIDTHS.LARGE_LG,
      padding = SKELETON_PADDING.VERTICAL_SM,
      gap = SKELETON_GAPS.LG,
      className = `${SKELETON_CLASSES.BACKGROUND_SUBTLE} ${SKELETON_CLASSES.ROUNDED}`,
    } = config || {};

    return new LayoutBuilder()
      .layout({
        direction: 'row',
        gap,
        padding,
        className,
      })
      .group(
        (builder) =>
          builder
            .layout({
              direction: 'column',
              gap: SKELETON_GAPS.XL,
              className: 'align-center justify-center',
            })
            .text(titleWidth)
            .text(contentWidth)
            .text(sectionHeaderWidth),
        {
          className: 'flex-1',
        }
      );
  }

  static textFields(config: {
    fields: Array<{
      width: string;
      count: number;
    }>;
    gap?: string;
    direction?: 'row' | 'column';
    className?: string;
  }): LayoutBuilder {
    const {
      fields,
      gap = SKELETON_GAPS.MD,
      direction = 'column',
      className = SKELETON_WIDTHS.FULL,
    } = config;

    const builder = new LayoutBuilder().layout({
      direction,
      gap,
      className,
    });

    fields.forEach(({ width, count }) => {
      for (let i = 0; i < count; i++) {
        builder.text(width);
      }
    });

    return builder;
  }

  static liveFeedRectangles(config?: {
    count?: number;
    gap?: string;
    rectangleWidth?: string;
    rectangleHeight?: string;
    className?: string;
  }): LayoutBuilder {
    const {
      count = 2,
      gap = SKELETON_GAPS.XL,
      rectangleWidth = SKELETON_WIDTHS.FULL,
      rectangleHeight = SKELETON_HEIGHTS.LARGE_XL,
      className = '',
    } = config || {};
    return new LayoutBuilder()
      .layout({
        direction: 'column',
        gap: SKELETON_GAPS.SM,
      })
      .group((builder) => {
        let gridBuilder = builder.layout({
          direction: 'row',
          gap,
          className: SKELETON_WIDTHS.FULL,
        });

        for (let i = 0; i < count; i++) {
          gridBuilder = gridBuilder.group(
            (builder) =>
              builder
                .layout({
                  direction: 'column',
                  gap: SKELETON_GAPS.MD,
                  className: cn(className, 'w-full'),
                })
                .text(SKELETON_WIDTHS.TEXT_MD, SKELETON_HEIGHTS.SM)
                .rectangle(rectangleWidth, rectangleHeight),
            {}
          );
        }

        return gridBuilder;
      });
  }

  static sectionSplitter(config?: { className?: string }): LayoutBuilder {
    const { className = '' } = config || {};
    return new LayoutBuilder().text(
      SKELETON_WIDTHS.FULL,
      SKELETON_HEIGHTS.MD,
      className
    );
  }

  static tableColumnsRow(config?: {
    columns?: number;
    rows?: number;
    gap?: string;
    className?: string;
    columnWidth?: string;
    rowHeight?: string;
  }): LayoutBuilder {
    const {
      columns = 8,
      rows = 16,
      className = 'w-full flex flex-row',
      gap = SKELETON_GAPS.LG,
      columnWidth = SKELETON_WIDTHS.FULL,
      rowHeight = SKELETON_HEIGHTS.SM,
    } = config || {};

    const builder = new LayoutBuilder().layout({
      direction: 'row',
      gap,
      className,
    });

    return builder.repeat(columns, (builder) =>
      builder.group((columnBuilder) => {
        let column = columnBuilder.layout({
          direction: 'column',
          gap: SKELETON_GAPS.SM,
          className: 'flex-1',
        });

        for (let i = 0; i < rows; i++) {
          column = column.text(columnWidth, rowHeight);
        }

        return column;
      }, {})
    );
  }
}

const useSkeleton = () => {
  return {
    create: () => new LayoutBuilder(),
    kpiCard: (options?: Parameters<typeof SkeletonFactory.card>[0]) =>
      SkeletonFactory.card(options),
    sensorDetailHeader: (
      options?: Parameters<typeof SkeletonFactory.sensorDetailHeader>[0]
    ) => SkeletonFactory.sensorDetailHeader(options),
    launchpadHeader: (
      options?: Parameters<typeof SkeletonFactory.launchpadHeader>[0]
    ) => SkeletonFactory.launchpadHeader(options),
    kpiCardGrid: (options?: Parameters<typeof SkeletonFactory.cardGrid>[0]) =>
      SkeletonFactory.cardGrid(options),
    sectionSplitter: (config?: { className?: string }) =>
      SkeletonFactory.sectionSplitter(),
    liveFeedRectangles: (
      options?: Parameters<typeof SkeletonFactory.liveFeedRectangles>[0]
    ) => SkeletonFactory.liveFeedRectangles(options),
    textFields: (options: Parameters<typeof SkeletonFactory.textFields>[0]) =>
      SkeletonFactory.textFields(options),
    tableColumnsRow: (
      options?: Parameters<typeof SkeletonFactory.tableColumnsRow>[0]
    ) => SkeletonFactory.tableColumnsRow(options),

    // Preset methods for common configurations
    presets: {
      kpiStandard: () =>
        SkeletonFactory.cardGrid({ className: SKELETON_WIDTHS.FULL }),
      kpiPerformance: () =>
        SkeletonFactory.cardGrid({ count: 2, className: SKELETON_WIDTHS.FULL }),
      kpiMetrics: () =>
        SkeletonFactory.cardGrid({
          count: 3,
          cardConfig: {
            showHeader: false,
            className: `${SKELETON_CLASSES.BACKGROUND_SUBTLE} ${SKELETON_CLASSES.ROUNDED} ${SKELETON_WIDTHS.FULL} pt-0 `,
          },
        }),
      liveFeedStandard: () => SkeletonFactory.liveFeedRectangles(),
      liveFeedChart: () =>
        SkeletonFactory.liveFeedRectangles({
          count: 1,
          rectangleWidth: SKELETON_WIDTHS.FULL,
        }),
      textFieldsStandard: () =>
        SkeletonFactory.textFields({
          fields: [
            { width: SKELETON_WIDTHS.LARGE_SM, count: 4 },
            { width: SKELETON_WIDTHS.CONTENT_LG, count: 2 },
            { width: SKELETON_WIDTHS.TEXT_LG, count: 1 },
          ],
          gap: SKELETON_GAPS.SM,
        }),
      textFieldsSensorDetails: () =>
        SkeletonFactory.textFields({
          fields: [
            { width: SKELETON_WIDTHS.TEXT_XL, count: 1 },
            { width: SKELETON_WIDTHS.RESPONSIVE_LARGE_XL, count: 5 },
            { width: SKELETON_WIDTHS.RESPONSIVE_LARGE_LG, count: 2 },
            { width: SKELETON_WIDTHS.RESPONSIVE_LARGE_MD, count: 2 },
            { width: SKELETON_WIDTHS.RESPONSIVE_XXL, count: 1 },
          ],
        }),
      tableColumns: () =>
        SkeletonFactory.textFields({
          fields: [{ width: SKELETON_WIDTHS.TEXT_XL, count: 16 }],
        }),
    },
  };
};

interface SkeletonProps {
  children?: (builder: LayoutBuilder) => LayoutBuilder;
  variant?: 'default' | 'subtle' | 'vibrant';
  animate?: boolean;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ children, className }) => {
  if (children) {
    const builder = new LayoutBuilder();
    const result = children(builder);
    return <div className={className}>{result.build()}</div>;
  }

  return (
    <div
      className={`bg-background-contrast rounded animate-pulse h-4 w-full ${
        className || ''
      }`}
    />
  );
};

export { Skeleton, SkeletonFactory, useSkeleton };

export type { SkeletonProps };

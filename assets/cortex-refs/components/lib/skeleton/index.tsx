import { cn } from '@/components/lib/utils';
import React from 'react';
import {
  ANIMATION_SHIMMER,
  SKELETON_CLASSES,
  SKELETON_GAPS,
  SKELETON_HEIGHTS,
  SKELETON_PADDING,
  SKELETON_WIDTHS,
} from './constants';

interface SkeletonConfig {
  className?: string;
}

interface SkeletonElement {
  type: 'rectangle' | 'circle' | 'text' | 'image' | 'avatar';
  width?: string;
  height?: string;
  className?: string;
  config?: SkeletonConfig;
  children?: React.ReactElement;
}

interface LayoutConfig {
  direction?: 'row' | 'column';
  gap?: string;
  padding?: string;
  className?: string;
  wrap?: boolean;
}

interface GridConfig {
  columns?: number | string;
  rows?: number;
  gap?: string;
  className?: string;
  responsive?: {
    sm?: number | string;
    md?: number | string;
    lg?: number | string;
    xl?: number | string;
  };
}

class SkeletonRenderer {
  static renderElement(
    element: SkeletonElement,
    key?: string | number
  ): JSX.Element {
    const {
      type,
      width = SKELETON_WIDTHS.FULL,
      height = SKELETON_HEIGHTS.CONTENT_SM,
      className = '',
      config = {},
    } = element;
    const { className: configClassName = '' } = config;

    const baseClasses = cn(
      SKELETON_CLASSES.ROUNDED,
      ANIMATION_SHIMMER,
      width,
      height,
      className,
      configClassName
    );

    const shapeClasses = {
      rectangle: baseClasses,
      circle: cn(baseClasses, SKELETON_CLASSES.ROUNDED_FULL),
      text: baseClasses,
      image: cn(baseClasses, SKELETON_CLASSES.ROUNDED),
      avatar: cn(baseClasses, SKELETON_CLASSES.ROUNDED_FULL),
    };

    return <div key={key} className={shapeClasses[type]} />;
  }
}

class LayoutBuilder {
  private elements: SkeletonElement[] = [];
  private layoutConfig: LayoutConfig = {};
  private gridConfig?: GridConfig;

  rectangle(width?: string, height?: string, className?: string): this {
    this.elements.push({ type: 'rectangle', width, height, className });
    return this;
  }

  circle(size?: string, className?: string): this {
    this.elements.push({
      type: 'circle',
      width: size || SKELETON_WIDTHS.SM,
      height: size || SKELETON_HEIGHTS.XXL,
      className,
    });
    return this;
  }

  text(width?: string, height?: string, className?: string): this {
    this.elements.push({ type: 'text', width, height, className });
    return this;
  }

  image(width?: string, height?: string, className?: string): this {
    this.elements.push({ type: 'image', width, height, className });
    return this;
  }

  avatar(size: 'sm' | 'md' | 'lg' | 'xl' = 'md', className?: string): this {
    const sizes = {
      sm: `${SKELETON_WIDTHS.XS} ${SKELETON_HEIGHTS.AVATAR_SM}`,
      md: `${SKELETON_WIDTHS.SM} ${SKELETON_HEIGHTS.AVATAR_MD}`,
      lg: `${SKELETON_WIDTHS.MD} ${SKELETON_HEIGHTS.AVATAR_LG}`,
      xl: `${SKELETON_WIDTHS.TEXT_LG} ${SKELETON_HEIGHTS.AVATAR_XL}`,
    };
    const [width, height] = sizes[size].split(' ');
    this.elements.push({ type: 'avatar', width, height, className });
    return this;
  }

  layout(config: LayoutConfig): this {
    this.layoutConfig = { ...this.layoutConfig, ...config };
    return this;
  }

  grid(config: GridConfig): this {
    this.gridConfig = config;
    return this;
  }

  repeat(
    count: number,
    builderFn: (builder: LayoutBuilder, index: number) => LayoutBuilder
  ): this {
    for (let i = 0; i < count; i++) {
      const childBuilder = new LayoutBuilder();
      builderFn(childBuilder, i);
      this.elements.push(...childBuilder.elements);
    }
    return this;
  }

  group(
    builderFn: (builder: LayoutBuilder) => LayoutBuilder,
    config?: LayoutConfig
  ): this {
    const groupBuilder = new LayoutBuilder();
    builderFn(groupBuilder);

    const groupElement: SkeletonElement = {
      type: 'rectangle' as const,
      className: 'contents',
      config: { ...config },
      children: groupBuilder.build(),
    };

    this.elements.push(groupElement);

    return this;
  }

  build(): JSX.Element {
    if (this.gridConfig) {
      return this.buildGrid();
    }
    return this.buildLayout();
  }

  private buildGrid(): JSX.Element {
    const {
      columns,
      gap = SKELETON_GAPS.LG,
      className = '',
      responsive,
    } = this.gridConfig!;

    let gridCols = '';
    if (typeof columns === 'number') {
      gridCols = `grid-cols-${columns}`;
    } else if (typeof columns === 'string') {
      gridCols = columns;
    }

    let responsiveClasses = '';
    if (responsive) {
      Object.entries(responsive).forEach(([breakpoint, cols]) => {
        if (typeof cols === 'number') {
          responsiveClasses += ` ${breakpoint}:grid-cols-${cols}`;
        } else {
          responsiveClasses += ` ${breakpoint}:${cols}`;
        }
      });
    }

    return (
      <div className={cn('grid', gridCols, responsiveClasses, gap, className)}>
        {this.elements.map((element, index) =>
          SkeletonRenderer.renderElement(element, index)
        )}
      </div>
    );
  }

  private buildLayout(): JSX.Element {
    const {
      direction = 'column',
      gap = SKELETON_GAPS.LG,
      padding = SKELETON_PADDING.NONE,
      className = '',
      wrap = false,
    } = this.layoutConfig;

    const layoutClasses = cn(
      'flex',
      direction === 'row' ? 'flex-row' : 'flex-col',
      wrap && 'flex-wrap',
      gap,
      padding,
      className
    );

    return (
      <div className={layoutClasses}>
        {this.elements.map((element, index) => {
          if ('children' in element) {
            const childElement = element.children as React.ReactElement;
            return React.cloneElement(childElement, { key: index });
          }
          return SkeletonRenderer.renderElement(element, index);
        })}
      </div>
    );
  }
}

export { LayoutBuilder, SkeletonRenderer };

export type { GridConfig, LayoutConfig, SkeletonConfig, SkeletonElement };

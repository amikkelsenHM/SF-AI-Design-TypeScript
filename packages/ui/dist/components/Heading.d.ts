import { default as React } from 'react';

export type HeadingVariant = 'display-large' | 'heading-large' | 'heading-medium' | 'overline-large' | 'overline-medium';
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    variant?: HeadingVariant;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
    children: React.ReactNode;
}
export declare const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;
export default Heading;
//# sourceMappingURL=Heading.d.ts.map
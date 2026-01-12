import { default as React } from 'react';

export type TextVariant = 'body-large' | 'body-small' | 'body-bold-large' | 'body-bold-small' | 'cta-large' | 'cta-small' | 'link-large' | 'link-small' | 'footnote' | 'helper' | 'label' | 'label-bold';
export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: TextVariant;
    as?: 'span' | 'p' | 'div' | 'label';
    children: React.ReactNode;
}
export declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLSpanElement>>;
export default Text;
//# sourceMappingURL=Text.d.ts.map
import { default as React } from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'processing';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    showDot?: boolean;
    children: React.ReactNode;
}
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
export default Badge;
//# sourceMappingURL=Badge.d.ts.map
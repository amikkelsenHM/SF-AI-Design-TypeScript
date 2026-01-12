import { default as React } from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    id?: string;
    title?: string;
    children: React.ReactNode;
}
export declare const Section: React.ForwardRefExoticComponent<SectionProps & React.RefAttributes<HTMLElement>>;
export default Section;
//# sourceMappingURL=Section.d.ts.map
import { Typography } from '@/components/components/ui/typography';
import { memo, ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Section = memo<SectionProps>(({ title, children, className = '' }) => (
  <div className={className}>
    <Typography variant="overline-md" className="text-foreground mb-3">
      {title}
    </Typography>
    {children}
  </div>
));

export default Section;

import { Typography } from '@/components/components/ui/typography';
import { ReactNode } from 'react';

export interface FormHeaderProps {
  title: string;
  description?: ReactNode;
}

const FormHeader = ({ title, description }: FormHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 mb-15">
      <Typography
        component="h3"
        variant="heading-lg"
        className="text-foreground"
      >
        {title}
      </Typography>
      {description && (
        <Typography className="text-foreground">{description}</Typography>
      )}
    </div>
  );
};

export default FormHeader;

import { Button } from '@/components/components/ui/button';
import { Typography } from '@/components/components/ui/typography';
import { cn } from '@/components/lib/utils';

interface ActionPanelProps {
  title: string;
  description?: string;
  className?: string;
  actionLabel: string;
  actionVariant?: 'primary' | 'secondary' | 'tertiary';
  onActionClick: () => void;
}

const ActionPanel = ({
  title,
  description,
  className,
  actionLabel,
  actionVariant,
  onActionClick,
}: ActionPanelProps) => {
  return (
    <div
      className={cn(
        'pt-10 px-10 pb-12 rounded-t-base rounded-b-lg flex flex-col gap-y-2.5 items-start bg-background-contrast text-foreground',
        className
      )}
    >
      <Typography variant="heading-md">{title}</Typography>
      {description && (
        <Typography variant="body-sm" component="p">
          {description}
        </Typography>
      )}
      <Button
        variant={actionVariant}
        size="lg"
        className="mt-5 h-auto"
        onClick={onActionClick}
      >
        {actionLabel}
      </Button>
    </div>
  );
};

export default ActionPanel;

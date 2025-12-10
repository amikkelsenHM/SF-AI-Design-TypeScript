import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/components/ui/dropdown-menu';
import RoundedMenuDots from '../icons/rounded-menu-dots';

export interface KpiCardMenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'destructive';
}

interface KpiCardOptionsProps {
  menuItems: KpiCardMenuItem[];
  align?: 'start' | 'center' | 'end';
  className?: string;
  triggerClassName?: string;
}

const KpiCardOptions: React.FC<KpiCardOptionsProps> = ({
  menuItems,
  align = 'end',
  className,
  triggerClassName,
}) => {
  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={`cursor-pointer ${triggerClassName || ''}`}>
          <RoundedMenuDots />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={`min-w-fit border-foreground-contrast p-0 bg-background-progress text-white typography-body-sm rounded-none ${
          className || ''
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            className="typography-body-sm cursor-pointer flex hover:bg-background-contrast"
            key={`${item.label}-${index}`}
            onClick={item.onClick}
            disabled={item.disabled}
            variant={item.variant}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default KpiCardOptions;

import { Button } from '@/components/components/ui/button';
import DownloadIcon from '../../icons/download';
import {
  HeaderActionContextValue,
  useHeaderActions,
} from './header-actions-provider';

interface HeaderAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  iconPosition?: 'left' | 'right';
  icon?: 'download' | string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

interface HeaderActionsProps<TData> {
  createActions: (
    tableState: HeaderActionContextValue<TData>
  ) => HeaderAction[];
}

const IconMap = {
  download: DownloadIcon,
} as const;

const HeaderActions = <TData,>({
  createActions,
}: HeaderActionsProps<TData>) => {
  const tableState = useHeaderActions<TData>();
  const actions = createActions(tableState);

  if (actions.length === 0) return null;

  return (
    <div className="flex gap-2">
      {actions.map(
        (
          {
            label,
            variant,
            iconPosition,
            icon,
            isLoading,
            disabled,
            onClick,
          }: HeaderAction,
          index
        ) => {
          const IconComponent = icon && IconMap[icon as keyof typeof IconMap];

          return (
            <Button
              key={index}
              variant={variant || 'secondary'}
              iconPosition={iconPosition}
              className="gap-2"
              isLoading={isLoading}
              disabled={disabled}
              onClick={onClick}
            >
              {label}
              {IconComponent && <IconComponent />}
            </Button>
          );
        }
      )}
    </div>
  );
};

export default HeaderActions;

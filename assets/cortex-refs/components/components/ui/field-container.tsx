import { cn } from '@/components/lib/utils';
import TickCircle from '@/components/v2/icons/tick-circle';
import Warning from '@/components/v2/icons/warning';
import { cva, VariantProps } from 'class-variance-authority';
import {
  ChangeEvent,
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useState,
} from 'react';

const fieldContainerVariants = cva(
  'flex items-center gap-1.5 w-full min-w-0 px-4 text-foreground typography-body-sm shadow-xs rounded-xl border-1 border-transparent outline-none bg-background-progress transition-colors selection:bg-background selection:text-foreground has-[input:disabled,textarea:disabled]:bg-foreground-subtle has-[input:disabled,textarea:disabled]:cursor-not-allowed has-[input:disabled,textarea:disabled]:text-foreground-disabled has-[input:disabled,textarea:disabled]:border-transparent has-[input:disabled,textarea:disabled]:[&>input]:pointer-events-none has-[input:read-only,textarea:read-only]:bg-foreground-subtle has-[input:read-only,textarea:read-only]:border-border-progress',
  {
    variants: {
      state: {
        default:
          'border-foreground-subtle hover:border-border-light focus-within:border-border-light',
        success: 'border-foreground-success',
        error: 'border-foreground-error',
      },
      inputSize: {
        xs: 'h-6',
        s: 'h-8',
        l: 'h-11',
      },
      inputed: {
        true: '',
        false: '',
      },
      multiline: {
        true: 'h-auto py-2.5 items-start',
        false: '',
      },
    },
    defaultVariants: {
      state: 'default',
      inputSize: 's',
    },
    compoundVariants: [
      {
        state: 'default',
        inputSize: 'xs',
      },
      {
        state: 'default',
        inputed: true,
        class: 'bg-background-progress border-border-light',
      },
    ],
  }
);

type Value<TElement> = React.InputHTMLAttributes<TElement>['value'];

const useInputted = <TElement extends HTMLInputElement | HTMLTextAreaElement>(
  value: Value<TElement>,
  defaultValue: Value<TElement>,
  onChange: ChangeEventHandler<TElement> | undefined
) => {
  const [inputed, setInputed] = useState(
    typeof value === 'string' ? value.length > 0 : !!defaultValue
  );

  const handleChange = useCallback(
    (e: ChangeEvent<TElement>) => {
      setInputed(e.target.value.length > 0);
      onChange?.(e);
    },
    [onChange]
  );

  return { inputed, handleChange };
};

interface FieldContainerProps
  extends VariantProps<typeof fieldContainerVariants> {
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  prefix?: ReactNode;
  suffix?: ReactNode;
  children: ReactNode;
  onClick?: React.HTMLAttributes<HTMLDivElement>['onClick'];
}

function FieldContainer({
  className,
  inputSize,
  state,
  icon,
  iconPosition,
  prefix,
  suffix,
  multiline,
  inputed,
  children,
  onClick,
}: FieldContainerProps) {
  const rightIcons = {
    success: <TickCircle />,
    error: <Warning />,
    default: iconPosition === 'right' && icon,
  };

  return (
    <div
      className={cn(
        fieldContainerVariants({ state, inputSize, inputed, multiline }),
        className
      )}
      onClick={onClick}
    >
      {prefix && <span className="text-sm">{prefix}</span>}
      {iconPosition === 'left' && icon}

      {children}

      {rightIcons[state ?? 'default']}
      {suffix && <span className="text-sm">{suffix}</span>}
    </div>
  );
}

export { FieldContainer, useInputted, type FieldContainerProps };

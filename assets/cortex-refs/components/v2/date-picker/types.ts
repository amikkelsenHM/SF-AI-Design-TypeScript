import { DayPickerProps } from 'react-day-picker';
import { CalendarProps } from '../../components/ui/calendar/calendar';

interface CommonProps {
  withTime?: boolean;
  error?: string;
  lockStart?: boolean;
  disableAll?: boolean;
}

interface WithTimeContentProps extends CommonProps {
  timeZone: string;
  onTimeZoneChange: (value: string) => void;
}

export interface DatePickerFooterProps extends WithTimeContentProps {
  mode: CalendarProps['mode'];
  selected?:
    | DateSinglePickerContentProps['selected']
    | DateRangePickerContentProps['selected'];
  onSelect: (value: any) => void;
  onConfirm:
    | DateSinglePickerContentProps['onSelect']
    | DateRangePickerContentProps['onSelect'];
}

export type DateRangePickerContentProps = Omit<
  Extract<DayPickerProps, { mode: 'range'; required?: false | undefined }>,
  'mode'
> &
  WithTimeContentProps;

export type DateSinglePickerContentProps = Omit<
  Extract<DayPickerProps, { mode: 'single'; required?: false | undefined }>,
  'mode'
> &
  WithTimeContentProps;

export type DatePickerContentProps = CalendarProps & CommonProps;

export type DatePickerProps = {
  trigger: React.ReactNode;
  align?: 'center' | 'start' | 'end';
  open?: boolean;
  setOpen?: (value: boolean) => void;
} & DatePickerContentProps;

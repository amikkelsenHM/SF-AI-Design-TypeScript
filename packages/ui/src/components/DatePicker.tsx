import React, { useState } from 'react';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  label?: string;
  className?: string;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label = 'Select Date',
  className = '',
}) => {
  const [currentMonth, setCurrentMonth] = useState(value?.getMonth() ?? new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(value?.getFullYear() ?? new Date().getFullYear());

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onChange?.(newDate);
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    return (
      value.getDate() === day &&
      value.getMonth() === currentMonth &&
      value.getFullYear() === currentYear
    );
  };

  const formatDate = (date?: Date) => {
    if (!date) return '--/--/----';
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className={`date-picker ${className}`}>
      <div className="date-picker-header">
        <div className="date-picker-title">{label}</div>
      </div>
      <div className="date-picker-inputs">
        <div className="date-picker-input-wrapper">
          <span className="date-picker-input-text">{formatDate(value)}</span>
        </div>
      </div>
      <div className="date-picker-controls">
        <button type="button" onClick={handlePrevMonth} style={{ background: 'none', border: 'none', color: '#eee', cursor: 'pointer' }}>
          ←
        </button>
        <div className="date-picker-current-month">
          <span>{MONTHS[currentMonth]}</span>
          <span>{currentYear}</span>
        </div>
        <button type="button" onClick={handleNextMonth} style={{ background: 'none', border: 'none', color: '#eee', cursor: 'pointer' }}>
          →
        </button>
      </div>
      <div className="date-picker-grid">
        {DAYS.map((day) => (
          <div key={day} className="date-picker-day" style={{ fontWeight: 'bold', cursor: 'default' }}>
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`date-picker-day ${day && isSelected(day) ? 'selected' : ''}`}
            onClick={() => day && handleDayClick(day)}
            style={!day ? { visibility: 'hidden' } : undefined}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;

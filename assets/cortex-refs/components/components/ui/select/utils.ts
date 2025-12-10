export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export const getMultiValue = (value: string[], option: string) => {
  const isSelected = value.includes(option);
  return isSelected ? value.filter((v) => v !== option) : [...value, option];
};

export const getMultiValueLabel = (
  value: string[],
  options: SelectOption[]
) => {
  if (value.length === options.length && options.length > 1) return 'All';

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  return selectedOptions
    .map(({ label }) => (typeof label === 'string' ? label : ''))
    .join(', ');
};

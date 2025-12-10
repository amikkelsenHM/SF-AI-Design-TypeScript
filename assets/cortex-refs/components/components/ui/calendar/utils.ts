export const getYearOptions = (range = 100) => {
  const currentYear = new Date().getFullYear();
  const start = currentYear - range;
  const end = currentYear + range;
  const years: number[] = [];

  for (let year = start; year <= end; year++) {
    years.push(year);
  }

  return years;
};

export const getIsCurrentYear = (year: number) =>
  year === new Date().getFullYear();

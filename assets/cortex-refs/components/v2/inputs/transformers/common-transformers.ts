import { Transform } from '../controlled-field';

export const NUMBER_TRANSFORMER: Transform<number | null> = {
  input: (value) => value?.toString() || '',
  output: (e) => {
    const output = parseInt(e.target.value, 10);
    return isNaN(output) ? null : output;
  },
};

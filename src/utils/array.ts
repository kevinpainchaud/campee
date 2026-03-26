export const allEqual = (array: (string | number | null)[]): boolean => {
  if (array.length <= 1) {
    return true;
  }

  return array.every((value) => value === array[0]);
};

export const average = (array: number[]) =>
  array.reduce((sum, value) => sum + value, 0) / array.length;

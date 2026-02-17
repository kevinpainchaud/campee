export const allEqual = (array: (string | number | null)[]): boolean => {
  if (array.length <= 1) {
    return true;
  }

  return array.every((value) => value === array[0]);
};

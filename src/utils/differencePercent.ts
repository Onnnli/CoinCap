export const getDifferencePercent = (a: number, b: number) => {
  return 100 * Math.abs((a - b) / ((a + b) / 2));
};

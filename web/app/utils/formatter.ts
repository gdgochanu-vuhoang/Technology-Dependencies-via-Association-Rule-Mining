export const formatMetric = (percentage: boolean, value: number): string => {
  if (percentage) {
    const percentValue = value * 100;
    return `${percentValue.toFixed(3)}%`;
  }

  return value.toFixed(3);
};
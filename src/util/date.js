export const getDate = (date) => {
  return date.toISOString().slice(0, 10);
};

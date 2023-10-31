/**
 * Format a date to day-month-year
 * @param date {Date} Date Object
 * @returns  {Date} Date object formatted day-month-year
 */
export const formatDate = (date: Date): string => {
  date = new Date(date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

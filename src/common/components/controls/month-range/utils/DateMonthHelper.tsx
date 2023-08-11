import { MonthDate } from "../MonthRangeComponent";

export const isDateWithin = (withinDate: MonthDate, fromDate: MonthDate, toDate: MonthDate) => {
  const withinIsAfterFromDate = isDate1BeforeOrSameAsDate2(fromDate, withinDate);
  const toDateIsAfterWithinDate = isDate1BeforeOrSameAsDate2(withinDate, toDate);
  return withinIsAfterFromDate && toDateIsAfterWithinDate;
};

export const isDate1BeforeOrSameAsDate2 = (date1: MonthDate, date2: MonthDate) => {
  if (date1.year < date2.year) {
    return true;
  } else return date1.year === date2.year && date1.month <= date2.month;
};

export const isSameDate = (date1: MonthDate, date2: MonthDate) => {
  return date1.year === date2.year && date1.month === date2.month;
};

export const formatMonthDate = (monthDate: MonthDate) => {
  const newMonth = monthDate.month.toString().length === 1 ? "0" + monthDate.month : monthDate.month;
  return `${monthDate.year}-${newMonth}`;
};

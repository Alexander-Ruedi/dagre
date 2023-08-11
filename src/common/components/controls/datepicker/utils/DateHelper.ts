import _ from "lodash";
import moment from "moment";

export const getWeeksOfMonth: (year: number, month: number) => { displayedWeeks: number; firstDisplayedDay: moment.Moment } = (year, month) => {
  const firstDate = moment()
    .year(year)
    .month(month - 1)
    .startOf("month");
  const lastDate = moment()
    .year(year)
    .month(month - 1)
    .endOf("month");

  const firstDayOfMonth = moment(firstDate);

  const firstDayOfMonthWeekday = firstDayOfMonth.day();
  const lastDayOfMonth = lastDate.date();

  const daysSinceMonday = (firstDayOfMonthWeekday + 6) % 7;

  const displayedWeeks = Math.ceil((lastDayOfMonth + daysSinceMonday) / 7);

  const firstDisplayedDay = firstDate.clone().add(-daysSinceMonday, "days");

  return { displayedWeeks, firstDisplayedDay };
};

export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const checkIsDateValid = (day: string, month: string, year: string) => {
  const isValidDay = _.inRange(Number(day), 1, 31 + 1);
  const isValidMonth = _.inRange(Number(month), 1, 12 + 1);
  const isValidYear = _.inRange(Number(year), 2000, 3000 + 1);

  return isValidDay && isValidMonth && isValidYear;
};

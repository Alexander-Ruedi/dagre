import _ from "lodash";
import { daysOfWeek, getWeeksOfMonth } from "../../../utils/DateHelper";
import { classNames } from "../../../../../../utils/StylingUtil";
import { DaysOfWeek } from "../DaysOfWeek";
import React from "react";

interface DayGridProps {
  displayed: {
    month: number;
    year: number;
  };
  selected: {
    day: number;
    month: number;
    year: number;
  };
  onChangeSelectedDate: (year: number, month?: number, day?: number) => void;
}
export const MonthGrid = (props: DayGridProps) => {
  const { selected, displayed, onChangeSelectedDate } = props;
  const { displayedWeeks, firstDisplayedDay } = getWeeksOfMonth(displayed.year, displayed.month);

  console.log("result", { displayedWeeks, firstDisplayedDay });
  return (
    <>
      <DaysOfWeek />
      <div className="datepicker-grid w-64 grid grid-cols-7">
        {_.times(displayedWeeks, (weekIndex) => {
          return daysOfWeek.map((dayName, dayIndex) => {
            const today = firstDisplayedDay.clone();

            const isSelectedYear = today.year() === selected.year,
              isSelectedMonth = today.month() + 1 === selected.month,
              isSelectedDay = today.date() === Number(selected.day);

            const isSelectedDate = isSelectedYear && isSelectedMonth && isSelectedDay;

            const isDisplayedYear = today.year() === displayed.year,
              isDisplayedMonth = today.month() + 1 === displayed.month;

            const isDisplayedDate = isDisplayedYear && isDisplayedMonth;

            firstDisplayedDay.add({ day: 1 });
            return (
              <span
                key={weekIndex + "-" + dayName}
                className={classNames(
                  isSelectedDate ? "bg-gray-500 text-white" : "text-gray-500 hover:bg-gray-100",
                  isDisplayedDate || isSelectedDate ? "font-semibold" : "font-normal",
                  "block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-sm",
                )}
                onClick={() => onChangeSelectedDate(today.year(), today.month() + 1, today.date())}
              >
                {today.date()}
              </span>
            );
          });
        })}
      </div>
    </>
  );
};

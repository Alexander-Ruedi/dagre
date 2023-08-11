import React from "react";
import _ from "lodash";

interface DayGridProps {
  displayed: {
    month: number;
    year: number;
    decade: number;
  };
  selected: {
    day: number;
    month: number;
    year: number;
  };
  onChangeSelectedDate: (year: number) => void;
}
export const DecadeGrid = (props: DayGridProps) => {
  const { displayed, onChangeSelectedDate } = props;

  return (
    <>
      <div className="datepicker-view flex months datepicker-grid w-64 grid grid-cols-4">
        {_.times(10, (iteration) => {
          const currentYear = displayed.decade + iteration;
          return (
            <span
              data-month="0"
              className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
              onClick={() => onChangeSelectedDate(currentYear)}
            >
              {currentYear}
            </span>
          );
        })}
      </div>
    </>
  );
};

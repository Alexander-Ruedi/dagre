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
  onChangeSelectedDate: (month: number) => void;
}
export const YearGrid = (props: DayGridProps) => {
  const { onChangeSelectedDate } = props;

  return (
    <>
      <div className="datepicker-view flex months datepicker-grid w-64 grid grid-cols-4">
        <span
          data-month="0"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(1)}
        >
          Jan
        </span>
        <span
          data-month="1"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(2)}
        >
          Feb
        </span>
        <span
          data-month="2"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(3)}
        >
          Mar
        </span>
        <span
          data-month="3"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(4)}
        >
          Apr
        </span>
        <span
          data-month="4"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(5)}
        >
          May
        </span>
        <span
          data-month="5"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(6)}
        >
          Jun
        </span>
        <span
          data-month="6"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(7)}
        >
          Jul
        </span>
        <span
          data-month="7"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month focused"
          onClick={() => onChangeSelectedDate(8)}
        >
          Aug
        </span>
        <span
          data-month="8"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(9)}
        >
          Sep
        </span>
        <span
          data-month="9"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(10)}
        >
          Oct
        </span>
        <span
          data-month="10"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(11)}
        >
          Nov
        </span>
        <span
          data-month="11"
          className="datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm month"
          onClick={() => onChangeSelectedDate(12)}
        >
          Dec
        </span>
      </div>
    </>
  );
};

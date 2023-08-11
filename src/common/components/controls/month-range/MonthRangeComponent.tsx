import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { classNames } from "../../../utils/StylingUtil";
import { ErrorTextComponent } from "../../form/validation/ErrorTextComponent";
import { MonthComponent } from "./components/MonthComponent";
import { isDate1BeforeOrSameAsDate2, isDateWithin, isSameDate } from "./utils/DateMonthHelper";

export interface MonthDate {
  year: number;
  month: number;
}
interface MonthRangeProps {
  from: MonthDate;
  to: MonthDate;
  onFromChange: (from: MonthDate, isValid: boolean) => void;
  onToChange: (to: MonthDate, isValid: boolean) => void;
  disabled: boolean;
}

enum SelectedDate {
  FROM = "from",
  TO = "to",
}

const monthText = ["", "Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MonthRangeComponent = (props: MonthRangeProps) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>();
  const [currentYear, setCurrentYear] = useState<number>(props.from.year);

  const popupRef = useRef<HTMLDivElement>(null);
  const onClickOutside = useDetectOutsideClick(popupRef);
  onClickOutside.subscribe({
    next() {
      setSelectedDate(undefined);
    },
  });
  const onYearChange = (step: 1 | -1) => {
    setCurrentYear(currentYear + step);
  };

  const onMonthChange = (newMonth: number) => {
    if (selectedDate === SelectedDate.FROM) {
      const newDate = { year: currentYear, month: newMonth };
      const isValid = isDate1BeforeOrSameAsDate2(newDate, props.to);
      props.onFromChange(newDate, isValid);
      setSelectedDate(SelectedDate.TO);
    } else if (selectedDate === SelectedDate.TO) {
      const newDate = { year: currentYear, month: newMonth };
      const isValid = isDate1BeforeOrSameAsDate2(props.from, newDate);
      props.onToChange(newDate, isValid);
      if (isDate1BeforeOrSameAsDate2(props.from, newDate)) {
        setSelectedDate(undefined);
      }
    }
  };

  const calculateIsActive = (month: number) => {
    const displayDate: MonthDate = { year: currentYear, month: month };
    return isDateWithin(displayDate, props.from, props.to);
  };
  const calculateIsFirst = (month: number) => {
    const displayDate: MonthDate = { year: currentYear, month: month };
    return isSameDate(displayDate, props.from);
  };
  const calculateIsLast = (month: number) => {
    const displayDate: MonthDate = { year: currentYear, month: month };
    return isSameDate(displayDate, props.to);
  };

  return (
    <div className="w-full bg-white select-none">
      <div className="flex flex-row justify-between">
        <div
          onClick={() => {
            if (!props.disabled) {
              if (selectedDate === SelectedDate.FROM) {
                setSelectedDate(undefined);
              } else {
                setSelectedDate(SelectedDate.FROM);
                setCurrentYear(props.from.year);
              }
            }
          }}
          className={classNames(
            props.disabled ? "border-gray-200 bg-gray-50 text-gray-500" : "hover:bg-gray-50 cursor-pointer text-gray-700",
            selectedDate === SelectedDate.FROM ? "outline-none ring-2 ring-indigo-500" : "",
            "text-sm p-1 py-2 flex border border-gray-300 rounded-md justify-center items-center",
          )}
        >
          <CalendarIcon className="ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          <span className="mr-1">{monthText[props.from.month] + " " + props.from.year}</span>
        </div>
        <div className="flex items-center">-</div>
        <div
          onClick={() => {
            if (!props.disabled) {
              if (selectedDate === SelectedDate.TO) {
                setSelectedDate(undefined);
              } else {
                setSelectedDate(SelectedDate.TO);
                setCurrentYear(props.to.year);
              }
            }
          }}
          className={classNames(
            props.disabled ? "border-gray-200 bg-gray-50 text-gray-500" : "hover:bg-gray-50 cursor-pointer text-gray-700",
            selectedDate === SelectedDate.TO ? "outline-none ring-2 ring-indigo-500" : "",
            "text-sm p-1 py-2 flex border border-gray-300 rounded-md justify-center items-center",
          )}
        >
          <CalendarIcon className="ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          <span className="mr-1">{monthText[props.to.month] + " " + props.to.year}</span>
        </div>
      </div>
      <div className="ml-0 mt-1 m-2">
        {!isDate1BeforeOrSameAsDate2(props.from, props.to) && <ErrorTextComponent message={"Start date should be before end date"} />}
      </div>
      {selectedDate && (
        <div className="relative w-full" ref={popupRef}>
          <div className="absolute w-full z-10 bg-white">
            <div className="flex flex-col mt-1 border shadow-md rounded-md">
              <div className="flex items-center bg-msg-red text-white w-full justify-between rounded-t-md ">
                <div className="py-1 h-full rounded-tl-md hover:bg-indigo-500 cursor-pointer" onClick={() => onYearChange(-1)}>
                  <ChevronLeftIcon className="m-1.5 h-5 w-5" aria-hidden="true" />
                </div>
                <div>{currentYear}</div>
                <div className="py-1 h-full rounded-tr-md hover:bg-indigo-500 cursor-pointer" onClick={() => onYearChange(1)}>
                  <ChevronRightIcon className="m-1.5 h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <div className="flex justify-between text-center mt-1 px-1">
                <MonthComponent
                  monthIndex={1}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(1)}
                  isFirst={calculateIsFirst(1)}
                  isLast={calculateIsLast(1)}
                />
                <MonthComponent
                  monthIndex={2}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(2)}
                  isFirst={calculateIsFirst(2)}
                  isLast={calculateIsLast(2)}
                />
                <MonthComponent
                  monthIndex={3}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(3)}
                  isFirst={calculateIsFirst(3)}
                  isLast={calculateIsLast(3)}
                />
              </div>
              <div className="flex justify-between text-center mt-1 px-1">
                <MonthComponent
                  monthIndex={4}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(4)}
                  isFirst={calculateIsFirst(4)}
                  isLast={calculateIsLast(4)}
                />
                <MonthComponent
                  monthIndex={5}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(5)}
                  isFirst={calculateIsFirst(5)}
                  isLast={calculateIsLast(5)}
                />
                <MonthComponent
                  monthIndex={6}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(6)}
                  isFirst={calculateIsFirst(6)}
                  isLast={calculateIsLast(6)}
                />
              </div>
              <div className="flex w-full text-center mt-1 px-1">
                <MonthComponent
                  monthIndex={7}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(7)}
                  isFirst={calculateIsFirst(7)}
                  isLast={calculateIsLast(7)}
                />
                <MonthComponent
                  monthIndex={8}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(8)}
                  isFirst={calculateIsFirst(8)}
                  isLast={calculateIsLast(8)}
                />
                <MonthComponent
                  monthIndex={9}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(9)}
                  isFirst={calculateIsFirst(9)}
                  isLast={calculateIsLast(9)}
                />
              </div>
              <div className="flex justify-between text-center my-1 px-1">
                <MonthComponent
                  monthIndex={10}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(10)}
                  isFirst={calculateIsFirst(10)}
                  isLast={calculateIsLast(10)}
                />
                <MonthComponent
                  monthIndex={11}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(11)}
                  isFirst={calculateIsFirst(11)}
                  isLast={calculateIsLast(11)}
                />
                <MonthComponent
                  monthIndex={12}
                  onClick={onMonthChange}
                  isActive={calculateIsActive(12)}
                  isFirst={calculateIsFirst(12)}
                  isLast={calculateIsLast(12)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

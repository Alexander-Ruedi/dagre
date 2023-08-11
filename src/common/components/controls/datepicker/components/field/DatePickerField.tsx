import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../../../../utils/StylingUtil";
import React, { useEffect } from "react";
import { DatePickerInput } from "../DatePickerInput";
import { addLeadingZero } from "../../utils/DatePickerUtil";
import { checkIsDateValid } from "../../utils/DateHelper";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
interface DatePickerFieldProps {
  showPopup: SetState<boolean>;

  day: {
    day: string;
    setDay: SetState<string>;
  };
  month: {
    month: string;
    setMonth: SetState<string>;
  };
  year: {
    year: string;
    setYear: SetState<string>;
  };

  valid: {
    isValid: boolean;
    setIsValid: SetState<boolean>;
  };

  onChange?: (newValue: string) => void;
}
export const DatePickerField = (props: DatePickerFieldProps) => {
  const { showPopup, onChange } = props;
  const { day, setDay } = props.day;
  const { month, setMonth } = props.month;
  const { year, setYear } = props.year;
  const { isValid, setIsValid } = props.valid;

  const isEmpty = !day && !month && !year;
  useEffect(() => {
    const isValid = checkIsDateValid(day, month, year);
    setIsValid(isValid);

    if (isValid && onChange) {
      const newDay = addLeadingZero(day, 2),
        newMonth = addLeadingZero(month, 2);
      const newDate = [year, newMonth, newDay].join("-");
      onChange(newDate);
    } else if (isEmpty && onChange) {
      onChange("");
    }
  }, [day, month, year]);

  return (
    <div className="flex py-2 px-3 flex-row justify-around w-full border rounded-md border-gray-300 cursor-pointer" onClick={() => showPopup(true)}>
      <div className="flex w-full">
        <DatePickerInput maxChars={2} customClasses="w-8 rounded-l-md" value={day} onChange={setDay} placeholder={"dd"} />
        <DatePickerInput maxChars={2} customClasses="w-10" value={month} onChange={setMonth} placeholder={"mm"} />
        <DatePickerInput maxChars={4} customClasses="w-12 rounded-r-md" value={year} onChange={setYear} placeholder={"yyyy"} />
      </div>
      <CalendarDaysIcon className={classNames("h-5 w-5", isValid || isEmpty ? "text-gray-400" : "text-red-500")} aria-hidden="true" />
    </div>
  );
};

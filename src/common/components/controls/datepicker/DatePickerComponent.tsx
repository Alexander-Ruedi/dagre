import React, { useEffect, useRef, useState } from "react";

import "./DatePicker.style.css";
import { addLeadingZero, getDay, getMonth, getYear } from "./utils/DatePickerUtil";
import { usePopupHelper } from "../../../hooks/usePopupHelper";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { DatePickerDrop, DatePickerLevel } from "./components/drop/DatePickerDrop";
import { DatePickerField } from "./components/field/DatePickerField";

interface DatePickerProps {
  value?: string | null;
  onChange?: (newValue: string) => void;
}

export const DatePickerComponent = (props: DatePickerProps) => {
  const { value, onChange } = props;

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isValid, setIsValid] = useState(false);

  const datePickerRef = useRef<HTMLDivElement>(null);
  const onClickOutside = useDetectOutsideClick(datePickerRef);
  const [isPopupVisible, showPopup, hidePopup] = usePopupHelper(false);
  onClickOutside.subscribe(hidePopup);
  const [displayedLevel, setDisplayedLevel] = useState(DatePickerLevel.Decade);
  const [displayedDecade, setDisplayedDecade] = useState(2020);

  useEffect(() => {
    if (month !== "") {
      setDisplayedLevel(DatePickerLevel.Month);
    } else if (year !== "") {
      setDisplayedLevel(DatePickerLevel.Year);
    } else {
      setDisplayedLevel(DatePickerLevel.Decade);
    }
  }, [day, month, year]);

  const updateStateFromProps = () => {
    const newYear = getYear(value);
    newYear !== year && setYear(newYear);

    const newMonth = getMonth(value);
    newMonth !== month && setMonth(newMonth);

    const newDay = getDay(value);
    newDay !== day && setDay(newDay);
  };

  useEffect(updateStateFromProps, [props.value]);

  const handleDateChange = (year: number, month?: number, day?: number) => {
    setYear(year.toString());
    setMonth(month ? addLeadingZero(month, 2) : "");
    setDay(day ? addLeadingZero(day, 2) : "");
  };

  return (
    <div ref={datePickerRef}>
      <DatePickerField
        showPopup={showPopup}
        day={{ day, setDay }}
        month={{ month, setMonth }}
        year={{ year, setYear }}
        valid={{ isValid, setIsValid }}
        onChange={onChange}
      />

      {isPopupVisible && (
        <DatePickerDrop
          year={Number(year)}
          month={Number(month)}
          day={Number(day)}
          onChangeSelectedDate={handleDateChange}
          level={{ displayedLevel, setDisplayedLevel }}
          decade={{ displayedDecade, setDisplayedDecade }}
        />
      )}
    </div>
  );
};

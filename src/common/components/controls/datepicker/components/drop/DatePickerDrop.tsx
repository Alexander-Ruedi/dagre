import React, { useState } from "react";
import { MonthController } from "./month-drop/MonthController";
import { YearController } from "./year-drop/YearController";
import { DecadeController } from "./decade-drop/DecadeController";
import { SetState } from "../field/DatePickerField";

export enum DatePickerLevel {
  "Month" = "Month",
  "Year" = "Year",
  "Decade" = "Decade",
}
interface DatePickerDrop {
  year: number;
  month: number;
  day: number;
  level: {
    displayedLevel: DatePickerLevel;
    setDisplayedLevel: SetState<DatePickerLevel>;
  };
  decade: {
    displayedDecade: number;
    setDisplayedDecade: SetState<number>;
  };
  onChangeSelectedDate: (year: number, month?: number, day?: number) => void;
}
export const DatePickerDrop = (props: DatePickerDrop) => {
  const { year, day, month, level, onChangeSelectedDate } = props;
  const [displayedMonth, setDisplayedMonth] = useState(month);
  const [displayedYear, setDisplayedYear] = useState(year);
  const { displayedLevel, setDisplayedLevel } = props.level;
  const { displayedDecade, setDisplayedDecade } = props.decade;

  return (
    <div className="absolute z-10 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-72">
      {displayedLevel === DatePickerLevel.Month && (
        <MonthController
          displayed={{ month: { month: displayedMonth, setMonth: setDisplayedMonth }, year: { year: displayedYear, setYear: setDisplayedYear } }}
          selected={{ day, month, year }}
          day={day}
          onChangeSelectedDate={onChangeSelectedDate}
          onChangeLevel={setDisplayedLevel}
        />
      )}

      {displayedLevel === DatePickerLevel.Year && (
        <YearController
          displayed={{ month: { month: displayedMonth, setMonth: setDisplayedMonth }, year: { year: displayedYear, setYear: setDisplayedYear } }}
          day={day}
          onChangeSelectedDate={(newYear, newMonth) => {
            setDisplayedLevel(DatePickerLevel.Month);
            setDisplayedMonth(newMonth);
            onChangeSelectedDate(newYear, newMonth);
          }}
          onChangeLevel={setDisplayedLevel}
        />
      )}

      {displayedLevel === DatePickerLevel.Decade && (
        <DecadeController
          displayed={{
            month: { month: displayedMonth, setMonth: setDisplayedMonth },
            year: { year: displayedYear, setYear: setDisplayedYear },
            decade: { displayedDecade, setDisplayedDecade },
          }}
          day={day}
          onChangeSelectedDate={(newYear) => {
            setDisplayedLevel(DatePickerLevel.Year);
            setDisplayedYear(newYear);
            onChangeSelectedDate(newYear);
          }}
        />
      )}
    </div>
  );
};

import { SetState } from "../../field/DatePickerField";
import { DatePickerDropHeader } from "../DatePickerDropHeader";
import { YearGrid } from "./YearGrid";
import React from "react";
import { DatePickerLevel } from "../DatePickerDrop";

interface DayControllerProps {
  day: number;
  displayed: {
    month: {
      month: number;
      setMonth: SetState<number>;
    };
    year: {
      year: number;
      setYear: SetState<number>;
    };
  };
  onChangeSelectedDate: (year: number, month: number) => void;
  onChangeLevel: (newLevel: DatePickerLevel) => void;
}

export const YearController = (props: DayControllerProps) => {
  const { day, onChangeSelectedDate, onChangeLevel } = props;
  const { month, setMonth } = props.displayed.month;
  const { year, setYear } = props.displayed.year;

  return (
    <div className="m-3.5">
      <DatePickerDropHeader
        label={year.toString()}
        onClickLabel={() => onChangeLevel(DatePickerLevel.Decade)}
        onShowNext={() => setYear(year + 1)}
        onShowPrevious={() => setYear(year - 1)}
      />
      <YearGrid
        displayed={{ month: month, year: year }}
        selected={{ day, month, year }}
        onChangeSelectedDate={(newMonth) => {
          onChangeSelectedDate(year, newMonth);
        }}
      />
    </div>
  );
};

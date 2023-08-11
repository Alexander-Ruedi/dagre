import { SetState } from "../../field/DatePickerField";
import { DatePickerDropHeader } from "../DatePickerDropHeader";
import { MonthGrid } from "./MonthGrid";
import React from "react";
import { DatePickerLevel } from "../DatePickerDrop";
import { monthTexts } from "../../../../month-range/components/MonthComponent";

interface DayControllerProps {
  day: number;
  selected: {
    day: number;
    month: number;
    year: number;
  };
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
  onChangeSelectedDate: (year: number, month?: number, day?: number) => void;
  onChangeLevel: (newLevel: DatePickerLevel) => void;
}

export const MonthController = (props: DayControllerProps) => {
  const { day, onChangeSelectedDate, onChangeLevel } = props;
  const { month, setMonth } = props.displayed.month;
  const { year, setYear } = props.displayed.year;
  const handleShowNext = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const handleShowPrevious = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <div className="m-3.5">
      <DatePickerDropHeader
        label={monthTexts[month] + " " + year}
        onClickLabel={() => onChangeLevel(DatePickerLevel.Year)}
        onShowNext={handleShowNext}
        onShowPrevious={handleShowPrevious}
      />
      <MonthGrid displayed={{ month: month, year: year }} selected={props.selected} onChangeSelectedDate={onChangeSelectedDate} />
    </div>
  );
};

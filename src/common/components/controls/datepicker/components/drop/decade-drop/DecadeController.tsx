import { SetState } from "../../field/DatePickerField";
import { DatePickerDropHeader } from "../DatePickerDropHeader";
import { DecadeGrid } from "./DecadeGrid";
import React from "react";

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
    decade: {
      displayedDecade: number;
      setDisplayedDecade: SetState<number>;
    };
  };
  onChangeSelectedDate: (year: number) => void;
}

export const DecadeController = (props: DayControllerProps) => {
  const { day, onChangeSelectedDate } = props;
  const { month, setMonth } = props.displayed.month;
  const { year, setYear } = props.displayed.year;
  const { displayedDecade, setDisplayedDecade } = props.displayed.decade;

  return (
    <div className="m-3.5">
      <DatePickerDropHeader
        label={"Year"}
        onClickLabel={console.log}
        onShowNext={() => setDisplayedDecade(displayedDecade + 10)}
        onShowPrevious={() => setDisplayedDecade(displayedDecade - 10)}
      />
      <DecadeGrid
        displayed={{ month: month, year: year, decade: displayedDecade }}
        selected={{ day, month, year }}
        onChangeSelectedDate={onChangeSelectedDate}
      />
    </div>
  );
};

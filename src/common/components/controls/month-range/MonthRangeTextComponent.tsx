import React, { useCallback, useEffect, useState } from "react";
import { DisabledReason } from "../../../utils/DisabledTextUtil";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";
import { MonthDate, MonthRangeComponent } from "./MonthRangeComponent";
import { formatMonthDate } from "./utils/DateMonthHelper";

interface DatePickerTextProps {
  dateFrom: string;
  dateTo: string;
  onChange: (fromString: string, toString: string, isValid: boolean) => void;
  isDisabled: boolean;
}

export const MonthRangeTextComponent = (props: DatePickerTextProps) => {
  const getFromDate = useCallback(() => {
    const splittedFromDate = props.dateFrom.split("-");
    return splittedFromDate.length === 2
      ? {
          year: Number(splittedFromDate[0]),
          month: Number(splittedFromDate[1]),
        }
      : { year: 2022, month: 1 };
  }, [props.dateFrom]);

  const getToDate = useCallback(() => {
    const splittedToDate = props.dateTo.split("-");
    return splittedToDate.length === 2
      ? { year: Number(splittedToDate[0]), month: Number(splittedToDate[1]) }
      : {
          year: 2022,
          month: 3,
        };
  }, [props.dateTo]);

  const [from, setFrom] = useState<MonthDate>(getFromDate());
  const [to, setTo] = useState<MonthDate>(getToDate());

  useEffect(() => {
    setFrom(getFromDate());
    setTo(getToDate());
  }, [props, getFromDate, getToDate]);

  return (
    <div className="w-full tooltip">
      <MonthRangeComponent
        from={from}
        to={to}
        onFromChange={(newFrom, isValid) => {
          setFrom(newFrom);

          const formattedFrom = formatMonthDate(newFrom);
          const formattedTo = formatMonthDate(to);
          props.onChange(formattedFrom, formattedTo, isValid);
        }}
        onToChange={(newTo, isValid) => {
          setTo(newTo);

          const formattedFrom = formatMonthDate(from);
          const formattedTo = formatMonthDate(newTo);
          props.onChange(formattedFrom, formattedTo, isValid);
        }}
        disabled={props.isDisabled}
      />
      {props.isDisabled && <TooltipComponent text={DisabledReason.CANNOT_BE_EDITED} />}
    </div>
  );
};

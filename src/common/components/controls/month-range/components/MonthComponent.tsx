import { classNames } from "../../../../utils/StylingUtil";

interface MonthProps {
  monthIndex: number;
  onClick: (newMonth: number) => void;
  isActive?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export enum Months {
  "January" = "January",
  "February" = "February",
  "March" = "March",
  "April" = "April",
  "May" = "May",
  "June" = "June",
  "July" = "July",
  "August" = "August",
  "September" = "September",
  "October" = "October",
  "November" = "November",
  "December" = "December",
}
export const monthTexts = [
  "",
  Months.January,
  Months.February,
  Months.March,
  Months.April,
  Months.May,
  Months.June,
  Months.July,
  Months.August,
  Months.September,
  Months.October,
  Months.November,
  Months.December,
];
export const MonthComponent = (props: MonthProps) => {
  return (
    <div
      onClick={() => props.onClick(props.monthIndex)}
      className={classNames(
        props.isFirst ? "rounded-l-xl bg-gray-300" : "",
        props.isLast ? "rounded-r-xl bg-gray-300" : "",
        props.isActive ? "bg-gray-200" : "bg-white",
        "px-2.5 py-0.5 w-1/3 cursor-pointer hover:bg-gray-100",
      )}
    >
      {monthTexts[props.monthIndex]}
    </div>
  );
};

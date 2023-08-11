import { classNames } from "../../../../utils/StylingUtil";

interface PeriodIconProps {
  active: boolean;
  label: string;
}
export const PeriodIconComponent = (props: PeriodIconProps) => {
  return (
    <svg
      className={classNames(props.active ? "text-white" : " text-msg-red", "h-7 w-7 mr-1.5")}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="1px" />
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="12px"
        fontWeight="400"
        fontFamily="Inter"
        strokeWidth="0px"
        fill={props.active ? "#A01441" : "white"}
      >
        {props.label}
      </text>
    </svg>
  );
};

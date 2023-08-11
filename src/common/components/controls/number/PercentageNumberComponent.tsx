import { NumberFormatValues, NumericFormat } from "react-number-format";
import { getDefaultNumericFormatProps } from "../../../utils/InputUtil";

export enum AdjustmentType {
  ABSOLUTE = "ABSOLUTE",
  PERCENTAGE = "PERCENTAGE",
}
interface PercentageNumberProps {
  onChangeValue: (value: NumberFormatValues) => void;
  value: string | number | null | undefined;
}

export const PercentageNumberComponent = (props: PercentageNumberProps) => {
  return (
    <div className="relative rounded-md shadow-sm">
      <NumericFormat
        className="block w-full h-[30px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        onValueChange={props.onChangeValue}
        value={props.value}
        {...getDefaultNumericFormatProps()}
      />
      <div className="absolute inset-y-0 right-0 flex">
        <label htmlFor="currency" className="sr-only">
          Adjustment
        </label>
        <div className="flex items-center align-middle h-full rounded-md border-0 bg-transparent pl-2 pr-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
          %
        </div>
      </div>
    </div>
  );
};

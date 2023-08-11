import { NumberFormatValues, NumericFormat } from "react-number-format";
import { ServiceAmountTypes, getDisplayedNameForServiceAmountType } from "../../../models/common/ServiceAmountTypesModel";
import { getDefaultNumericFormatProps } from "../../../utils/InputUtil";
import { classNames } from "../../../utils/StylingUtil";

interface AbsolutePercentageNumberProps {
  onChangeValue: (value: NumberFormatValues) => void;
  value: string | number | null | undefined;
  onChangeValueType: (type: ServiceAmountTypes) => void;
  valueType: ServiceAmountTypes;
  smallSize?: boolean;
}

export const AbsolutePercentageNumberComponent = (props: AbsolutePercentageNumberProps) => {
  return (
    <div className="relative rounded-md shadow-sm">
      <NumericFormat
        className={classNames(
          "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
          props.smallSize ? "h-[30px] " : "",
        )}
        onValueChange={props.onChangeValue}
        value={props.value}
        {...getDefaultNumericFormatProps()}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <label htmlFor="currency" className="sr-only">
          Adjustment
        </label>
        <select
          id="type"
          name="type"
          className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          value={props.valueType}
          onChange={(event) => props.onChangeValueType(event.target.value as ServiceAmountTypes)}
        >
          <option value={ServiceAmountTypes.ABSOLUTE}>{getDisplayedNameForServiceAmountType(ServiceAmountTypes.ABSOLUTE, true)}</option>
          <option value={ServiceAmountTypes.PERCENTAGE}>{getDisplayedNameForServiceAmountType(ServiceAmountTypes.PERCENTAGE, true)}</option>
        </select>
      </div>
    </div>
  );
};

import { forwardRef, HTMLProps, InputHTMLAttributes, LegacyRef } from "react";
import { NumericFormat } from "react-number-format";
import { NumericFormatProps } from "react-number-format/types/types";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";

interface NumericFormatForwardRefProps extends NumericFormatProps {
  ref: any;
}
interface InputWithLabelProps extends NumericFormatForwardRefProps {
  disabledText?: string;
}

export const SimpleNumericFormatComponent = forwardRef<NumericFormatForwardRefProps, InputWithLabelProps>(function SimpleNumericFormatComponent(
  props,
  ref,
) {
  const { disabledText, ...otherProps } = props;

  return (
    <div className="tooltip w-full">
      <NumericFormat {...otherProps} />
      {otherProps.disabled && disabledText && <TooltipComponent text={disabledText} />}
    </div>
  );
});

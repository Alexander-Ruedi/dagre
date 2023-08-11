import { forwardRef, InputHTMLAttributes } from "react";
import { classNames } from "../../../utils/StylingUtil";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  tooltipText?: string;
  disabledText?: string;
  disabledTextDirection?: "normal" | "left";
}

export const SimpleInputComponent = forwardRef<HTMLInputElement, InputWithLabelProps>(function SimpleNumberInput(props, ref) {
  const { disabledText, disabledTextDirection, tooltipText, ...otherProps } = props;

  return (
    <div className={classNames("tooltip w-full", disabledTextDirection && disabledTextDirection === "left" ? "tooltip-left" : "")}>
      <input {...otherProps} ref={ref} style={{ width: "calc(100% - 1px)" }} />
      {otherProps.disabled && disabledText && <TooltipComponent text={disabledText} />}
      {!otherProps.disabled && tooltipText && <TooltipComponent text={tooltipText} />}
    </div>
  );
});

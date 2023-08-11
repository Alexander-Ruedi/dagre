import React from "react";
import { classNames } from "../../../utils/StylingUtil";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";
import { defaultButtonStyle } from "./DefaultStyling";

export interface ActionButtonModel {
  icon?: React.ReactNode;
  text: React.ReactNode | string;
  onClick: () => void;
  disabled?: boolean;
  disabledText?: string;
  disabledTextDirection?: "normal" | "left";
  isLoading?: boolean;
  testId?: string;
}

export const SmallActionButtonComponent = (props: ActionButtonModel) => {
  return (
    <button
      className={classNames(
        defaultButtonStyle,
        "ml-3 inline-flex justify-center items-center rounded-md border border-gray-200  px-2.5 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 tooltip",
        props.isLoading ? "cursor-wait" : "",
        props.disabledTextDirection && props.disabledTextDirection === "left" ? "tooltip-left" : "",
      )}
      onClick={() => props.onClick()}
      disabled={props.disabled || props.isLoading}
      data-testid={props.testId}
    >
      {props.disabled && props.disabledText && <TooltipComponent text={props.disabledText} />}
      {props.icon}
      {props.text}
    </button>
  );
};

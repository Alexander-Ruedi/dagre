import React from "react";
import { classNames } from "../../../utils/StylingUtil";
import { TooltipComponent } from "./TooltipComponent";

export interface ActionButtonModel {
  icon?: React.ReactNode;
  hoverText: string;
  onClick: () => void;
  disabled?: boolean;
  disabledTextDirection?: "normal" | "left";
}
export const TooltipActionButtonComponent = (props: ActionButtonModel) => {
  return (
    <button
      className={classNames(
        "bg-transparent tooltip inline-flex items-center rounded-md bg-indigo-600 p-1 text-msg-red hover:shadow-sm hover:bg-gray-300 disabled:bg-gray-200 disabled:text-msg-gray tooltip",
        props.disabledTextDirection === "left" ? "tooltip-left" : "",
      )}
      ref={(ref) => {
        if (!ref) return;
        ref.onclick = (e) => {
          props.onClick();
          e.stopPropagation();
        };
      }}
      disabled={props.disabled}
    >
      {props.icon}
      <TooltipComponent text={props.hoverText} />
    </button>
  );
};

import React from "react";

export interface ActionButtonModel {
  icon?: React.ReactNode;
  text: React.ReactNode | string;
  onClick: () => void;
  disabled?: boolean;
}

export const TextButtonComponent = (props: ActionButtonModel) => {
  return (
    <button
      className={"text-msg-red hover:font-semibold hover:underline inline-flex justify-center items-center py-1.5 text-sm font-medium "}
      onClick={() => props.onClick()}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

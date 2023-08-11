import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { classNames } from "../../../utils/StylingUtil";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";
import { defaultDisabledDropdownStyle } from "./DefaultDisabledDropdownStyle";

interface DisabledDropdownProps {
  label?: string;
  value?: string;
  disabledText?: string;
  disabledTextDirection?: "normal" | "left";
}

export default function DisabledDropdownComponent(props: DisabledDropdownProps) {
  return (
    <Listbox value={props.value}>
      <>
        <Listbox.Label
          className={classNames(
            "block text-sm font-medium text-gray-700 tooltip",
            props.disabledTextDirection && props.disabledTextDirection === "left" ? "tooltip-left" : "",
          )}
        />
        <div className="relative w-full tooltip">
          <Listbox.Button className={defaultDisabledDropdownStyle}>
            <span className="block truncate">{props.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" />
          </Listbox.Button>
          {props.disabledText && <TooltipComponent text={props.disabledText} />}

          <Transition show={false} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" />
        </div>
      </>
    </Listbox>
  );
}

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";
import { classNames } from "../../../utils/StylingUtil";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";
import { defaultDropdownStyleOutsideCard, defaultDropdownStyleWithinCard } from "./DefaultDisabledDropdownStyle";
import { DropdownModel } from "./models/DropdownModel";
import { getSelectedDropdownItem } from "./utils/DropdownUtils";

interface DropdownProps {
  placeholder?: string;
  items: Array<DropdownModel>;
  onChange: (id: string) => void;
  value?: string | null;
  disabled?: boolean;
  hasRedStyling?: boolean;
  allowedMaxWidth?: string;
  keepOrder?: boolean;
  isOutsideCard?: boolean;
  disabledText?: string;
  disabledTextDirection?: "normal" | "left";
}

export default function DropdownComponent(props: DropdownProps) {
  const labelCSS = classNames("block text-sm font-medium  cursor-pointer", !props.hasRedStyling ? "text-gray-700" : "");
  const spanCSS = classNames("block truncate", props.hasRedStyling ? "text-msg-red font-medium" : "");
  const sortedItems = props.items.slice().sort((a, b) => a.label.localeCompare(b.label));

  const optionsStyling = props.allowedMaxWidth ? { maxWidth: props.allowedMaxWidth } : undefined;

  return (
    <div className="z-1 relative cursor-pointer">
      <Listbox
        value={props.value || ""}
        onChange={(id: string) => {
          props.onChange(id);
        }}
        disabled={props.disabled}
      >
        {({ open }) => {
          return (
            <>
              <Listbox.Label className={labelCSS} />
              <div
                className={classNames(
                  "relative w-full tooltip",
                  props.disabledTextDirection && props.disabledTextDirection === "left" ? "tooltip-left" : "",
                )}
              >
                <Listbox.Button className={props.isOutsideCard ? defaultDropdownStyleOutsideCard : defaultDropdownStyleWithinCard}>
                  <span className={spanCSS}>
                    <span>{getSelectedDropdownItem(props.items, props.value, props.placeholder).label}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {!props.disabled && <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                  </span>
                </Listbox.Button>
                {props.disabled && props.disabledText && <TooltipComponent text={props.disabledText} />}

                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options
                    className="min-w-full absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute z-10"
                    style={optionsStyling}
                  >
                    {(props.keepOrder ? props.items : sortedItems).map((item: any) => (
                      <Listbox.Option
                        key={item.id}
                        className={({ active }) =>
                          classNames(active ? "text-white bg-indigo-600" : "text-gray-900", "relative select-none py-2 pl-3 pr-9 cursor-pointer")
                        }
                        value={item.id}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>{item.label}</span>

                            {selected ? (
                              <span
                                className={classNames(active ? "text-white" : "text-indigo-600", "absolute inset-y-0 right-0 flex items-center pr-4")}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          );
        }}
      </Listbox>
    </div>
  );
}

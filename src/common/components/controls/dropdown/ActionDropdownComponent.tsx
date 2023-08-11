import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";
import { classNames } from "../../../utils/StylingUtil";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";
import { NEW_ACTION_ITEM_ID } from "../autocomplete/data/AutocompleteData";
import { DropdownModel } from "./models/DropdownModel";
import { getSelectedDropdownItem } from "./utils/DropdownUtils";

interface DropdownProps {
  actionItem: DropdownModel;
  onActionItem: () => void;
  placeholder?: string;
  items: Array<DropdownModel>;
  onChange: (id: string) => void;
  value?: string | null;
  disabled?: boolean;
  allowedMaxWidth?: string;
  disabledText?: string;
}

export const ActionDropdownComponent = (props: DropdownProps) => {
  const sortedItems = props.items.slice().sort((a, b) => a.label.localeCompare(b.label));
  const optionsStyling = props.allowedMaxWidth ? { maxWidth: props.allowedMaxWidth } : undefined;

  return (
    <div className="z-1 relative cursor-pointer">
      <Listbox
        value={props.value}
        onChange={(id: string) => {
          if (id !== NEW_ACTION_ITEM_ID) {
            props.onChange(id);
          }
        }}
        disabled={props.disabled}
      >
        {({ open }) => {
          return (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700 cursor-pointer" />
              <div className="relative w-full tooltip">
                <Listbox.Button className="relative w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100">
                  <span className="block truncate">{getSelectedDropdownItem(props.items, props.value, props.placeholder).label}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                {props.disabled && props.disabledText && <TooltipComponent text={props.disabledText} />}

                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options
                    className="absolute z-10 mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute z-10"
                    style={optionsStyling}
                  >
                    <Listbox.Option
                      onClick={() => {
                        props.onActionItem();
                      }}
                      key={props.actionItem.id}
                      className={({ active }) =>
                        classNames(active ? "text-white bg-indigo-600" : "text-gray-900", "relative select-none py-2 pl-3 pr-9 cursor-pointer")
                      }
                      value={props.actionItem.id}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                            &lt;{props.actionItem.label}&gt;
                          </span>

                          {selected && (
                            <span
                              className={classNames(active ? "text-white" : "text-indigo-600", "absolute inset-y-0 right-0 flex items-center pr-4")}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                    {sortedItems.map((item: any) => (
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
};

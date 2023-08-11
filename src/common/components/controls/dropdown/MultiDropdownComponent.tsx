import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { classNames } from "../../../utils/StylingUtil";
import { defaultDropdownStyleOutsideCard, defaultDropdownStyleWithinCard } from "./DefaultDisabledDropdownStyle";
import { DropdownModel } from "./models/DropdownModel";

interface DropdownProps {
  placeholder?: string;
  items: Array<DropdownModel>;
  onChange: (id: Array<DropdownModel>) => void;
  value: Array<DropdownModel>;
  disabled?: boolean;
  hasRedStyling?: boolean;
  multiple?: boolean;
  isOutsideCard?: boolean;
}

export default function MultiDropdownComponent(props: DropdownProps) {
  const labelCSS = classNames("block text-sm font-medium  cursor-pointer", !props.hasRedStyling ? "text-gray-700" : "");
  const spanCSS = classNames("block truncate", props.hasRedStyling ? "text-msg-red font-normal" : "");

  const getValue = (value: DropdownModel | DropdownModel[]) => {
    if (Array.isArray(value)) {
      return value.map((item) => item.label).join(", ");
    } else {
      return value.label;
    }
  };

  return (
    <div className="z-1 relative cursor-pointer">
      <Listbox value={props.value} onChange={props.onChange} disabled={props.disabled} multiple={props.multiple}>
        {({ open }) => (
          <>
            <Listbox.Label className={labelCSS} />
            <div className="relative w-full">
              <Listbox.Button
                className={classNames(props.isOutsideCard ? defaultDropdownStyleOutsideCard : defaultDropdownStyleWithinCard, " shadow")}
              >
                <span className={spanCSS}>{getValue(props.value) || "Please Select"}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="min-w-full absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute z-10">
                  {props.items.map((item: DropdownModel) => (
                    <Listbox.Option
                      key={item.id}
                      value={item}
                      className={({ active }) =>
                        classNames(active ? "text-white bg-indigo-600" : "text-gray-900", "relative select-none py-2 pl-3 pr-9 cursor-pointer")
                      }
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
        )}
      </Listbox>
    </div>
  );
}

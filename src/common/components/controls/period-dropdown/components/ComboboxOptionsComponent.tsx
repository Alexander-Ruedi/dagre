import { Combobox } from "@headlessui/react";
import { ChevronRightIcon, FolderIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../../../utils/StylingUtil";
import { DropdownModel } from "../../dropdown/models/DropdownModel";

export interface ComboboxOptionProps {
  optionsLabel: string;
  onClick: (newId: string) => void;
  items: Array<DropdownModel>;
  selectedBucketId: string;
}
export const ComboboxOptionsComponent = (props: ComboboxOptionProps) => {
  return (
    <Combobox.Options key={"all"} static className="divide-y divide-gray-500 divide-opacity-10 ">
      <li className="px-1">
        <h2 className="mb-1 mt-2 px-2 text-xs font-semibold text-gray-900">{props.optionsLabel}</h2>
        <ul className="text-sm text-gray-900">
          {props.items.map((item) => {
            const isActive = item.id === props.selectedBucketId;
            return (
              <Combobox.Option
                key={item.id}
                value={item.id}
                className={() =>
                  classNames(
                    "flex cursor-default select-none items-center rounded-md px-3 py-2 mb-1 cursor-pointer ",
                    isActive ? "bg-gray-200" : "bg-white hover:bg-gray-100 hover:text-gray-900",
                  )
                }
                onClick={() => props.onClick(item.id)}
              >
                {() => (
                  <>
                    <FolderIcon className={classNames("h-6 w-6 flex-none text-gray-900")} aria-hidden="true" />
                    <span className="ml-3 flex-auto truncate text-sm font-medium text-gray-900">{item.label}</span>
                    {isActive && <ChevronRightIcon className="ml-3 h-5 w-5 flex-none text-gray-400" aria-hidden="true" />}
                  </>
                )}
              </Combobox.Option>
            );
          })}
        </ul>
      </li>
    </Combobox.Options>
  );
};

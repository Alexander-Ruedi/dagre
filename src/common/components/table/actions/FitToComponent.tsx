import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { classNames } from "../../../utils/StylingUtil";
import { defaultButtonStyle } from "../../controls/button/DefaultStyling";
import { CheckIcon } from "@heroicons/react/24/outline";

export enum FitToChange {
  SCREEN = "SCREEN",
  CONTENT = "CONTENT",
}

interface FitToComponentProps {
  onChange: (change: FitToChange) => void;
  disabled: boolean;
  value: FitToChange;
}

export const FitToComponent = (props: FitToComponentProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left ml-3 max-h-[30px]" data-testid="fitTo">
      <div className="flex max-h-full">
        <Menu.Button
          className={
            defaultButtonStyle +
            "inline-flex w-full justify-center items-center rounded-md border border-gray-300 px-2.5 py-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          }
          disabled={props.disabled}
        >
          Fit to
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => props.onChange(FitToChange.SCREEN)}
                  className={classNames(
                    props.value === FitToChange.SCREEN ? "" : "hover:bg-gray-100 hover:text-gray-900 cursor-pointer",
                    "inline-flex pl-2 pr-4 py-2 text-sm w-full text-left",
                  )}
                >
                  <CheckIcon
                    className={classNames(props.value === FitToChange.SCREEN ? "text-black" : "text-transparent", "h-5 w-5")}
                    aria-hidden="true"
                  />
                  <span className="ml-1">Fit to screen</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => props.onChange(FitToChange.CONTENT)}
                  className={classNames(
                    props.value === FitToChange.CONTENT ? "" : "hover:bg-gray-100 hover:text-gray-900 cursor-pointer",
                    "inline-flex pl-2 pr-4 py-2 text-sm w-full text-left",
                  )}
                >
                  <CheckIcon
                    className={classNames(props.value === FitToChange.CONTENT ? "text-black" : "text-transparent", "h-5 w-5")}
                    aria-hidden="true"
                  />
                  <span className="ml-1">Fit to content</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

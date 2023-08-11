import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { DisabledReason } from "../../../utils/DisabledTextUtil";
import { classNames } from "../../../utils/StylingUtil";
import { defaultButtonStyle } from "../../controls/button/DefaultStyling";
import { LoadingStatus } from "../../form/submit/components/LoadingSpinnerButtonComponent";
import { SpinnerComponent } from "../../form/submit/components/SpinnerComponent";
import { AttributeChange } from "../models/ChangeAttributeModel";
import { TooltipComponent } from "../tooltip/TooltipComponent";

interface ChangeAttributeProps {
  onChange: (change: AttributeChange) => void;
  disabled: boolean;
  showExpenseIncome: boolean;
  status?: LoadingStatus;
}

export const ChangeAttributesComponent = (props: ChangeAttributeProps) => {
  const isLoading = props.status === LoadingStatus.LOADING;

  return (
    <Menu as="div" className="relative inline-block text-left ml-3 max-h-[30px]">
      <div className="flex max-h-full">
        <Menu.Button
          className={
            defaultButtonStyle +
            "inline-flex w-full justify-center items-center rounded-md border border-gray-300 px-2.5 py-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 tooltip tooltip-left"
          }
          disabled={isLoading || props.disabled}
        >
          {<SpinnerComponent isLoading={isLoading} />}
          <span>Change attribute(s)</span>
          {props.disabled && <TooltipComponent text={DisabledReason.CHANGE_ATTRIBUTES_DISABLED} />}
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
                  onClick={() => props.onChange(AttributeChange.RELEVANT)}
                  className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm w-full text-left")}
                >
                  Set as relevant
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => props.onChange(AttributeChange.IRRELEVANT)}
                  className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm w-full text-left")}
                >
                  Set as irrelevant
                </button>
              )}
            </Menu.Item>
          </div>
          {props.showExpenseIncome && (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => props.onChange(AttributeChange.EXPENSE)}
                    className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm w-full text-left")}
                  >
                    Set as expense
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => props.onChange(AttributeChange.INCOME)}
                    className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm w-full text-left")}
                  >
                    Set as income
                  </button>
                )}
              </Menu.Item>
            </div>
          )}

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => props.onChange(AttributeChange.PASSTHROUGH)}
                  className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm w-full text-left")}
                >
                  Set as pass-through
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => props.onChange(AttributeChange.VALUEADDED)}
                  className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm w-full text-left")}
                >
                  Set as value-added
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

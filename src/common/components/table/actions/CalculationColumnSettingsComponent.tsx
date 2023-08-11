import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { CalculationLevel, CalculationMode } from "../../../../calculation/table/CalculationPage";
import { defaultButtonStyle } from "../../controls/button/DefaultStyling";
import { ToggleButtonComponent } from "../../controls/button/ToogleButtonComponent";

export interface CalculationColumnSettings {
  hideTargetAllocationShare?: boolean;
  hideTargetAllocationAmount?: boolean;
  hideTargetAllocationFinalAmount?: boolean;
  hideTargetAllocationFinalAmountBillingPeriod?: boolean;
  hideBilledAmount?: boolean;
  hideTrueUp?: boolean;
  hideCurrentBilling?: boolean;
  hideRecipientsWithNoCharges?: boolean;
}

export const defaultAllocationColumnSettings: CalculationColumnSettings = {
  hideTargetAllocationShare: false,
  hideTargetAllocationAmount: false,
  hideTargetAllocationFinalAmount: false,
  hideTargetAllocationFinalAmountBillingPeriod: false,
  hideBilledAmount: false,
  hideTrueUp: false,
  hideCurrentBilling: false,
  hideRecipientsWithNoCharges: false,
};

interface CalculationColumnSettingsComponentProps {
  calculationColumnSettings: CalculationColumnSettings;
  setCalculationColumnSettings: (calculationColumnSettings: CalculationColumnSettings) => void;
  calculationMode: CalculationMode;
  calculationLevel: CalculationLevel;
}

export const CalculationColumnSettingsComponent = (props: CalculationColumnSettingsComponentProps) => {
  const { calculationColumnSettings, setCalculationColumnSettings, calculationMode, calculationLevel } = props;
  const atLeastOneColumnIsHideToBeFP =
    calculationColumnSettings.hideTargetAllocationShare ||
    calculationColumnSettings.hideTargetAllocationAmount ||
    calculationColumnSettings.hideTargetAllocationFinalAmount;
  const atLeastOneColumnIsHideToBeBP = atLeastOneColumnIsHideToBeFP || calculationColumnSettings.hideTargetAllocationFinalAmountBillingPeriod;
  const atLeastOneColumnIsHideTrueUp =
    atLeastOneColumnIsHideToBeBP ||
    calculationColumnSettings.hideBilledAmount ||
    calculationColumnSettings.hideTrueUp ||
    calculationColumnSettings.hideCurrentBilling;
  return (
    <Menu as="div" className="relative inline-block text-left ml-3 max-h-[30px]">
      <div className="flex max-h-full">
        <Menu.Button
          className={
            defaultButtonStyle +
            "inline-flex w-full justify-center items-center rounded-md border border-gray-300 px-2.5 py-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 tooltip tooltip-left"
          }
        >
          <span>Show / hide columns</span>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2 flex flex-col px-4 space-y-4">
            <ToggleButtonComponent
              label={"Recipients with no charges"}
              checked={!calculationColumnSettings.hideRecipientsWithNoCharges}
              onChange={(checked) => setCalculationColumnSettings({ ...calculationColumnSettings, hideRecipientsWithNoCharges: !checked })}
            />
          </div>

          <div className="py-2 flex flex-col px-4 space-y-4">
            <ToggleButtonComponent
              label={"Target allocation %"}
              checked={!calculationColumnSettings.hideTargetAllocationShare}
              onChange={(checked) => setCalculationColumnSettings({ ...calculationColumnSettings, hideTargetAllocationShare: !checked })}
            />

            <ToggleButtonComponent
              label={"Target allocation amount"}
              checked={!calculationColumnSettings.hideTargetAllocationAmount}
              onChange={(checked) => setCalculationColumnSettings({ ...calculationColumnSettings, hideTargetAllocationAmount: !checked })}
            />

            <ToggleButtonComponent
              label={"Target allocation Final amount"}
              checked={!calculationColumnSettings.hideTargetAllocationFinalAmount}
              onChange={(checked) => setCalculationColumnSettings({ ...calculationColumnSettings, hideTargetAllocationFinalAmount: !checked })}
            />

            {calculationLevel === CalculationLevel.BILLING_PERIOD && (
              <ToggleButtonComponent
                label={"Target allocation billing period"}
                checked={!calculationColumnSettings.hideTargetAllocationFinalAmountBillingPeriod}
                onChange={(checked) =>
                  setCalculationColumnSettings({ ...calculationColumnSettings, hideTargetAllocationFinalAmountBillingPeriod: !checked })
                }
              />
            )}
          </div>

          {calculationMode === CalculationMode.TRUE_UP && (
            <div className="py-2 flex flex-col px-4 space-y-4">
              <ToggleButtonComponent
                label={"Billed amount"}
                checked={!calculationColumnSettings.hideBilledAmount}
                onChange={(checked) => setCalculationColumnSettings({ ...calculationColumnSettings, hideBilledAmount: !checked })}
              />

              <ToggleButtonComponent
                label={"True-up"}
                checked={!calculationColumnSettings.hideTrueUp}
                onChange={(checked) => setCalculationColumnSettings({ ...calculationColumnSettings, hideTrueUp: !checked })}
              />

              <ToggleButtonComponent
                label={"Current billing"}
                checked={!calculationColumnSettings.hideCurrentBilling}
                onChange={(checked) => setCalculationColumnSettings({ ...calculationColumnSettings, hideCurrentBilling: !checked })}
              />
            </div>
          )}

          <div className="py-2 flex flex-col px-4 space-y-4">
            <button
              onClick={() => setCalculationColumnSettings(defaultAllocationColumnSettings)}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500"
              disabled={
                !(
                  (calculationMode === CalculationMode.TRUE_UP && atLeastOneColumnIsHideTrueUp) ||
                  (calculationLevel === CalculationLevel.BILLING_PERIOD && atLeastOneColumnIsHideToBeBP) ||
                  atLeastOneColumnIsHideToBeFP ||
                  calculationColumnSettings.hideRecipientsWithNoCharges
                )
              }
            >
              Reset
            </button>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

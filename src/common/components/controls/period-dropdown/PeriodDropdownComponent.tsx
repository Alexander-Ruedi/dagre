import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { classNames } from "../../../utils/StylingUtil";
import { SearchComponent } from "../../table/actions/SearchComponent";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";
import { FinancialPeriodListComponent } from "./components/FinancialPeriodListComponent";
import { SearchableBucketListComponent } from "./components/SearchableBucketListComponent";
import "./style/background-animation.css";
export interface PeriodDropdownProps {
  label?: string;
  onFinancialPeriodChange: (newFinancialPeriodId: string) => void;
  onBillingPeriodChange: (newBillingPeriodId: string) => void;
  selectedFinancialPeriodId?: string;
  selectedBillingPeriodId?: string;
  showBillingPeriods?: boolean;
  isFinancialPeriodDisabled?: boolean;
  disabled?: boolean;
  disabledText?: string;
  disabledTextDirection?: "normal" | "left";
}

export const PeriodDropdownComponent = (props: PeriodDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const [selectedBucketId, setSelectedBucketId] = useState("");

  const selectorRef = useRef<HTMLDivElement>(null);
  const onClickOutside = useDetectOutsideClick(selectorRef);
  onClickOutside.subscribe((target) => {
    const navigation = document.getElementById("navigation");
    const isWithin = navigation?.contains(target);
    !isWithin && setOpen(false);
  });

  return (
    <>
      <div
        className={classNames(open ? "visible-transition" : "invisible-transition", "fixed inset-0 bg-gray-500", props.disabled ? "z-0" : "z-10")}
      />
      <div
        className={classNames(
          "absolute inline-flex",
          props.disabled ? "z-0" : "z-20",
          "tooltip",
          props.disabledTextDirection && props.disabledTextDirection === "left" ? "tooltip-left" : "",
        )}
        ref={selectorRef}
        data-testid="periodDropdownComponent"
      >
        <div className={classNames(props.disabled ? "" : "shadow", "border border-gray-300 overflow-hidden rounded-md bg-white z-30 min-w-[260px]")}>
          <div
            className={classNames("flex justify-between", props.disabled ? "bg-gray-100" : "cursor-pointer hover:bg-gray-50")}
            onClick={() => !props.disabled && setOpen(!open)}
          >
            <span className="block truncate text-gray-900 py-2 pl-3 h-9 text-sm">{props.label}</span>
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400 mr-2 my-2 min-w-[20px]" aria-hidden="true" />
          </div>
          {open && (
            <>
              <div className="mx-2 h-8">
                <SearchComponent onSearch={setSearchTerm} searchTerm={searchTerm} />
              </div>
              <Combobox>
                <div className="pt-2 h-96 overflow-y-auto">
                  <SearchableBucketListComponent
                    onInitialRender={setSelectedBucketId}
                    onClick={setSelectedBucketId}
                    selectedBucketId={selectedBucketId}
                    searchTerm={searchTerm}
                  />
                </div>
              </Combobox>
            </>
          )}

          {props.disabled && props.disabledText && <TooltipComponent text={props.disabledText} />}
        </div>
        {open && (
          <div className="min-w-[260px] -ml-2.5 mt-20 pt-1 pl-4 pr-1 h-96 shadow border-r border-y shadow-y shadow-r rounded-r-md bg-white z-20 overflow-y-auto z-20">
            <FinancialPeriodListComponent
              selectedBucketId={selectedBucketId}
              onFinancialPeriodChange={(newFinancialPeriodId) => {
                props.onFinancialPeriodChange(newFinancialPeriodId);
                //setOpen(false);
              }}
              onBillingPeriodChange={(newBillingPeriodId) => {
                props.onBillingPeriodChange(newBillingPeriodId);
                //setOpen(false);
              }}
              selectedFinancialPeriodId={props.selectedFinancialPeriodId}
              selectedBillingPeriodId={props.selectedBillingPeriodId}
              showBillingPeriods={props.showBillingPeriods}
              isFinancialPeriodDisabled={props.isFinancialPeriodDisabled}
              searchTerm={searchTerm}
            />
            <div className="absolute bottom-0 right-0 cursor-pointer hover:bg-gray-200 m-3.5 z-30 p-1" data-testid="closePeriodDropdownComponent">
              <XMarkIcon className="h-5 w-5" onClick={() => setOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

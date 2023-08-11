import React from "react";
import { useSelector } from "react-redux";
import { ReducerModel } from "../../../../store/models/ReducerMapModel";
import { getFinancialPeriodLabel } from "../../../../utils/DisplayUtil";
import { classNames } from "../../../../utils/StylingUtil";
import { PeriodIconComponent } from "../icons/PeriodIconComponent";
import { BillingPeriodListComponent } from "./BillingPeriodListComponent";

interface FinancialPeriodListProps {
  showBillingPeriods?: boolean;
  selectedFinancialPeriodId?: string;
  selectedBillingPeriodId?: string;
  selectedBucketId: string;
  onFinancialPeriodChange: (newFinancialPeriodId: string) => void;
  onBillingPeriodChange: (newFinancialPeriodId: string) => void;
  isFinancialPeriodDisabled?: boolean;
  searchTerm: string;
}
export const FinancialPeriodListComponent = (props: FinancialPeriodListProps) => {
  const isDisabled = props.isFinancialPeriodDisabled;
  const hasSearchTerm = props.searchTerm !== "";
  const allFinancialPeriods = useSelector((state: ReducerModel) => state.financialPeriod.all);
  const financialPeriods = allFinancialPeriods.filter(
    (financialPeriod) => props.selectedBucketId === "all" || financialPeriod.bucketId === props.selectedBucketId,
  );

  const isOneLevelSearch = !hasSearchTerm || isDisabled;

  const filteredFinancialPeriods = isOneLevelSearch
    ? financialPeriods
    : financialPeriods.filter((financialPeriod) => getFinancialPeriodLabel(financialPeriod).toLowerCase().includes(props.searchTerm.toLowerCase()));

  const filteredFinancialPeriodIds = filteredFinancialPeriods.map((financialPeriod) => financialPeriod.id);

  const matchingFinancialPeriodIds = isOneLevelSearch
    ? []
    : financialPeriods
        .filter(
          (financialPeriod) =>
            financialPeriod.name.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
            financialPeriod.type.toLowerCase().includes(props.searchTerm.toLowerCase()),
        )
        .map((financialPeriod) => financialPeriod.id);

  return (
    <>
      {financialPeriods.map((financialPeriod) => {
        const isSelected = financialPeriod.id === props.selectedFinancialPeriodId;
        const isVisible = filteredFinancialPeriodIds.indexOf(financialPeriod.id) !== -1;
        const isMatch = matchingFinancialPeriodIds.indexOf(financialPeriod.id) !== -1;

        return (
          <div key={financialPeriod.id}>
            {isVisible && !props.isFinancialPeriodDisabled && (
              <div
                className={classNames(
                  isDisabled ? "bg-gray-600 text-gray-100 cursor-default" : "cursor-pointer",
                  !isDisabled && isSelected ? "bg-msg-red text-white" : "bg-white",
                  !isDisabled && !isSelected ? "hover:bg-gray-100 hover:text-gray-900" : "",
                  "mt-1 w-full px-3 py-2 group flex w-full items-center rounded-md py-2 pl-2 pr-2 text-sm font-medium text-left",
                )}
                onClick={() => !isDisabled && props.onFinancialPeriodChange(financialPeriod.id)}
              >
                <PeriodIconComponent active={isSelected} label={"FP"} />
                {getFinancialPeriodLabel(financialPeriod)}
              </div>
            )}
            {isVisible && props.isFinancialPeriodDisabled && (
              <h2 className="mb-1 mt-2 px-2 text-xs font-semibold text-gray-900">{getFinancialPeriodLabel(financialPeriod)}</h2>
            )}

            {props.showBillingPeriods && (
              <BillingPeriodListComponent
                selectedBucketId={props.selectedBucketId}
                onChange={props.onBillingPeriodChange}
                selectedFinancialPeriodId={financialPeriod.id}
                selectedBillingPeriodId={props.selectedBillingPeriodId}
                searchTerm={isMatch ? "" : props.searchTerm}
                isFinancialPeriodDisabled={props.isFinancialPeriodDisabled}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

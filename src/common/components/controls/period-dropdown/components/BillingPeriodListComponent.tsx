import React from "react";
import { useSelector } from "react-redux";
import { ReducerModel } from "../../../../store/models/ReducerMapModel";
import { classNames } from "../../../../utils/StylingUtil";
import { PeriodIconComponent } from "../icons/PeriodIconComponent";

interface FinancialPeriodListProps {
  selectedBillingPeriodId?: string;
  selectedFinancialPeriodId?: string;
  selectedBucketId: string;
  onChange: (newBillingPeriodId: string) => void;
  searchTerm: string;
  isFinancialPeriodDisabled?: boolean;
}
export const BillingPeriodListComponent = (props: FinancialPeriodListProps) => {
  const allBillingPeriods = useSelector((state: ReducerModel) => state.billingPeriod.all);
  const billingPeriods = allBillingPeriods.filter((billingPeriod) => billingPeriod.financialPeriodId === props.selectedFinancialPeriodId);
  const filteredBillingPeriods =
    props.searchTerm === ""
      ? billingPeriods
      : billingPeriods.filter((billingPeriod) => billingPeriod.name.toLowerCase().includes(props.searchTerm.toLowerCase()));

  return (
    <ul className="overflow-y-auto">
      {filteredBillingPeriods.map((billingPeriod) => {
        const isSelected = billingPeriod.id === props.selectedBillingPeriodId;
        return (
          <li
            key={billingPeriod.id}
            className={classNames(
              props.isFinancialPeriodDisabled ? "pl-2" : "pl-10 ",
              isSelected ? "bg-msg-red text-white" : "bg-white",
              !isSelected ? "hover:bg-gray-100 hover:text-gray-900 cursor-pointer" : "cursor-default",
              "w-full px-3 py-1.5 group flex w-full items-center rounded-md pr-2 text-sm font-medium text-left text-gray-900 mb-1",
            )}
            onClick={() => props.onChange(billingPeriod.id)}
          >
            <PeriodIconComponent active={isSelected} label={"BP"} />
            {billingPeriod.name}
          </li>
        );
      })}
    </ul>
  );
};

import { Service } from "./ServiceModel";
import { ServiceAmountTypes } from "./common/ServiceAmountTypesModel";

export interface ServiceRules {
  id: string;
  financialPeriodId: string;
  expenseIncomeDataId: string;
  serviceId: string;
  service?: Service;
  amount: number;
  amountType: ServiceAmountTypes;
  percentage: number;
  calculatedAmount: number;
  comment: string;
}

export interface ServiceRuleResponse {
  serviceId: string;
  allocations: Array<ServiceRules>;
}

export interface ExclusionReason {
  id: string;
  description: string;
}
export interface AllocationRuleExclusion {
  id: string;
  expenseIncomeDataId: string;
  percentage: number;
  calculatedAmount: number;
  comment: string;
  exclusionReason: ExclusionReason;
}

export interface DirectAllocationRules {
  expenseIncomeDataId: string;
  serviceId: string;
  amount: number;
}
export interface AbsoluteAllocationRules {
  id: string;
  expenseIncomeDataId: string;
  serviceId: string;
  calculatedAmount: number;
  comment: string;
}
export interface PercentageAllocationRules {
  id: string;
  expenseIncomeDataId: string;
  serviceId: string;
  percentage: number;
  calculatedAmount: number;
  comment: string;
}

export interface AllocationRule {
  expenseIncomeDataId: string;
  exclusions: Array<AllocationRuleExclusion>;
  directAllocations: Array<DirectAllocationRules>;
  absoluteAllocations: Array<AbsoluteAllocationRules>;
  percentageAllocations: Array<PercentageAllocationRules>;
  totalAllocated: number;
  totalExpenseIncomeDataAmount: number;
}

export type ServiceRulesProps = keyof ServiceRules;

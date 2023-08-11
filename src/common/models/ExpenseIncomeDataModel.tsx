import { ChangeModel } from "./ChangeModel";
import { CostCenter } from "./CostCenterModel";
import { CostElement } from "./CostElementModel";
import { FinancialPeriod } from "./FinancialPeriodModel";
import { ServiceRules } from "./ServiceRulesModel";
import { WbsCode } from "./WbsCodeModel";
import { ExpenseIncomeDataType, getDisplayedNameForExpenseIncomeDataType } from "./common/ExpenseTypeModel";
import { RelevanceType } from "./common/RelevanceTypeModel";

export const expenseIncomeDataTypeDropdownItems = (Object.keys(ExpenseIncomeDataType) as ExpenseIncomeDataType[]).map((enumValue) => {
  return { id: enumValue, label: getDisplayedNameForExpenseIncomeDataType(enumValue) };
});

export interface ExpenseIncomeData extends ChangeModel {
  id: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
  costCenterId: string;
  costCenter?: CostCenter;
  wbsCodeId?: string | null;
  wbsCode?: WbsCode;
  costElementId: string;
  costElement?: CostElement;
  bookingText?: string | null;
  tradingPartner?: string | null;
  amount: number;
  type: ExpenseIncomeDataType;
  relevance: RelevanceType;
  passThrough: boolean;
  rules?: ServiceRules;
}

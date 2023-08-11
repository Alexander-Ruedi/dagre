import { ExpenseIncomeDataType } from "../../../models/common/ExpenseTypeModel";
import { RelevanceType } from "../../../models/common/RelevanceTypeModel";

export enum AttributeChange {
  IRRELEVANT = "IRRELEVANT",
  RELEVANT = "RELEVANT",
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
  PASSTHROUGH = "PASSTHROUGH",
  VALUEADDED = "VALUEADDED",
}

export interface ChangeAttributeRequestModel {
  financialPeriodId: string;
  expenseIncomeDataIds: Array<string>;
  costElementIds: Array<string>;
  costCenterIds: Array<string>;
  wbsCodeIds: Array<string>;
  passThrough?: boolean;
  type?: ExpenseIncomeDataType;
  relevance?: RelevanceType;
}

import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { FinancialPeriod } from "./FinancialPeriodModel";
import { ExpenseIncomeDataType } from "./common/ExpenseTypeModel";
import { PassThroughState } from "./common/PassThroughTypeModel";
import { RelevanceType } from "./common/RelevanceTypeModel";

export interface CostElement extends ChangeModel {
  id: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
  companyId: string;
  company?: Company;
  account: string;
  name: string;
  comment?: string | null;
  relevance?: Array<RelevanceType>;
  passThroughState?: Array<PassThroughState>;
  type?: Array<ExpenseIncomeDataType>;
}

export interface CostElementWithCostCenter {
  costCenterId: string;
  costElementNames: Array<CostElementNameAndAccount>;
}

export interface CostElementNameAndAccount {
  id: string;
  name: string;
  account: string;
}

export type CostElementProps = keyof CostElement;

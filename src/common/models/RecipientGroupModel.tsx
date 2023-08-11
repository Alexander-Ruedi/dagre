import { ChangeModel } from "./ChangeModel";
import { FinancialPeriod } from "./FinancialPeriodModel";

export interface RecipientGroup extends ChangeModel {
  id: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
  name: string;
  companyIds: string[];
  comment?: string | null;
  numberOfCompanies?: number | null;
}

export type RecipientGroupProps = keyof RecipientGroup;

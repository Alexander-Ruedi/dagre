import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { FinancialPeriod } from "./FinancialPeriodModel";

export interface WbsCode extends ChangeModel {
  id: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
  companyId: string;
  company?: Company;
  code: string;
  name: string;
  comment?: string | null;
}
export type WbsCodeProps = keyof WbsCode;

import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { FinancialPeriod } from "./FinancialPeriodModel";

export interface BatchEditContract {
  providerCompanyId?: string;
  effectiveFrom?: string;
  effectiveTo?: string | null;
  internalContractId?: string | null;
  type?: string | null;
  link?: string | null;
  comment?: string | null;
}

export interface Contract extends ChangeModel {
  id: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
  providerCompany?: Company;
  providerCompanyId: string;
  name: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
  internalContractId?: string | null;
  type?: string | null;
  link?: string | null;
  comment?: string | null;
}
export type ContractProps = keyof Contract;

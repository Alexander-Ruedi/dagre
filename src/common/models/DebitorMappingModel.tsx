import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";

export interface BatchEditDebitorMapping {
  debitorCode: string;
}
export interface DebitorMapping extends ChangeModel {
  id: string;
  billingPeriodId: string;
  providerCompanyId: string;
  providerCompany?: Company;
  recipientCompanyId: string;
  recipientCompany?: Company;
  debitorCode: string;
  debitorName?: string | null;
}
export type DebitorMappingProps = keyof DebitorMapping;

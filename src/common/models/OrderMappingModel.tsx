import { BillingPeriod } from "./BillingPeriodModel";
import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { DebitorMapping } from "./DebitorMappingModel";
import { FinancialPeriod } from "./FinancialPeriodModel";

export interface BatchEditOrderMapping {
  salesOrder: string;
}
export interface OrderMapping extends ChangeModel {
  id: string;
  billingPeriodId: string;
  billingPeriod?: BillingPeriod;
  financialPeriod?: FinancialPeriod;
  debitorMappingId: string;
  debitorCodeAndName?: string;
  debitorMapping?: DebitorMapping;
  recipientCompany?: Company;
  providerCompany?: Company;
  salesOrder: string;
}
export type OrderMappingProps = keyof OrderMapping;

import { ChangeModel } from "./ChangeModel";
import { FinancialPeriod } from "./FinancialPeriodModel";

export interface BillingPeriod extends ChangeModel {
  id: string;
  name: string;
  fromDate: string;
  toDate: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
}

export type BillingPeriodProps = keyof BillingPeriod;

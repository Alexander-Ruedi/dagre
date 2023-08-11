import { ChangeModel } from "./ChangeModel";
import { FinancialPeriod } from "./FinancialPeriodModel";

export interface ExclusionReason extends ChangeModel {
  id: string;
  name: string;
  comment?: string | null;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
}

export type ExclusionReasonProps = keyof ExclusionReason;

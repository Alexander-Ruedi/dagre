import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { FinancialPeriod } from "./FinancialPeriodModel";
import { PassThroughState } from "./common/PassThroughTypeModel";
import { RelevanceType } from "./common/RelevanceTypeModel";

export interface CostCenter extends ChangeModel {
  id: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
  companyId: string;
  company?: Company;
  code: string;
  name: string;
  description?: string | null;
  type1?: string | null;
  type2?: string | null;
  relevance?: Array<RelevanceType>;
  passThroughState?: Array<PassThroughState>;
  responsiblePerson?: string | null;
  comment?: string | null;
}

export type CostCenterProps = keyof CostCenter;

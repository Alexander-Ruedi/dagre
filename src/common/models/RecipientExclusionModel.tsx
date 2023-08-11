import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { FinancialPeriod } from "./FinancialPeriodModel";
import { Service } from "./ServiceModel";
import { ServiceAmountTypes } from "./common/ServiceAmountTypesModel";

export interface RecipientExclusion extends ChangeModel {
  id: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
  companyId: string;
  company?: Company;
  recipientCapAmount: number;
  recipientCapAmountType: ServiceAmountTypes;
  serviceId?: string | null;
  service?: Service;
  reallocateToCompanyId?: string | null;
  reallocateToCompany?: Company;
  comment?: string | null;
}

export type RecipientExclusionProps = keyof RecipientExclusion;

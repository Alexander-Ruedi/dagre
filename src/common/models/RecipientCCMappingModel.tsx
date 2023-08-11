import { BillingPeriod } from "./BillingPeriodModel";
import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { Service } from "./ServiceModel";

export interface BatchEditRecipientCCMapping {
  recipientCostCenterCode: string;
  recipientCostCenterName: string;
}
export interface RecipientCCMapping extends ChangeModel {
  id: string;
  billingPeriodId: string;
  billingPeriod?: BillingPeriod;
  serviceId: string;
  service?: Service;
  recipientCompanyId: string;
  recipientCompany?: Company;
  recipientCostCenterCode: string;
  recipientCostCenterName?: string | null;
}
export type RecipientCCMappingProps = keyof RecipientCCMapping;

import { BillingPeriod } from "./BillingPeriodModel";
import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { FinancialPeriod } from "./FinancialPeriodModel";

export interface BatchEditMaterialMapping extends ChangeModel {
  id: string;
  billingPeriodId: string;
  directMaterialNumber?: string | null;
  directMaterialName?: string | null;
  indirectMaterialNumber?: string | null;
  indirectMaterialName?: string | null;
}

export interface MaterialMappingFormModel extends MaterialMapping {
  providerCompanyIds: Array<string>;
}
export interface MaterialMapping extends ChangeModel {
  id: string;
  billingPeriodId: string;
  billingPeriod?: BillingPeriod;
  financialPeriod?: FinancialPeriod;
  providerCompanyId: string;
  providerCompany?: Company;
  directMaterialNumber: string;
  directMaterialName?: string | null;
  indirectMaterialNumber: string;
  indirectMaterialName?: string | null;
}
export type MaterialMappingProps = keyof MaterialMapping;

export interface CreateMaterialMappingRequest {
  directMaterialNumber?: string;
  directMaterialName?: string | null;
  indirectMaterialNumber?: string;
  indirectMaterialName?: string | null;
  billingPeriodId: string;
  providerCompanyId: string;
}

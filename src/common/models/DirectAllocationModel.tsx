import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { CostCenter } from "./CostCenterModel";
import { CostElementNameAndAccount } from "./CostElementModel";
import { FinancialPeriod } from "./FinancialPeriodModel";
import { Service } from "./ServiceModel";

export interface DirectAllocation extends ChangeModel {
  id: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
  providerCostCenterId: string;
  providerCostCenter?: CostCenter;
  providerCostElementId?: string | null;
  providerCostElement?: CostElementNameAndAccount;
  recipientCompanyId: string;
  recipientCompany?: Company;
  serviceId: string;
  service?: Service;
  label?: string | null;
  allocationAmount: DirectAllocationAmountType;
  comment?: string | null;
}

export interface DirectAllocationAbsoluteAmount {
  amount: number;
}
export interface DirectAllocationPercentageAmount {
  percentage: number;
}
export interface DirectAllocationQuantityPriceAmount {
  price: number;
  quantity: number;
  quantityInfo?: string | null;
  amount?: number;
}

export type DirectAllocationAmountType = DirectAllocationAbsoluteAmount | DirectAllocationPercentageAmount | DirectAllocationQuantityPriceAmount;

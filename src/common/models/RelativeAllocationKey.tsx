import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { MasterAllocationKey } from "./MasterKeyModel";

export interface CreateRelativeKeyModel {
  name: string;
  masterAllocationKeyId: string;
  financialPeriodId: string;
}

export interface RelativeAllocationDetails {
  financialPeriodId: string;
  relativeAllocationKeyId: string;
  companyId: string;
  company?: Company;
  masterAllocationKeyId: string;
  percentage: {
    value: number;
  };
  comment: string;
  calculatedAmount: number;
}

export interface AllocationKeys extends ChangeModel {
  id: string;
  financialPeriodId: string;
  masterAllocationKeyId?: string;
  masterAllocationKey?: MasterAllocationKey;
  name: string;
}
export interface RelativeAllocationKey extends ChangeModel {
  id: string;
  financialPeriodId: string;
  masterAllocationKeyId: string;
  name: string;
}

export interface UpdateRelativeKeyDetailsRequestModel {
  companyId: string;
  comment?: string | null;
  percentage: number;
}

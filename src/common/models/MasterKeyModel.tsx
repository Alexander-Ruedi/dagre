import { ChangeModel } from "./ChangeModel";

export interface MasterAllocationKey extends ChangeModel {
  id: string;
  financialPeriodId: string;
  name: string;
  masterAllocationKeyId: undefined;
}

export interface MasterAllocationDetails {
  financialPeriodId: string;
  companyId: string;
  company?: string;
  masterAllocationKeyId: string;
  amount: number;
  comment: string;
  adjustment: number;
}

export interface UpdateMasterKeyDetailsRequestModel {
  adjustment: number;
  comment: string;
  companyId: string;
}

export interface MasterAllocationImportKey {
  id: string;
  financialPeriodId: string;
  name: string;
  companyId: string;
  companyCode: string;
  amount: number;
}

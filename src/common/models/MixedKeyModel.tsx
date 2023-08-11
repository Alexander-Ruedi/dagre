import { ChangeModel } from "./ChangeModel";
import { MasterAllocationKey } from "./MasterKeyModel";
import { AllocationKeys } from "./RelativeAllocationKey";

export interface MixedAllocationKey extends ChangeModel {
  id: string;
  financialPeriodId: string;
  name: string;
  comment?: string | null;
}

export interface MixedAllocationWeight {
  allocationKeyId: string;
  allocationKey?: AllocationKeys;
  allocationKeyType?: string;
  weight: number;
  createdOn: string;
  updatedOn: string;
  createdBy: string;
  updatedBy: string;
}
export interface MixedAllocationKeyWithWeight extends MixedAllocationKey {
  weightValues: Array<MixedAllocationWeight>;
}

export interface MixedAllocationKeyWeight extends ChangeModel {
  allocationKeyId: string | undefined;
  allocationKeyType?: string | undefined;
  weight: number;
}

export interface MixedAllocationKeyDetails {
  id: string;
  financialPeriodId: string;
  name: string;
  comment: string;
  weightValues: Array<MixedAllocationKeyWeight>;
}

export interface CreateMixedAllocationRequestBody {
  financialPeriodId: string;
  name: string;
  comment?: string | null;
  mixedAllocationKeyWeightValues: Array<MixedAllocationKeyWeight>;
}

export interface MixedAllocation extends CreateMixedAllocationRequestBody {
  id: string;
}

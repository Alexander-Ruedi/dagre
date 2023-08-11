import { Merge } from "./Merge";

export interface ProposeResponse<T> {
  periodId: string;
  mergeProposal: Merge<T>[];
}

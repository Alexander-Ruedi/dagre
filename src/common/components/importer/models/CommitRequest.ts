import { Merge } from "./Merge";

export interface CommitRequest<T> {
  periodId: string;
  mergeData: Merge<T>[];
}

import { ChangeModel } from "./ChangeModel";

export interface Bucket extends ChangeModel {
  id: string;
  name: string;
  fiscalYear: number;
}

export type BucketProps = keyof Bucket;

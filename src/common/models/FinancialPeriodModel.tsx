import { Bucket } from "./BucketModel";
import { ChangeModel } from "./ChangeModel";

export enum FinancialPeriodType {
  PLAN = "PLAN",
  FORECAST = "FORECAST",
  ACTUAL = "ACTUAL",
}

export const getDisplayedNameForFinancialPeriodType = (financialPeriodType?: FinancialPeriodType) => {
  switch (financialPeriodType) {
    case FinancialPeriodType.PLAN:
      return "Plan";
    case FinancialPeriodType.FORECAST:
      return "Forecast";
    case FinancialPeriodType.ACTUAL:
      return "Actual";
    case undefined:
      return "";
    default: {
      const _exhaustiveCheck: never = financialPeriodType;
      return _exhaustiveCheck;
    }
  }
};

export const financialPeriodTypeDropdownItems = (Object.keys(FinancialPeriodType) as FinancialPeriodType[]).map((key) => {
  return { id: key, label: getDisplayedNameForFinancialPeriodType(key) };
});

export interface FinancialPeriod extends ChangeModel {
  id: string;
  name: string;
  order: number;
  type: FinancialPeriodType;
  fromDate: string;
  toDate: string;
  bucketId: string;
  bucket?: Bucket;
}

export type FinancialPeriodProps = keyof FinancialPeriod;

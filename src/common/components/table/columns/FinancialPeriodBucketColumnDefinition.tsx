import { MyColDef } from "../../../models/TableModel";

export type FinancialPeriodBucketColumns = "financialPeriod.bucket.name" | "financialPeriod.bucket.fiscalYear";
export const financialPeriodBucketColumnDefinition: MyColDef<any, FinancialPeriodBucketColumns>[] = [
  { field: "financialPeriod.bucket.name", headerName: "Bucket name", cellClass: "unformattedString", hide: true },
  {
    field: "financialPeriod.bucket.fiscalYear",
    headerName: "Bucket fiscal year",
    cellClass: ["ag-right-aligned-cell", "alignRight", "intNumber"],
    hide: true,
  },
];

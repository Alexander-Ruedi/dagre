import { MyColDef } from "../../../models/TableModel";

export type BillingPeriodColumns = "billingPeriod.name" | "billingPeriod.fromDate" | "billingPeriod.toDate";
export const billingPeriodColumnDefinition: MyColDef<any, BillingPeriodColumns>[] = [
  {
    field: "billingPeriod.name",
    headerName: "Billing period",
    hide: true,
    cellClass: "unformattedString",
  },
  {
    hide: true,
    field: "billingPeriod.fromDate",
    headerName: "Billing period start",
    cellClass: ["ag-right-aligned-cell", "alignRight", "unformattedString"],
  },
  {
    hide: true,
    field: "billingPeriod.toDate",
    headerName: "Billing period end",
    cellClass: ["ag-right-aligned-cell", "alignRight", "unformattedString"],
  },
];

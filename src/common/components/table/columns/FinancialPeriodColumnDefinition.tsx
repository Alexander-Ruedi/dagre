import { getDisplayedNameForFinancialPeriodType } from "../../../models/FinancialPeriodModel";
import { MyColDef } from "../../../models/TableModel";

export type FinancialPeriodColumns = "financialPeriod.name" | "financialPeriod.fromDate" | "financialPeriod.toDate" | "financialPeriod.type";
export const financialPeriodColumnDefinition: MyColDef<any, FinancialPeriodColumns>[] = [
  {
    field: "financialPeriod.name",
    headerName: "Financial period",
    cellClass: "unformattedString",
  },
  {
    hide: true,
    field: "financialPeriod.fromDate",
    headerName: "Financial period start",
    type: "myRightAligned",
    cellClass: ["ag-right-aligned-cell", "alignRight", "unformattedString"],
  },
  {
    hide: true,
    field: "financialPeriod.toDate",
    headerName: "Financial period end",
    type: "myRightAligned",
    cellClass: ["ag-right-aligned-cell", "alignRight", "unformattedString"],
  },
  {
    hide: true,
    field: "financialPeriod.type",
    headerName: "Financial period type",
    cellClass: "unformattedString",
    valueGetter: (params) =>
      params.data?.financialPeriod?.type
        ? getDisplayedNameForFinancialPeriodType(params.data?.financialPeriod?.type) + " " + params.data?.financialPeriod?.order
        : "[error]",
  },
];

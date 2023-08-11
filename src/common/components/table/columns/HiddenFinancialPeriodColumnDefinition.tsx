import { getDisplayedNameForFinancialPeriodType } from "../../../models/FinancialPeriodModel";
import { MyColDef } from "../../../models/TableModel";
import { FinancialPeriodColumns } from "./FinancialPeriodColumnDefinition";

export const hiddenFinancialPeriodColumnDefinition: MyColDef<any, FinancialPeriodColumns>[] = [
  {
    field: "financialPeriod.name",
    headerName: "Financial period",
    hide: true,
    cellClass: "unformattedString",
  },
  {
    hide: true,
    field: "financialPeriod.fromDate",
    headerName: "Financial period start",
    cellClass: ["ag-right-aligned-cell", "alignRight", "unformattedString"],
  },
  {
    hide: true,
    field: "financialPeriod.toDate",
    headerName: "Financial period end",
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

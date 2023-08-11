import { MyColDef } from "../../../models/TableModel";
import { getDisplayedNameForMultipleExpenseIncomeDataTypes } from "../../../models/common/ExpenseTypeModel";
import { getDisplayedNameForMultiplePassThroughStates } from "../../../models/common/PassThroughTypeModel";
import { getDisplayedNameForMultipleRelevanceTypes } from "../../../models/common/RelevanceTypeModel";

export type CostElementColumns =
  | "costElement.account"
  | "costElement.description"
  | "costElement.relevance"
  | "costElement.passThroughState"
  | "costElement.type";
export const costElementColumnDefinition: MyColDef<any, CostElementColumns>[] = [
  {
    field: "costElement.account",
    headerName: "Cost element",
    valueGetter: (params) => (params.data?.costElement?.account ?? "") + "-" + (params.data?.costElement?.name ?? ""),
    hide: true,
    cellClass: "unformattedString",
  },
  { field: "costElement.description", headerName: "Cost element description", hide: true, cellClass: "unformattedString" },
  {
    field: "costElement.relevance",
    headerName: "Cost element relevance",
    valueGetter: (params) =>
      params.data?.costElement?.relevance ? getDisplayedNameForMultipleRelevanceTypes(params.data?.costElement?.relevance) : "",
    hide: true,
    cellClass: "unformattedString",
  },
  {
    field: "costElement.passThroughState",
    headerName: "Cost element pass-through / value-added",
    valueGetter: (params) =>
      params.data?.costElement?.passThroughState ? getDisplayedNameForMultiplePassThroughStates(params.data?.costElement?.passThroughState) : "",
    hide: true,
    cellClass: "unformattedString",
  },
  {
    field: "costElement.type",
    headerName: "Cost element expense / income",
    valueGetter: (params) =>
      params.data?.costElement?.type ? getDisplayedNameForMultipleExpenseIncomeDataTypes(params.data?.costElement?.type) : "",
    hide: true,
    cellClass: "unformattedString",
  },
];

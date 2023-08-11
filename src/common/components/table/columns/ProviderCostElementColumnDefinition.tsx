import { MyColDef } from "../../../models/TableModel";
import { getDisplayedNameForMultipleExpenseIncomeDataTypes } from "../../../models/common/ExpenseTypeModel";
import { getDisplayedNameForMultiplePassThroughStates } from "../../../models/common/PassThroughTypeModel";
import { getDisplayedNameForMultipleRelevanceTypes } from "../../../models/common/RelevanceTypeModel";

export type ProviderCostElementColumns =
  | "providerCostElement.account"
  | "providerCostElement.description"
  | "providerCostElement.relevance"
  | "providerCostElement.passThroughState"
  | "providerCostElement.type";
export const providerCostElementColumnDefinition: MyColDef<any, ProviderCostElementColumns>[] = [
  {
    field: "providerCostElement.account",
    headerName: "Cost element",
    valueGetter: (params) => (params.data?.providerCostElement?.account ?? "") + "-" + (params.data?.providerCostElement?.name ?? ""),
    cellClass: "unformattedString",
  },
  { field: "providerCostElement.description", headerName: "Cost element description", hide: true, cellClass: "unformattedString" },
  {
    field: "providerCostElement.relevance",
    headerName: "Cost element relevance",
    valueGetter: (params) =>
      params.data?.providerCostElement?.relevance ? getDisplayedNameForMultipleRelevanceTypes(params.data?.providerCostElement?.relevance) : "",
    hide: true,
    cellClass: "unformattedString",
  },
  {
    field: "providerCostElement.passThroughState",
    headerName: "Cost element pass-through / value-added",
    valueGetter: (params) =>
      params.data?.providerCostElement?.passThroughState
        ? getDisplayedNameForMultiplePassThroughStates(params.data?.providerCostElement?.passThroughState)
        : "",
    hide: true,
    cellClass: "unformattedString",
  },
  {
    field: "providerCostElement.type",
    headerName: "Cost element expense / income",
    valueGetter: (params) =>
      params.data?.providerCostElement?.type ? getDisplayedNameForMultipleExpenseIncomeDataTypes(params.data?.providerCostElement?.type) : "",
    hide: true,
    cellClass: "unformattedString",
  },
];

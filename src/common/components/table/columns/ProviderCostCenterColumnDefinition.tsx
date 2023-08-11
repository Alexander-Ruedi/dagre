import { MyColDef } from "../../../models/TableModel";
import { getDisplayedNameForMultiplePassThroughStates } from "../../../models/common/PassThroughTypeModel";
import { getDisplayedNameForMultipleRelevanceTypes } from "../../../models/common/RelevanceTypeModel";

export type ProviderCostCenterColumns =
  | "providerCostCenter.description"
  | "providerCostCenter.type1"
  | "providerCostCenter.type2"
  | "providerCostCenter.responsiblePerson"
  | "providerCostCenter.relevance"
  | "providerCostCenter.passThroughState";
export const providerCostCenterColumnDefinition: MyColDef<any, ProviderCostCenterColumns>[] = [
  { field: "providerCostCenter.description", headerName: "Cost center description", hide: true, cellClass: "unformattedString" },
  { field: "providerCostCenter.type1", headerName: "Cost center type1", hide: true, cellClass: "unformattedString" },
  { field: "providerCostCenter.type2", headerName: "Cost center type2", hide: true, cellClass: "unformattedString" },
  {
    field: "providerCostCenter.responsiblePerson",
    headerName: "Cost center responsible person",
    hide: true,
    cellClass: "unformattedString",
  },
  {
    field: "providerCostCenter.relevance",
    headerName: "Cost center relevance",
    valueGetter: (params) =>
      params.data?.providerCostCenter?.relevance ? getDisplayedNameForMultipleRelevanceTypes(params.data?.providerCostCenter?.relevance) : "",
    hide: true,
    cellClass: "unformattedString",
  },
  {
    field: "providerCostCenter.passThroughState",
    headerName: "Cost center pass-through / value-added",
    valueGetter: (params) =>
      params.data?.providerCostCenter?.passThroughState
        ? getDisplayedNameForMultiplePassThroughStates(params.data?.providerCostCenter?.passThroughState)
        : "",
    hide: true,
    cellClass: "unformattedString",
  },
];

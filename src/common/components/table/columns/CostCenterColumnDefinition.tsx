import { MyColDef } from "../../../models/TableModel";
import { getDisplayedNameForMultiplePassThroughStates } from "../../../models/common/PassThroughTypeModel";
import { getDisplayedNameForMultipleRelevanceTypes } from "../../../models/common/RelevanceTypeModel";

export type CostCenterColumns =
  | "costCenter.description"
  | "costCenter.type1"
  | "costCenter.type2"
  | "costCenter.responsiblePerson"
  | "costCenter.relevance"
  | "costCenter.passThroughState";
export const costCenterColumnDefinition: MyColDef<any, CostCenterColumns>[] = [
  { field: "costCenter.description", headerName: "Cost center description", hide: true, cellClass: "unformattedString" },
  { field: "costCenter.type1", headerName: "Cost center type1", hide: true, cellClass: "unformattedString" },
  { field: "costCenter.type2", headerName: "Cost center type2", hide: true, cellClass: "unformattedString" },
  {
    field: "costCenter.responsiblePerson",
    headerName: "Cost center responsible person",
    hide: true,
    cellClass: "unformattedString",
  },
  {
    field: "costCenter.relevance",
    headerName: "Cost center relevance",
    valueGetter: (params) =>
      params.data?.costCenter?.relevance ? getDisplayedNameForMultipleRelevanceTypes(params.data?.costCenter?.relevance) : "",
    hide: true,
    cellClass: "unformattedString",
  },
  {
    field: "costCenter.passThroughState",
    headerName: "Cost center pass-through / value-added",
    valueGetter: (params) =>
      params.data?.costCenter?.passThroughState ? getDisplayedNameForMultiplePassThroughStates(params.data?.costCenter?.passThroughState) : "",
    hide: true,
    cellClass: "unformattedString",
  },
];

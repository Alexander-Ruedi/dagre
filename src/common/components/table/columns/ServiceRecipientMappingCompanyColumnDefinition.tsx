import { MyColDef } from "../../../models/TableModel";
import { getDisplayedNameForRelevanceType } from "../../../models/common/RelevanceTypeModel";

export type ServiceCompanyColumns =
  | "service.company.code"
  | "service.company.shortName"
  | "service.company.longName"
  | "service.company.segment"
  | "service.company.businessUnit"
  | "service.company.companyRegion"
  | "service.company.city"
  | "service.company.relevance";

export const serviceCompanyColumnDefinition: MyColDef<any, ServiceCompanyColumns>[] = [
  { field: "service.company.code", headerName: "Provider code", hide: true, cellClass: "unformattedString" },
  { field: "service.company.shortName", headerName: "Provider short name", hide: true, cellClass: "unformattedString" },
  { field: "service.company.longName", headerName: "Provider long name", hide: true, cellClass: "unformattedString" },
  { field: "service.company.segment", headerName: "Provider segment", hide: true, cellClass: "unformattedString" },
  { field: "service.company.businessUnit", headerName: "Provider business unit", hide: true, cellClass: "unformattedString" },
  { field: "service.company.companyRegion", headerName: "Provider region", hide: true, cellClass: "unformattedString" },
  { field: "service.company.city", headerName: "Provider city", hide: true, cellClass: "unformattedString" },
  {
    field: "service.company.relevance",
    headerName: "Provider relevance",
    valueGetter: (params) =>
      params.data?.service.company.relevance ? getDisplayedNameForRelevanceType(params.data.service.company.relevance) : "[error]",
    hide: true,
    cellClass: "unformattedString",
  },
];

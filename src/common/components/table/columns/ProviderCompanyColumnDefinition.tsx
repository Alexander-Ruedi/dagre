import { MyColDef } from "../../../models/TableModel";
import { getDisplayedNameForRelevanceType } from "../../../models/common/RelevanceTypeModel";

export type ProviderCompanyColumns =
  | "providerCompany.code"
  | "providerCompany.shortName"
  | "providerCompany.longName"
  | "providerCompany.segment"
  | "providerCompany.businessUnit"
  | "providerCompany.companyRegion"
  | "providerCompany.city"
  | "providerCompany.relevance";

export const providerCompanyColumnDefinition: MyColDef<any, ProviderCompanyColumns>[] = [
  {
    field: "providerCompany.code",
    headerName: "Provider code",
    sort: "asc",
    hide: true,
    cellClass: "unformattedString",
  },
  { field: "providerCompany.shortName", headerName: "Provider short name", hide: true, cellClass: "unformattedString" },
  { field: "providerCompany.longName", headerName: "Provider long name", hide: true, cellClass: "unformattedString" },

  { field: "providerCompany.segment", headerName: "Provider segment", hide: true, cellClass: "unformattedString" },
  { field: "providerCompany.businessUnit", headerName: "Provider business unit", hide: true, cellClass: "unformattedString" },
  { field: "providerCompany.companyRegion", headerName: "Provider region", hide: true, cellClass: "unformattedString" },
  { field: "providerCompany.city", headerName: "Provider city", hide: true, cellClass: "unformattedString" },
  {
    field: "providerCompany.relevance",
    headerName: "Provider relevance",
    valueGetter: (params) =>
      params.data?.providerCompany.relevance ? getDisplayedNameForRelevanceType(params.data.providerCompany.relevance) : "[error]",
    hide: true,
    cellClass: "unformattedString",
  },
];

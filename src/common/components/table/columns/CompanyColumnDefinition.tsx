import { MyColDef } from "../../../models/TableModel";
import { getDisplayedNameForRelevanceType } from "../../../models/common/RelevanceTypeModel";

export type CompanyColumns =
  | "company.code"
  | "company.shortName"
  | "company.longName"
  | "company.segment"
  | "company.businessUnit"
  | "company.companyRegion"
  | "company.city"
  | "company.relevance";
export type ReallocateToCompanyColumns =
  | "reallocateToCompany.code"
  | "reallocateToCompany.shortName"
  | "reallocateToCompany.longName"
  | "reallocateToCompany.segment"
  | "reallocateToCompany.businessUnit"
  | "reallocateToCompany.companyRegion"
  | "reallocateToCompany.city"
  | "reallocateToCompany.relevance";

export const companyColumnDefinition: MyColDef<any, CompanyColumns>[] = [
  {
    field: "company.code",
    headerName: "Company code",
    sort: "asc",
    hide: true,
    cellClass: "unformattedString",
  },
  { field: "company.shortName", headerName: "Company short name", hide: true, cellClass: "unformattedString" },
  { field: "company.longName", headerName: "Company long name", hide: true, cellClass: "unformattedString" },

  { field: "company.segment", headerName: "Company segment", hide: true, cellClass: "unformattedString" },
  { field: "company.businessUnit", headerName: "Company business unit", hide: true, cellClass: "unformattedString" },
  { field: "company.companyRegion", headerName: "Company region", hide: true, cellClass: "unformattedString" },
  { field: "company.city", headerName: "Company city", hide: true, cellClass: "unformattedString" },
  {
    field: "company.relevance",
    headerName: "Company relevance",
    valueGetter: (params) => (params.data?.company.relevance ? getDisplayedNameForRelevanceType(params.data.company.relevance) : "[error]"),
    hide: true,
    cellClass: "unformattedString",
  },
];

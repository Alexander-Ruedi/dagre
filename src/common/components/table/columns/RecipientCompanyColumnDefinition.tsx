import { MyColDef } from "../../../models/TableModel";
import { getDisplayedNameForRelevanceType } from "../../../models/common/RelevanceTypeModel";

export type RecipientCompanyColumns =
  | "recipientCompany.code"
  | "recipientCompany.shortName"
  | "recipientCompany.longName"
  | "recipientCompany.segment"
  | "recipientCompany.businessUnit"
  | "recipientCompany.companyRegion"
  | "recipientCompany.city"
  | "recipientCompany.relevance";

export const recipientCompanyColumnDefinition: MyColDef<any, RecipientCompanyColumns>[] = [
  {
    field: "recipientCompany.code",
    headerName: "Recipient code",
    sort: "asc",
    hide: true,
    cellClass: "unformattedString",
  },
  { field: "recipientCompany.shortName", headerName: "Recipient short name", hide: true, cellClass: "unformattedString" },
  { field: "recipientCompany.longName", headerName: "Recipient long name", hide: true, cellClass: "unformattedString" },

  { field: "recipientCompany.segment", headerName: "Recipient segment", hide: true, cellClass: "unformattedString" },
  { field: "recipientCompany.businessUnit", headerName: "Recipient business unit", hide: true, cellClass: "unformattedString" },
  { field: "recipientCompany.companyRegion", headerName: "Recipient region", hide: true, cellClass: "unformattedString" },
  { field: "recipientCompany.city", headerName: "Recipient city", hide: true, cellClass: "unformattedString" },
  {
    field: "recipientCompany.relevance",
    headerName: "Recipient relevance",
    valueGetter: (params) =>
      params.data?.recipientCompany.relevance ? getDisplayedNameForRelevanceType(params.data.recipientCompany.relevance) : "[error]",
    hide: true,
    cellClass: "unformattedString",
  },
];

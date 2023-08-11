import { MyColDef } from "../../../models/TableModel";

export type RecipientCompanyCountryColumns = "recipientCompany.country.name" | "recipientCompany.country.iso2" | "recipientCompany.country.iso3";
export const recipientCompanyCountryColumnDefinition: MyColDef<any, RecipientCompanyCountryColumns>[] = [
  { field: "recipientCompany.country.name", headerName: "Recipient country name", hide: true, cellClass: "unformattedString" },
  { field: "recipientCompany.country.iso2", headerName: "Recipient country ISO2", hide: true, cellClass: "unformattedString" },
  { field: "recipientCompany.country.iso3", headerName: "Recipient country ISO3", hide: true, cellClass: "unformattedString" },
];

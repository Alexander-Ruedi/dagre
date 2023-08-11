import { MyColDef } from "../../../models/TableModel";

export type RecipientCountryColumns = "recipientCompany.country.name" | "recipientCompany.country.iso2" | "recipientCompany.country.iso3";
export const recipientCountryColumnDefinition: MyColDef<any, RecipientCountryColumns>[] = [
  { field: "recipientCompany.country.name", headerName: "Recipient country name", hide: true, cellClass: "unformattedString" },
  { field: "recipientCompany.country.iso2", headerName: "Recipient country ISO2", hide: true, cellClass: "unformattedString" },
  { field: "recipientCompany.country.iso3", headerName: "Recipient country ISO3", hide: true, cellClass: "unformattedString" },
];

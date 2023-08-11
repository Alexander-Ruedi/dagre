import { MyColDef } from "../../../models/TableModel";

export type CompanyCountryColumns = "company.country.name" | "company.country.iso2" | "company.country.iso3";
export const companyCountryColumnDefinition: MyColDef<any, CompanyCountryColumns>[] = [
  { field: "company.country.name", headerName: "Country name", hide: true, cellClass: "unformattedString" },
  { field: "company.country.iso2", headerName: "Country ISO2", hide: true, cellClass: "unformattedString" },
  { field: "company.country.iso3", headerName: "Country ISO3", hide: true, cellClass: "unformattedString" },
];

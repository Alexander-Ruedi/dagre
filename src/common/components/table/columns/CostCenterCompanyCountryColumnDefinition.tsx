import { MyColDef } from "../../../models/TableModel";

export type CostCenterCompanyCountryColumns =
  | "costCenter.company.country.name"
  | "costCenter.company.country.iso2"
  | "costCenter.company.country.iso3";
export const costCenterCompanyCountryColumnDefinition: MyColDef<any, CostCenterCompanyCountryColumns>[] = [
  { field: "costCenter.company.country.name", headerName: "Country name", hide: true, cellClass: "unformattedString" },
  { field: "costCenter.company.country.iso2", headerName: "Country ISO2", hide: true, cellClass: "unformattedString" },
  { field: "costCenter.company.country.iso3", headerName: "Country ISO3", hide: true, cellClass: "unformattedString" },
];

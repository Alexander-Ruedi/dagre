import { MyColDef } from "../../../models/TableModel";

export type ServiceCompanyCountryColumns = "service.company.country.name" | "service.company.country.iso2" | "service.company.country.iso3";
export const serviceCompanyCountryColumnDefinition: MyColDef<any, ServiceCompanyCountryColumns>[] = [
  { field: "service.company.country.name", headerName: "Country name", hide: true, cellClass: "unformattedString" },
  { field: "service.company.country.iso2", headerName: "Country ISO2", hide: true, cellClass: "unformattedString" },
  { field: "service.company.country.iso3", headerName: "Country ISO3", hide: true, cellClass: "unformattedString" },
];

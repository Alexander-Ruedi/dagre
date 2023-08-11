import { MyColDef } from "../../../models/TableModel";

export type ProviderCompanyCountryColumns = "service.company.country.name" | "service.company.country.iso2" | "service.company.country.iso3";
export const providerCompanyCountryColumnDefinition: MyColDef<any, ProviderCompanyCountryColumns>[] = [
  { field: "service.company.country.name", headerName: "Provider country name", hide: true, cellClass: "unformattedString" },
  { field: "service.company.country.iso2", headerName: "Provider country ISO2", hide: true, cellClass: "unformattedString" },
  { field: "service.company.country.iso3", headerName: "Provider country ISO3", hide: true, cellClass: "unformattedString" },
];

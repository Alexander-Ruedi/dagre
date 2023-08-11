import { MyColDef } from "../../../models/TableModel";

export type ProviderCompanyCountryColumns = "providerCompany.country.name" | "providerCompany.country.iso2" | "providerCompany.country.iso3";
export const providerCompanyServiceCountryColumnDefinition: MyColDef<any, ProviderCompanyCountryColumns>[] = [
  { field: "providerCompany.country.name", headerName: "Provider country name", hide: true, cellClass: "unformattedString" },
  { field: "providerCompany.country.iso2", headerName: "Provider country ISO2", hide: true, cellClass: "unformattedString" },
  { field: "providerCompany.country.iso3", headerName: "Provider country ISO3", hide: true, cellClass: "unformattedString" },
];

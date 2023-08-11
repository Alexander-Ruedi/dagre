import { MyColDef } from "../../../models/TableModel";
import { getDisplayedNameForRelevanceType } from "../../../models/common/RelevanceTypeModel";

export type ContractProviderCompanyColumns =
  | "contract.providerCompany.code"
  | "contract.providerCompany.shortName"
  | "contract.providerCompany.longName"
  | "contract.providerCompany.segment"
  | "contract.providerCompany.businessUnit"
  | "contract.providerCompany.companyRegion"
  | "contract.providerCompany.city"
  | "contract.providerCompany.relevance";

export const contractProviderCompanyColumnDefinition: MyColDef<any, ContractProviderCompanyColumns>[] = [
  {
    field: "contract.providerCompany.code",
    headerName: "Contract provider code",
    sort: "asc",
    hide: true,
    cellClass: "unformattedString",
  },
  { field: "contract.providerCompany.shortName", headerName: "Contract provider short name", hide: true, cellClass: "unformattedString" },
  { field: "contract.providerCompany.longName", headerName: "Contract provider long name", hide: true, cellClass: "unformattedString" },

  { field: "contract.providerCompany.segment", headerName: "Contract provider segment", hide: true, cellClass: "unformattedString" },
  { field: "contract.providerCompany.businessUnit", headerName: "Contract provider business unit", hide: true, cellClass: "unformattedString" },
  { field: "contract.providerCompany.companyRegion", headerName: "Contract provider region", hide: true, cellClass: "unformattedString" },
  { field: "contract.providerCompany.city", headerName: "Contract provider city", hide: true, cellClass: "unformattedString" },
  {
    field: "contract.providerCompany.relevance",
    headerName: "Contract provider relevance",
    valueGetter: (params) =>
      params.data?.contract?.providerCompany?.relevance ? getDisplayedNameForRelevanceType(params.data.contract?.providerCompany?.relevance) : "",
    hide: true,
    cellClass: "unformattedString",
  },
];

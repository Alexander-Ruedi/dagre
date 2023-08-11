import { MyColDef } from "../../../models/TableModel";
import { getCompanyCodeAndName } from "../../../utils/DisplayUtil";

export type ServiceColumns =
  | "service.type"
  | "service.description"
  | "service.benefit"
  | "service.materialName"
  | "service.materialNr"
  | "service.companyId";
export const providerServiceColumnDefinition: MyColDef<any, ServiceColumns>[] = [
  {
    field: "service.companyId",
    headerName: "Provider",
    valueGetter: (params) => {
      return params.data?.service?.company ? getCompanyCodeAndName(params.data?.service?.company) : "";
    },
    sort: "asc",
    sortIndex: 1,
    cellClass: "unformattedString",
  },
  { field: "service.description", headerName: "Service description", hide: true, cellClass: "unformattedString" },
  { field: "service.benefit", headerName: "Service benefit", hide: true, cellClass: "unformattedString" },
  { field: "service.materialNr", headerName: "Service material number", hide: true, cellClass: "unformattedString" },
  { field: "service.materialName", headerName: "Service material name", hide: true, cellClass: "unformattedString" },
];

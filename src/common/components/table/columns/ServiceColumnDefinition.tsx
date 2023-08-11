import { MyColDef } from "../../../models/TableModel";
import { getDisplayedNameForServiceType } from "../../../models/common/ServiceTypeModel";

export type ServiceColumns =
  | "service.type"
  | "service.description"
  | "service.benefit"
  | "service.materialName"
  | "service.materialNr"
  | "service.companyId";
export const serviceColumnDefinition: MyColDef<any, ServiceColumns>[] = [
  {
    field: "service.type",
    headerName: "Service type",
    valueGetter: (params) => (params.data.service ? getDisplayedNameForServiceType(params.data.service.type) : ""),
    hide: true,
    cellClass: "unformattedString",
  },
  { field: "service.description", headerName: "Service description", hide: true, cellClass: "unformattedString" },
  { field: "service.benefit", headerName: "Service benefit", hide: true, cellClass: "unformattedString" },
  { field: "service.materialNr", headerName: "Service material number", hide: true, cellClass: "unformattedString" },
  { field: "service.materialName", headerName: "Service material name", hide: true, cellClass: "unformattedString" },
];

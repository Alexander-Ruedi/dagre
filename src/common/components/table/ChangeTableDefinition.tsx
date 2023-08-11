import { ChangeModel } from "../../models/ChangeModel";
import { MyColDef } from "../../models/TableModel";
import { LocaleFormat } from "../../store/slices/SettingsSliceModel";
import { getLocale, getLocaleDateTimeCellClass } from "./utils/TableUtil";

export const changeTableDefinitions: (locale?: LocaleFormat) => MyColDef<any, keyof ChangeModel>[] = (locale) => [
  { field: "createdBy", headerName: "Created by", hide: true, cellClass: "unformattedString" },
  {
    field: "createdOn",
    headerName: "Created on",
    valueGetter: (params: any) => {
      return params.data?.createdOn ? new Date(params.data.createdOn).toLocaleString(getLocale()) : "";
    },
    hide: true,
    cellClass: getLocaleDateTimeCellClass(locale),
  },
  { field: "updatedBy", headerName: "Updated by", hide: true, cellClass: "unformattedString" },
  {
    field: "updatedOn",
    headerName: "Updated on",
    valueGetter: (params: any) => {
      return params.data?.updatedOn ? new Date(params.data.updatedOn).toLocaleString(getLocale()) : "";
    },
    hide: true,
    cellClass: getLocaleDateTimeCellClass(locale),
  },
];

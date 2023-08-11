import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ExportParams, GridApi, MenuItemDef, ProcessHeaderForExportParams, ProcessRowGroupForExportParams } from "ag-grid-enterprise";
import { renderToString } from "react-dom/server";
import { RoutingLinks } from "../../routing/data/RoutingData";
import { downloadExcelForReimport } from "../utils/TableUtil";

export enum PeriodType {
  BILLING_PERIOD = "BILLING_PERIOD",
  FINANCIAL_PERIOD = "FINANCIAL_PERIOD",
}
export interface ExportParameters {
  url: RoutingLinks;
  periodType: PeriodType;
}

export const getDefaultExportMenuItem = (gridApi: GridApi): MenuItemDef => ({
  name: "Export",
  subMenu: [
    {
      name: "CSV Export",
      action: () => onExportDataAsCsv(gridApi),
      icon: '<span class="ag-icon ag-icon-csv" unselectable="on" role="presentation"></span>',
    },
    {
      name: "Excel Export",
      action: () => onExportDataAsExcel(gridApi),
      icon: '<span class="ag-icon ag-icon-excel" unselectable="on" role="presentation"></span>',
    },
  ],
  icon: '<span class="ag-icon ag-icon-save" unselectable="on" role="presentation"></span>',
});

export const getDefaultCopyMenuItems = (gridApi: GridApi) => {
  const result: (string | MenuItemDef)[] = [
    "copy",
    "copyWithHeaders",
    {
      name: "Copy selected row",
      action: () => onCopyRow(gridApi),
      icon: '<span class="ag-icon ag-icon-copy" unselectable="on" role="presentation"></span>',
      disabled: !isRowSelected(gridApi),
    },
    {
      name: "Copy selected row with Headers",
      action: () => onCopyRow(gridApi, true),
      icon: '<span class="ag-icon ag-icon-copy" unselectable="on" role="presentation"></span>',
      disabled: !isRowSelected(gridApi),
    },
    "separator",
  ];

  return result;
};

export const getContextMenuItems = (gridApi: GridApi, exportUrl: ExportParameters) => {
  const exportMenu = getDefaultExportMenuItem(gridApi);
  exportMenu.subMenu?.push({
    name: "Export for reimport",
    action: () => onExportForReimport(gridApi, exportUrl),
    icon: renderToString(
      // eslint-disable-next-line react/no-unknown-property
      <span className="ag-icon" unselectable="on" role="presentation">
        <ArrowPathIcon className="w-4 h-4" />
      </span>,
    ),
  });
  const result: (string | MenuItemDef)[] = [...getDefaultCopyMenuItems(gridApi), exportMenu];

  return result;
};

const exportParams: ExportParams<any> = {
  processRowGroupCallback: rowGroupCallback,
  processHeaderCallback: headerCallback,
};

function onCopyRow(gridApi: GridApi, includeHeaders: boolean = false): void {
  gridApi.copySelectedRowsToClipboard({ includeHeaders });
}

function onExportDataAsCsv(gridApi: GridApi): void {
  gridApi.exportDataAsCsv(exportParams);
}

function onExportDataAsExcel(gridApi: GridApi): void {
  gridApi.exportDataAsExcel(exportParams);
}

const onExportForReimport = async (gridApi: GridApi, exportParameters: ExportParameters) => {
  await downloadExcelForReimport(exportParameters);
};

function headerCallback(params: ProcessHeaderForExportParams): string {
  return params.column.getColDef().headerName?.toUpperCase() || "";
}

function rowGroupCallback(params: ProcessRowGroupForExportParams): string {
  const node = params.node;
  return node.key?.toUpperCase() || "";
}

function isRowSelected(gridApi: GridApi): boolean {
  return gridApi.getSelectedRows().length !== 0;
}

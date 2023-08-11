import {
  ColDef,
  ColumnApi,
  ColumnMovedEvent,
  FilterChangedEvent,
  FirstDataRenderedEvent,
  GridReadyEvent,
  SortChangedEvent,
  ValueFormatterParams,
} from "ag-grid-community";
import { GridApi } from "ag-grid-community/dist/lib/gridApi";
import { LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { LoadingState } from "../../../../country/table/CountryTable";
import { onRequestError } from "../../../hooks/useNotificationHandlers";
import { store } from "../../../store/Store";
import { LocaleFormat } from "../../../store/slices/SettingsSliceModel";
import { TableState } from "../../../store/slices/financial-periods/FinancialPeriodSliceModel";
import { ApiInstance, baseUrl } from "../../../utils/ApiInstance";
import { downloadFile } from "../../../utils/ExportUtil";
import { ExportParameters, PeriodType } from "../menu/ContextMenu";

LicenseManager.setLicenseKey(
  "CompanyName=Optravis LLC,LicensedApplication=Optravis Tax Platform,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=3,LicensedProductionInstancesCount=3,AssetReference=AG-033826,SupportServicesEnd=12_October_2023_[v2]_MTY5NzA2NTIwMDAwMA==4cb60e5131a19040b2e5fc60b4ddaf96",
);

export const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  filter: true,
  wrapHeaderText: true,
  autoHeaderHeight: true,
  menuTabs: ["filterMenuTab", "columnsMenuTab"],
  filterParams: {
    excelMode: "windows",
  },
};

export function setSizeColumnsToFit(api: GridApi<any | undefined>, sizeColumnToFit: boolean) {
  if (sizeColumnToFit) {
    api.sizeColumnsToFit();
  }
}

export function setSizeColumnsAsNeeded(api: ColumnApi, sizeColumnToFit: boolean) {
  if (sizeColumnToFit) {
    api.autoSizeColumns([]);
  }
}

export const getLocale = () => {
  const currentFormat = store.getState().settings.format;
  return currentFormat === LocaleFormat.DE ? "de-DE" : "en-US";
};

export const getLocaleCurrencyCellClass = (locale?: LocaleFormat) => {
  const currentFormat = locale || store.getState().settings.format;
  return currentFormat === LocaleFormat.DE ? "deCurrency" : "usCurrency";
};

export const getLocaleDateTimeCellClass = (locale?: LocaleFormat) => {
  const currentLocale = locale || store.getState().settings.format;
  return currentLocale === LocaleFormat.DE ? "deDateTime" : "usDateTime";
};

export const percentageFormatter = (value: number) => {
  const newPercentage = Math.round(value * 100) / 100;
  return `${newPercentage.toLocaleString(getLocale(), { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })} %`;
};
export const percentageCellFormatter = (params: ValueFormatterParams) => {
  if (params.value !== null && params.value !== undefined) return percentageFormatter(params.value as number);
  return params.value;
};

export const currencyFormatter = (value: number) => value.toLocaleString(getLocale(), { style: "currency", currency: "EUR" });
export const currencyCellFormatter = (params: ValueFormatterParams) => {
  if (params.value !== null && params.value !== undefined) return currencyFormatter(params.value as number);
  return params.value;
};

export const numberFormatter = (value: number) =>
  value.toLocaleString(getLocale(), { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
export const numberCellFormatter = (params: ValueFormatterParams) => {
  if (params.value !== null && params.value !== undefined) return numberFormatter(params.value as number);
  return params.value;
};

export const numberComparatorForAgGrid = (a: string | null, b: string | null) => {
  const valA = a == null ? 0 : parseFloat(a);
  const valB = b == null ? 0 : parseFloat(b);
  if (valA === valB) return 0;
  return valA > valB ? 1 : -1;
};

//right-align columns in AG Grid
export const columnTypes: { [key: string]: ColDef } = {
  myRightAligned: {
    cellClass: ["ag-right-aligned-cell", "alignRight"],
  },
  numericColumnFormatted: {
    cellClass: "ag-right-aligned-cell",
    valueFormatter: numberCellFormatter,
    filterParams: { comparator: numberComparatorForAgGrid, valueFormatter: numberCellFormatter },
  },
  numericColumnFormattedWithCurrency: {
    cellClass: "ag-right-aligned-cell",
    valueFormatter: currencyCellFormatter,
    filterParams: { comparator: numberComparatorForAgGrid, valueFormatter: currencyCellFormatter },
  },
  percentageColumn: {
    cellClass: "ag-right-aligned-cell",
    valueFormatter: percentageCellFormatter,
    filterParams: { comparator: numberComparatorForAgGrid, valueFormatter: percentageCellFormatter },
  },
};

export const getState = (event: FilterChangedEvent<any> | SortChangedEvent<any> | ColumnMovedEvent<any> | AgGridReact<any>) => {
  const columnState = event.columnApi.getColumnState();
  const columnGroupState = event.columnApi.getColumnGroupState();
  const filterModel = event.api.getFilterModel();
  const currentState: TableState = { columnState, columnGroupState, filterModel };
  return currentState;
};
export const applyState = (event: FirstDataRenderedEvent<any> | AgGridReact<any> | GridReadyEvent<any>, state: TableState) => {
  if (event && event.api) {
    event.api.setFilterModel(state.filterModel);
    event.api?.onFilterChanged();
    event.columnApi.setColumnGroupState(state.columnGroupState);
    event.columnApi.applyColumnState({ state: state.columnState, applyOrder: true });
  }
};
export const applyEmptyState = (event: FirstDataRenderedEvent<any> | AgGridReact<any>) => {
  console.log("clear state");
  event.api.setFilterModel(null);
  event.api?.onFilterChanged();
  event.columnApi.resetColumnGroupState();
  event.columnApi.resetColumnState();
  event.api.sizeColumnsToFit();
  return true;
};

export const showOverlay = (api: GridApi, loadingState: boolean | LoadingState | undefined) => {
  setTimeout(() => {
    switch (loadingState) {
      case LoadingState.IS_LOADING:
        api.showLoadingOverlay();
        break;
      case LoadingState.PREREQ_MISSING:
        api.showNoRowsOverlay();
        break;
      case LoadingState.NO_ROWS:
        api.showNoRowsOverlay();
        break;
      // the "loading" overlay is used for errors too
      case LoadingState.ERROR:
        api.showLoadingOverlay();
        break;
      case LoadingState.SUCCESS:
        api.hideOverlay();
        break;
    }
  }, 50);
};

export const downloadExcelForReimport = (exportParameters: ExportParameters) => {
  const dataService = new ApiInstance();
  const defaultFileType = "type=XLSX";

  let periodParameter;

  if (exportParameters.periodType === PeriodType.FINANCIAL_PERIOD) {
    const financialPeriodId = store.getState().financialPeriod.dropdown?.selected?.id;
    const financialPeriodParameter = financialPeriodId ? `?periodId=${financialPeriodId}&${defaultFileType}` : "?defaultFileType";
    periodParameter = financialPeriodParameter;
  } else if (exportParameters.periodType === PeriodType.BILLING_PERIOD) {
    const billingPeriodId = store.getState().billingPeriod.dropdown?.selected?.id;
    const billingPeriodParameter = billingPeriodId ? `?periodId=${billingPeriodId}&${defaultFileType}` : "?defaultFileType";
    periodParameter = billingPeriodParameter;
  }

  return dataService.axios
    .get(baseUrl + exportParameters.url + periodParameter, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "unknown_filename";
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
      }
      downloadFile(response.data, fileName);
    })

    .catch((error: any) => {
      onRequestError("export failed", error);
      throw error;
    });
};

import { FilterChangedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridReactProps } from "ag-grid-react/lib/shared/interfaces";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadingState } from "../../../country/table/CountryTable";
import { ReducerModel } from "../../store/models/ReducerMapModel";
import { defaultExcelStyles } from "../../style/ExcelStyles";
import { OVERLAY_ERROR_TEMPLATE, OVERLAY_LOADING_TEMPLATE } from "./ag-grid/LoadingOverlayComponent";
import { NoRowsOverlayComponent } from "./ag-grid/NoRowsOverlayComponent";
import { handleClipboard } from "./clipboard/ClipBoard.util";
import { columnTypes, defaultColDef, showOverlay } from "./utils/TableUtil";

interface AGGridDefaultProps<T> extends AgGridReactProps<T> {
  tableRef: any;
  onFilterChanged?: (grid: FilterChangedEvent<T>) => void;
  isLoading?: boolean | LoadingState;
}
export function AGGridDefault<T = any>(props: AGGridDefaultProps<T>) {
  useEffect(() => {
    if (props.tableRef?.current?.api) {
      props.tableRef.current.api.redrawRows();
    }
  }, [props]);

  useEffect(() => {
    const gridApi = props.tableRef?.current?.api;
    if (gridApi) {
      showOverlay(gridApi, props.isLoading);
    }
  }, [props]);

  return (
    <AgGridReact<T>
      ref={props.tableRef}
      rowData={props.isLoading === true || props.isLoading === LoadingState.IS_LOADING ? undefined : props.rowData}
      {...props}
      defaultColDef={defaultColDef}
      columnTypes={columnTypes}
      suppressMenuHide={true}
      suppressCopyRowsToClipboard={true}
      enableRangeSelection={true}
      onFilterChanged={(grid) => {
        grid.api.deselectAll();
        const filterModel = grid.api.getFilterModel();
        if (Object.keys(filterModel).length !== 0) {
          grid.api.selectAllFiltered();
        }
        if (props.onFilterChanged) {
          props.onFilterChanged(grid);
        }
      }}
      sendToClipboard={handleClipboard}
      overlayLoadingTemplate={props.isLoading === LoadingState.ERROR ? OVERLAY_ERROR_TEMPLATE : OVERLAY_LOADING_TEMPLATE}
      noRowsOverlayComponent={NoRowsOverlayComponent}
      excelStyles={props.excelStyles ? defaultExcelStyles.concat(props.excelStyles) : defaultExcelStyles}
    />
  );
}

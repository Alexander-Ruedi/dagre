import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";
import { TableState } from "../../../store/slices/financial-periods/FinancialPeriodSliceModel";
import { FitToChange } from "../actions/FitToComponent";
import { applyState, getState } from "./TableUtil";

export const getCustomViewPath = (location: string) => "custom-views-" + location;
export const getPersistedViewPath = (location: string) => "persisted-view-" + location;

interface PersistedViewModel {
  tableState: TableState;
  viewName: string;
  fitTo: FitToChange;
}
export const persistCurrentView = (gridRef: RefObject<AgGridReact<any>>, viewName: string, fitTo: FitToChange, location: string) => {
  if (gridRef.current) {
    const tableState = getState(gridRef.current);
    const fullPersistedView: PersistedViewModel = { tableState, viewName, fitTo };
    localStorage.setItem(getPersistedViewPath(location), JSON.stringify(fullPersistedView));
  }
};
export const applyPersistedView = (gridRef: RefObject<AgGridReact<any>>, location: string) => {
  try {
    const rawPersistedView = localStorage.getItem(getPersistedViewPath(location));
    const persistedView = rawPersistedView && JSON.parse(rawPersistedView);
    if (gridRef.current) {
      if (persistedView) {
        applyState(gridRef.current, persistedView?.tableState);
        return persistedView;
      } else {
        gridRef.current.api.sizeColumnsToFit();
      }
    }
  } catch (e) {
    console.log("Error on unsafe localStorage parse", e);
  }
};

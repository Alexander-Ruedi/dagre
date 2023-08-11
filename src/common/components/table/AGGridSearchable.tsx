import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridReactProps } from "ag-grid-react/lib/shared/interfaces";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { LoadingState } from "../../../country/table/CountryTable";
import { ReducerModel } from "../../store/models/ReducerMapModel";
import { AGGridDefault } from "./AGGridDefault";
import { ClearFilterButtonComponent } from "./actions/ClearFilterButtonComponent";
import { FitToChange, FitToComponent } from "./actions/FitToComponent";
import { SearchComponent } from "./actions/SearchComponent";
import { ViewControllerComponent } from "./actions/ViewControllerComponent";
import { defaultStatusBar } from "./status/DefaultStatusBar";
import { applyPersistedView, persistCurrentView } from "./utils/ViewUtils";

interface AGGridSearchable<T> extends AgGridReactProps<T> {
  myRef?: RefObject<AgGridReact>;
  filterDisabled?: boolean;
  children?: React.ReactNode;
  onStateChange?: (event: any) => void;
  isLoading?: boolean | LoadingState;
  customPathName?: string;
}
export function AGGridSearchable<T = any>(props: AGGridSearchable<T>) {
  const gridRef = props.myRef || useRef<AgGridReact>(null);
  const [viewName, setViewName] = useState("Initial view");

  const [searchTerm, setSearchTerm] = useState("");
  const [fitTo, setFitTo] = useState(FitToChange.SCREEN);
  const [filteredColumnsCount, setFilteredColumnsCount] = useState(0);
  const location = props.customPathName ? props.customPathName : useLocation().pathname;

  const isAnimationFinished = useSelector((state: ReducerModel) => state.navigation.isAnimationFinished);
  useEffect(() => {
    if (fitTo !== FitToChange.CONTENT) {
      gridRef.current?.api?.sizeColumnsToFit();
    }
  }, [isAnimationFinished, fitTo, gridRef]);

  return (
    <>
      <div className="flex flex-row mt-4 items-center justify-between select-none">
        <div className="flex max-h-[30px]">
          <SearchComponent onSearch={setSearchTerm} searchTerm={searchTerm} />
          <ClearFilterButtonComponent
            onClick={() => {
              gridRef.current?.api?.setFilterModel(null);
              gridRef.current?.api?.onFilterChanged();
            }}
            isDisabled={!filteredColumnsCount}
          />
          <div className="flex max-h-full">
            <ViewControllerComponent
              gridRef={gridRef}
              location={location}
              viewName={viewName}
              onViewNameChange={(newViewName) => {
                if (newViewName === "Initial view") {
                  setFitTo(FitToChange.SCREEN);
                }
                setViewName(newViewName);
              }}
              fitTo={fitTo}
            />
            <FitToComponent
              onChange={(newFitTo) => {
                if (gridRef.current) {
                  setFitTo(newFitTo);
                  switch (newFitTo) {
                    case FitToChange.SCREEN:
                      gridRef.current?.api.sizeColumnsToFit();
                      break;
                    case FitToChange.CONTENT:
                      gridRef.current?.columnApi.autoSizeAllColumns();
                      break;
                  }
                }
              }}
              disabled={false}
              value={fitTo}
            />
          </div>
        </div>
        <div className="flex max-h-[30px]">{props.children}</div>
      </div>
      <div className="ag-theme-balham w-full h-full flex-row overflow-auto grow mt-2 border border-md shadow-md border-msg-lightgray rounded-md">
        <AGGridDefault<T>
          rowSelection={"multiple"}
          rowMultiSelectWithClick={true}
          tableRef={gridRef}
          {...props}
          onColumnResized={(event) => {
            if (gridRef.current && event.finished) {
              props.onColumnResized && props.onColumnResized(event);
              const isAutomaticEvent = event.source === "api";
              if (!isAutomaticEvent) {
                //size columns to fit will trigger this
                persistCurrentView(gridRef, viewName, fitTo, location);
              }
            }
          }}
          onSortChanged={(event) => {
            props.onSortChanged && props.onSortChanged(event);
            const isAutomaticEvent = event.source === "api";
            if (!isAutomaticEvent) {
              persistCurrentView(gridRef, viewName, fitTo, location);
            }
          }}
          onColumnMoved={(event) => {
            props.onColumnMoved && props.onColumnMoved(event);
            const isAutomaticEvent = event.source === "api";
            if (!isAutomaticEvent) {
              persistCurrentView(gridRef, viewName, fitTo, location);
            }
          }}
          onColumnVisible={(event) => {
            props.onColumnVisible && props.onColumnVisible(event);
            const isAutomaticEvent = event.source === "api";
            if (!isAutomaticEvent) {
              persistCurrentView(gridRef, viewName, fitTo, location);
            }
          }}
          onFilterChanged={(e) => {
            const filterModel = gridRef.current?.api.getFilterModel();
            if (filterModel) {
              const filterKeys = Object.keys(filterModel);
              setFilteredColumnsCount(filterKeys.length);
            }
            persistCurrentView(gridRef, viewName, fitTo, location);

            if (props.onFilterChanged) {
              props.onFilterChanged(e);
            }
          }}
          onGridReady={(event) => {
            const currentPersistedView = applyPersistedView(gridRef, location);
            if (currentPersistedView && currentPersistedView?.fitTo) {
              setFitTo(currentPersistedView?.fitTo);
            }
            if (currentPersistedView && currentPersistedView.viewName) {
              setViewName(currentPersistedView.viewName);
            }

            if (props.onGridReady) {
              props.onGridReady(event);
            }
          }}
          quickFilterText={searchTerm}
          excelStyles={props.excelStyles}
          defaultExcelExportParams={{ exportedRows: "all" }}
          statusBar={props.statusBar ? props.statusBar : defaultStatusBar}
        />
      </div>
    </>
  );
}

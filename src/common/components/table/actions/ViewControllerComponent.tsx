import { AgGridReact } from "ag-grid-react";
import { RefObject, useState } from "react";
import { SavedView } from "../../../store/slices/custom-views/CustomViewsSliceModel";
import { SaveViewPopupComponent } from "../popup/SaveViewPopupComponent";
import { applyEmptyState, applyState, getState } from "../utils/TableUtil";
import { getCustomViewPath, persistCurrentView } from "../utils/ViewUtils";
import { ViewComponent } from "./ViewComponent";
import { FitToChange } from "./FitToComponent";

interface ViewControllerProps {
  gridRef: RefObject<AgGridReact<any>>;
  location: string;
  viewName: string;
  onViewNameChange: (newName: string) => void;
  fitTo: FitToChange;
}

export const ViewControllerComponent = (props: ViewControllerProps) => {
  const { viewName, fitTo, location } = props;
  const loadSavedViews = () => {
    const views = localStorage.getItem(getCustomViewPath(location));
    const parsedViews = views ? JSON.parse(views) : [];
    return parsedViews as Array<SavedView>;
  };
  const [savedViews, setSavedViews] = useState(loadSavedViews());
  const handleDeleteSavedView = (viewName: string) => {
    const newViews = savedViews.filter((savedView) => savedView.name !== viewName);
    setSavedViews(newViews);
    localStorage.setItem(getCustomViewPath(location), JSON.stringify(newViews));
  };

  const saveViewToLocalStorage = (name: string) => {
    if (props.gridRef.current) {
      const currentTableState = getState(props.gridRef.current);
      if (currentTableState) {
        const newViews: SavedView[] = [...loadSavedViews(), { name, location: getCustomViewPath(location), tableState: currentTableState, fitTo }];
        setSavedViews(newViews);
        persistCurrentView(props.gridRef, name, fitTo, location);
        localStorage.setItem(getCustomViewPath(location), JSON.stringify(newViews));
        props.onViewNameChange(name);
      }
    }
  };

  const [showSaveDialog, setShowSaveDialog] = useState(false);

  return (
    <>
      <ViewComponent
        onInitialViewClicked={() => {
          if (props.gridRef.current) {
            applyEmptyState(props.gridRef.current);
            persistCurrentView(props.gridRef, "Initial view", fitTo, location);
            props.onViewNameChange("Initial view");
          }
        }}
        onSaveCustomView={() => setShowSaveDialog(true)}
        savedViews={savedViews}
        onApplySavedView={(newView) => {
          if (props.gridRef.current) {
            applyState(props.gridRef.current, newView.tableState);
            props.onViewNameChange(newView.name);
          }
        }}
        onDeleteSavedView={handleDeleteSavedView}
        viewName={viewName}
      />

      {showSaveDialog && (
        <SaveViewPopupComponent
          onCancel={() => setShowSaveDialog(false)}
          onConfirm={(name) => {
            setShowSaveDialog(false);
            saveViewToLocalStorage(name);
          }}
          forbiddenNames={savedViews.filter((savedView) => savedView.location === props.location).map((savedView) => savedView.name)}
        />
      )}
    </>
  );
};

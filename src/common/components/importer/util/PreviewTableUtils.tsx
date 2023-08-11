import { XMarkIcon } from "@heroicons/react/24/outline";
import { RowClassParams } from "ag-grid-community";
import { RowNode } from "ag-grid-community/dist/lib/entities/rowNode";
import { GridApi } from "ag-grid-community/dist/lib/gridApi";
import { DisabledReason } from "../../../utils/DisabledTextUtil";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";
import { MergeModes } from "../components/ImportModeSelect";
import { Merge } from "../models/Merge";

interface BatchDiscardProps {
  onClick: () => void;
  isDisabled: boolean;
}

export const BatchDiscardComponent = (props: BatchDiscardProps) => {
  const icon = <XMarkIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />;
  return (
    <div className="flex max-h-full">
      <SmallActionButtonComponent
        icon={icon}
        text="Discard"
        onClick={() => props.onClick()}
        disabled={props.isDisabled}
        disabledText={DisabledReason.DISCARD_DISABLED}
        disabledTextDirection="left"
      />
    </div>
  );
};

export const getDisplayedEntry = <Data,>(merge: Merge<Data> | undefined): Data | null => {
  if (merge) {
    switch (merge.operation) {
      case MergeModes.DELETE:
        return merge.current?.data ?? null;
      default:
        return merge.imported;
    }
  } else return null;
};

export const getUpdateHighlightCellClass = <RowData, RowField>(merge: Merge<RowData> | undefined, getRowField: (entry: RowData) => RowField) => {
  if (merge && merge.current && merge.imported) {
    const importedMatchesCurrent = getRowField(merge.current.data) == getRowField(merge.imported);
    if (importedMatchesCurrent) {
      return "";
    } else {
      return "text-amber-700 font-medium";
    }
  } else return "";
};

export const discardAction = <Data,>(node: RowNode<Merge<Data>>, api: GridApi<Merge<Data>>) => {
  const discardImported = (data: Merge<Data>) => {
    node.setData({
      current: data.current,
      imported: data.current?.data ?? null,
      operation: MergeModes.NONE,
      info: data.info,
      warning: data.warning,
      error: data.error,
    });
    api.applyTransaction({ update: [data] });
    api.refreshClientSideRowModel();
    api.redrawRows();
  };
  const removeImported = (data: Merge<Data>) => {
    api.applyTransaction({ remove: [data] });
    api.refreshClientSideRowModel();
    api.redrawRows();
  };

  const data = node.data;
  if (data) {
    switch (data.operation) {
      case MergeModes.DELETE:
      case MergeModes.UPDATE:
        discardImported(data);
        break;
      case MergeModes.CREATE:
        removeImported(data);
        break;
      case MergeModes.NONE:
        break;
    }
  }
};

export const getRowClass = <Data,>(params: RowClassParams<Merge<Data>>) => {
  const operation = params.data?.operation;
  if (operation) {
    switch (operation) {
      case MergeModes.DELETE:
        return "delete-operation";
      case MergeModes.CREATE:
        return "create-operation";
      case MergeModes.UPDATE:
        return "update-operation";
      case MergeModes.NONE:
        return "no-operation";
    }
  }
  return "";
};

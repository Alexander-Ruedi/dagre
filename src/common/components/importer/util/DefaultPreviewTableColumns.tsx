import { XMarkIcon } from "@heroicons/react/24/outline";
import { ICellRendererParams, ValueGetterParams } from "ag-grid-community";
import React from "react";
import { MyColDef } from "../../../models/TableModel";
import { TooltipActionButtonComponent } from "../../table/tooltip/TooltipActionButtonComponent";
import { MergeModes } from "../components/ImportModeSelect";
import { Merge } from "../models/Merge";
import { discardAction } from "./PreviewTableUtils";

export enum DefaultPreviewFields {
  INFO = "info",
  WARNING = "warning",
  OPERATION = "operation",
}

export function getDefaultPreviewColumns<T>(): MyColDef<Merge<T>, DefaultPreviewFields>[] {
  return [getInfoColumn(), getWarningColumn(), getOperationColumn()];
}

function getInfoColumn<T>(): MyColDef<Merge<T>, DefaultPreviewFields.INFO> {
  return {
    field: DefaultPreviewFields.INFO,
    headerName: "Info",
    hide: true,
  };
}

function getWarningColumn<T>(): MyColDef<Merge<T>, DefaultPreviewFields.WARNING> {
  return {
    field: DefaultPreviewFields.WARNING,
    headerName: "Warning",
    hide: true,
  };
}

function getOperationColumn<T>(): MyColDef<Merge<T>, DefaultPreviewFields.OPERATION> {
  return {
    field: DefaultPreviewFields.OPERATION,
    valueGetter: (params: ValueGetterParams<Merge<T>>) => (!params.data || params.data?.operation == MergeModes.NONE ? "" : params.data.operation),
    cellRenderer: (params: ICellRendererParams<Merge<T>>) => {
      if (params.value) {
        return <DiscardChangesActionButton label={params.value} onDiscard={() => discardAction(params.node, params.api)} />;
      } else {
        return <></>;
      }
    },
    initialSort: "desc",
  };
}

interface DiscardChangesActionButtonProps {
  onDiscard: () => void;
  label: string;
}

function DiscardChangesActionButton(props: DiscardChangesActionButtonProps) {
  return (
    <ul className="flex flex-row space-x-2 items-center h-full">
      <li className="flex items-center">
        <span className="mr-1">{props.label}</span>
        <TooltipActionButtonComponent onClick={() => props.onDiscard()} icon={<XMarkIcon className="h-5 w-5" />} hoverText="Discard" />
      </li>
    </ul>
  );
}

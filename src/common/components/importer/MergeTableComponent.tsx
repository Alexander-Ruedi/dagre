import { RowNode } from "ag-grid-community/dist/lib/entities/rowNode";
import { AgGridReact } from "ag-grid-react";
import axios, { AxiosError } from "axios";
import { useCallback, useMemo, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MyColDef } from "../../models/TableModel";
import { cleanCacheCascading } from "../../utils/CacheUtil";
import { DisabledReason } from "../../utils/DisabledTextUtil";
import { PopupComponent } from "../controls/popup/PopupComponent";
import { SubmitCancelComponent } from "../form/submit/SubmitCancelComponent";
import { LoadingStatus } from "../form/submit/components/LoadingSpinnerButtonComponent";
import { AGGridSearchable } from "../table/AGGridSearchable";
import { NavigationLinks } from "../table/models/TableModel";
import { defaultStatusBar } from "../table/status/DefaultStatusBar";
import { ImporterStatusForwardRef, ImportStatusStats } from "../table/status/ImporterStatusForwardRef";
import { commitImportRequest } from "./api/ImporterApi";
import { MergeModes } from "./components/ImportModeSelect";
import { Merge } from "./models/Merge";
import { DefaultPreviewFields } from "./util/DefaultPreviewTableColumns";
import { BatchDiscardComponent, discardAction, getRowClass } from "./util/PreviewTableUtils";

export interface MergeTableProps<Data, ColumnHeaders extends string> {
  periodId: string;
  mergeProposal: Merge<Data>[];
  colDef: MyColDef<Merge<Data>, ColumnHeaders>[];
  navigationLink: NavigationLinks;
}

const hasInfo = (mergeProposal: Merge<any>[]) => mergeProposal.some((mergeData) => mergeData.info.length > 0);
const hasWarning = (mergeProposal: Merge<any>[]) => mergeProposal.some((mergeData) => mergeData.warning.length > 0);

const unhideInfoOrWarningColumns = <Data, ColumnHeaders extends string>(
  defaultColDef: MyColDef<Merge<Data>, ColumnHeaders>[],
  hasInfo: boolean,
  hasWarning: boolean,
) => {
  if (!(hasInfo || hasWarning)) {
    return defaultColDef;
  }

  return defaultColDef.map((column) => {
    if ((hasInfo && column.field === DefaultPreviewFields.INFO) || (hasWarning && column.field === DefaultPreviewFields.WARNING)) {
      return { ...column, hide: false };
    }
    return column;
  });
};

export const MergeTableComponent = <Data, ColumnHeaders extends string>(props: MergeTableProps<Data, ColumnHeaders>) => {
  const [selectedRows, setSelectedRows] = useState<Merge<Data>[]>();

  const navigate = useNavigate();

  const gridRef = useRef<AgGridReact>(null);

  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.IDLE);
  const getAllRows = <T,>() => {
    const rowData: Merge<T>[] = [];
    if (gridRef.current) {
      gridRef.current.api.forEachNode((node) => {
        if (node.data) {
          rowData.push(node.data);
        }
      });
    }
    return rowData;
  };

  const [importDisabled, setImportDisabled] = useState(false);

  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<AxiosError<unknown, any> | undefined>(undefined);

  const updateImportDisabled = () => {
    const allRows = getAllRows<Data>();
    const isDisabled = allRows.every((entry) => entry.operation == MergeModes.NONE);

    setImportDisabled(isDisabled);
    updateStatusBarStats(allRows);
  };

  const commitImport = () => {
    setLoadingStatus(LoadingStatus.LOADING);
    commitImportRequest(props.periodId, getAllRows<Data>(), props.navigationLink).then(
      () => {
        setShowErrors(false);
        setErrors(undefined);
        setLoadingStatus(LoadingStatus.IDLE);
        cleanCacheCascading(props.navigationLink);
        navigate(`/${props.navigationLink}/show`);
      },
      (error: AxiosError) => {
        setErrors(error);
        setShowErrors(true);
        setLoadingStatus(LoadingStatus.IDLE);
      },
    );
  };

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        {
          statusPanel: ImporterStatusForwardRef,
          key: "statusBarCompKey",
        },
        ...defaultStatusBar.statusPanels,
      ],
    };
  }, []);

  const updateStatusBarStats = useCallback((allRows: Merge<Data>[]) => {
    const addedRowCount = allRows.filter((item) => item.operation === MergeModes.CREATE).length;
    const updatedRowCount = allRows.filter((item) => item.operation === MergeModes.UPDATE).length;
    const deletedRowCount = allRows.filter((item) => item.operation === MergeModes.DELETE).length;
    const unchangedRowCount = allRows.filter((item) => item.operation === MergeModes.NONE).length;

    const statusBarComponent = gridRef.current?.api?.getStatusPanel("statusBarCompKey") as any;

    if (statusBarComponent) {
      const updatedStats: ImportStatusStats = { addedRowCount, updatedRowCount, deletedRowCount, unchangedRowCount };
      statusBarComponent.setStats(updatedStats);
    } else {
      // is needed because the getStatusPanel return undefined until its rendered
      // unfortunately there is no event that informs us (even onGridReady is too early)
      setTimeout(() => updateStatusBarStats(allRows), 50);
    }
  }, []);

  return (
    <div className="h-full w-full flex flex-col px-8 grow importer-table">
      <AGGridSearchable<Merge<Data>>
        myRef={gridRef}
        rowData={props.mergeProposal}
        columnDefs={unhideInfoOrWarningColumns(props.colDef, hasInfo(props.mergeProposal), hasWarning(props.mergeProposal))}
        onSelectionChanged={(e) => {
          const newlySelectedRows = e.api.getSelectedRows();
          setSelectedRows(newlySelectedRows);
        }}
        isRowSelectable={(row) => row.data?.operation !== MergeModes.NONE}
        filterDisabled={!selectedRows?.length}
        getRowClass={getRowClass}
        onRowDataUpdated={updateImportDisabled}
        statusBar={statusBar}
      >
        <BatchDiscardComponent
          onClick={() => {
            const current = gridRef.current;
            if (current) {
              const api = current.api;
              api.getSelectedNodes()?.forEach((node: RowNode<Merge<Data>>) => {
                discardAction(node, api);
              });
            }
          }}
          isDisabled={!selectedRows?.length}
        />
      </AGGridSearchable>
      <Outlet />
      <div className="h-20 flex flex-row items-center justify-end grow">
        <SubmitCancelComponent
          isWithinCard={false}
          onSubmit={commitImport}
          onCancel={() => navigate(`/${props.navigationLink}/show`)}
          submitText="Import"
          disabled={importDisabled}
          loadingStatus={loadingStatus}
          disabledText={DisabledReason.NO_OPERATION}
          disabledTextDirection="left"
        />
      </div>
      <PopupComponent
        open={showErrors}
        onClose={() => {
          setShowErrors(false);
        }}
        title={axios.isAxiosError(errors) && errors?.response?.data?.message}
      >
        {axios.isAxiosError(errors) &&
          errors?.response?.data?.errors?.map((lineError: string) => (
            <>
              <div>{lineError}</div>
            </>
          ))}
      </PopupComponent>
    </div>
  );
};

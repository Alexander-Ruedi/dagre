import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotificationHandler } from "../../hooks/useNotificationHandlers";
import { ReducerModel } from "../../store/models/ReducerMapModel";
import { cleanCacheCascading } from "../../utils/CacheUtil";
import { DisabledReason } from "../../utils/DisabledTextUtil";
import DropdownComponent from "../controls/dropdown/DropdownComponent";
import { emptyDropdownItem, emptyDropdownItemWithSampleData } from "../controls/dropdown/data/DropdownData";
import { DropdownModel } from "../controls/dropdown/models/DropdownModel";
import { FileComponent } from "../controls/file-upload/FileComponent";
import { SimpleInputComponent } from "../controls/number/SimpleInputComponent";
import { PopupComponent } from "../controls/popup/PopupComponent";
import { defaultInputStyleWithinImporter } from "../controls/text/DefaultInputStyle";
import { SubmitCancelComponent } from "../form/submit/SubmitCancelComponent";
import { LoadingStatus } from "../form/submit/components/LoadingSpinnerButtonComponent";
import { FinancialPeriodSelectorComponent } from "../layout/breadcrumbs/components/FinancialPeriodSelectorComponent";
import { NavigationLinks } from "../table/models/TableModel";
import { ImportTableComponent } from "./ImportTableComponent";
import { getAvailableColumns, getAvailableWorksheets, getImportColumns, importRequest, proposeImportRequest } from "./api/ImporterApi";
import { importModeOptions, ImportModeSelect, MergeModes } from "./components/ImportModeSelect";
import { ShowPreviewCheckbox } from "./components/ShowPreviewCheckbox";
import { FileColumns } from "./models/FileColumnsModel";
import { ImportPeriodType } from "./models/ImportConfig";
import { DropdownWithSampleDataModel } from "./models/ImportDropdownModel";
import { ProposeResponse } from "./models/ProposeResponse";

export interface ImportFormProps<T> {
  columnMappings: any;
  hideFinancialPeriod: boolean;
  periodType: ImportPeriodType;
  table: NavigationLinks;
  setProposeResponse: (proposeResponse: ProposeResponse<T>) => void;
  worksheetNames?: Array<string>;
}

interface ImportSelection {
  columnIndex: number;
  propertyName: string;
}

export const ImportFormComponent = <T,>(props: ImportFormProps<T>) => {
  const periodId =
    props.periodType === ImportPeriodType.FINANCIAL_PERIOD
      ? useSelector((state: ReducerModel) => state.financialPeriod)
      : useSelector((state: ReducerModel) => state.billingPeriod);

  const [file, setFile] = useState<File>();

  const [worksheet, setWorksheet] = useState("");
  const [availableWorksheets, setAvailableWorksheets] = useState([emptyDropdownItem]);

  const [availableSourceColumns, setAvailableSourceColumns] = useState<Array<DropdownWithSampleDataModel>>([]);
  const [importColumns, setImportColumns] = useState<Array<FileColumns>>([]);

  const [headerRow, setHeaderRow] = useState("1");
  const [selection, setSelection] = useState<Array<ImportSelection>>([]);

  const [showPreview, setShowPreview] = useState(true);
  const [selectedOperations, setSelectedOperations] = useState<DropdownModel[]>(importModeOptions);

  const { notifyRequestError, notifyWarning } = useNotificationHandler();
  const navigate = useNavigate();

  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.IDLE);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<AxiosError<unknown, any> | undefined>(undefined);

  useEffect(() => {
    if (file) {
      getAvailableWorksheets(file).subscribe({
        next: (availableWorksheets: any) => {
          const availableWorksheetDropdown: Array<DropdownModel> = availableWorksheets.worksheets.map((item: any) => {
            return {
              id: item.worksheetIndex,
              label: item.worksheetName,
            };
          });
          setAvailableWorksheets(availableWorksheetDropdown);

          if (availableWorksheetDropdown.length !== 0) {
            const matchingWorksheet = availableWorksheetDropdown.filter(
              (worksheet) => props.worksheetNames?.indexOf(worksheet.label.toLowerCase()) !== -1,
            );
            const newWorkSheet = matchingWorksheet.length > 0 ? matchingWorksheet[0].id : availableWorksheetDropdown[0].id;
            setWorksheet(newWorkSheet);
          }
        },
        error: (e: AxiosError) => notifyRequestError("load worksheets", e),
      });
    }
  }, [file, notifyRequestError, props.worksheetNames]);

  useEffect(() => {
    if (file && worksheet !== "") {
      getAvailableColumns(file, Number(worksheet), Number(headerRow) - 1).subscribe({
        next: (availableSourceColumns: any) => {
          const parsedAvailableSourceColumns = availableSourceColumns.map((item: any) => {
            return { id: item.columnIndex.toString(), label: item.columnName, sampleValue: item.sampleValue };
          });

          setAvailableSourceColumns([emptyDropdownItemWithSampleData].concat(parsedAvailableSourceColumns));
        },
        error: (e: AxiosError) => notifyRequestError("load available columns", e),
      });
    }
  }, [file, worksheet, headerRow, notifyRequestError]);

  useEffect(() => {
    const currentSelection: Array<ImportSelection> = [];
    if (importColumns.length > 0 && availableSourceColumns.length > 1) {
      importColumns.forEach((column: any) => {
        const columnName = column.propertyName;
        const possibleMatches = props.columnMappings[columnName];
        if (possibleMatches && possibleMatches.length > 0) {
          const matchingSourceColumn = availableSourceColumns.filter((item) => {
            const trimmedLabel = item.label.replace(/^\s+|\s+$/g, "");
            return possibleMatches.indexOf(trimmedLabel.toLowerCase()) !== -1;
          });

          if (matchingSourceColumn.length > 0) {
            const newColumnIndex = Number(matchingSourceColumn[0].id);
            if (!isNaN(newColumnIndex)) {
              currentSelection.push({ columnIndex: newColumnIndex, propertyName: column.propertyName });
            }
          }
        }
      });
      setSelection(currentSelection);
    }
  }, [availableSourceColumns, importColumns, props.columnMappings]);

  useEffect(() => {
    getImportColumns(props.table).subscribe({
      next: (importColumns: any) => {
        const requiredColumns = importColumns.filter((item: any) => item.isRequired);
        const optionalColumns = importColumns.filter((item: any) => !item.isRequired);
        const allColumns = requiredColumns.concat(optionalColumns);
        setImportColumns(allColumns);
      },
      error: (e: AxiosError) => notifyRequestError("load import columns", e),
    });
  }, [notifyRequestError, props.table]);

  const startImport = () => {
    try {
      if (file && selection) {
        const importData = {
          fileDetails: {
            initialRowIndex: Number(headerRow) - 1,
            worksheetIndex: worksheet,
            fileType: "EXCEL",
          },
          columnDetails: selection,
          periodId: periodId.dropdown.selected?.id || "",
          importType: "FLAT",
          operationTypes: selectedOperations.map(({ id }) => id),
        };

        if (showPreview) {
          setLoadingStatus(LoadingStatus.LOADING);
          proposeImportRequest<T>(file, props.table, importData).then(
            (response: AxiosResponse<ProposeResponse<T>>) => {
              setLoadingStatus(LoadingStatus.IDLE);
              if (response.data.mergeProposal.every((merge) => merge.operation == MergeModes.NONE)) {
                notifyWarning("Redundant Import", "Imported data is identical with existing!");
              } else {
                setErrors(undefined);
                props.setProposeResponse(response.data);
              }
            },
            (error: AxiosError) => {
              setErrors(error);
              setShowErrors(true);
              setLoadingStatus(LoadingStatus.IDLE);
            },
          );
        } else {
          setLoadingStatus(LoadingStatus.LOADING);
          importRequest(file, props.table, importData).then(
            (response: AxiosResponse<string[]>) => {
              setErrors(undefined);
              setLoadingStatus(LoadingStatus.IDLE);
              if (response.data.length > 0) {
                notifyWarning("Import Warnings", response.data);
              }
              cleanCacheCascading(props.table);
              navigate(`/${props.table}/show`);
            },
            (error: AxiosError) => {
              setErrors(error);
              setShowErrors(true);
              setLoadingStatus(LoadingStatus.IDLE);
            },
          );
        }
      } else {
        notifyWarning("No file selected", "In order to start import, you need to select a file.");
      }
    } catch (e) {
      console.log("silent fail 2");
    }
  };

  const setSelectionHandler = (sourceColumn: any, id: number | undefined) => {
    const existingSelectionIndex = selection.findIndex((item) => item.propertyName === sourceColumn.propertyName);
    if (existingSelectionIndex > -1) {
      updateSelection([...selection], sourceColumn.propertyName, id, existingSelectionIndex);
    } else {
      insertSelection([...selection], sourceColumn.propertyName, id);
    }
  };

  const insertSelection = (newSelection: Array<ImportSelection>, propertyName: string, id: number | undefined) => {
    if (!(id === undefined || isNaN(Number(id)))) {
      newSelection.push({ columnIndex: Number(id), propertyName: propertyName });
      setSelection(newSelection);
    }
  };

  const updateSelection = (newSelection: Array<ImportSelection>, propertyName: string, id: number | undefined, existingSelectionIndex: number) => {
    if (id === undefined || isNaN(Number(id))) {
      //remove the exisiting selection
      newSelection.splice(existingSelectionIndex, 1);
    } else {
      newSelection.splice(existingSelectionIndex, 1, { columnIndex: Number(id), propertyName: propertyName });
    }
    setSelection(newSelection);
  };

  const isSubmitDisabled =
    importColumns.filter((column) => {
      const isSelected = selection.find((selection) => selection.propertyName === column.propertyName);
      return column.isRequired && !isSelected;
    }).length > 0;

  const [disabledTextColumnMapping, setDisabledTextColumnMapping] = useState(DisabledReason.SELECT_FILE);
  useEffect(() => {
    if (file == undefined) {
      setDisabledTextColumnMapping(DisabledReason.SELECT_FILE);
    } else if (worksheet == "") {
      setDisabledTextColumnMapping(DisabledReason.SELECT_WORKSHEET);
    } else if (headerRow == "") {
      setDisabledTextColumnMapping(DisabledReason.SELECT_HEADER_ROW);
    } else if (availableSourceColumns == null) {
      setDisabledTextColumnMapping(DisabledReason.CHECK_EXCEL_FILE);
    }
  }, [file, worksheet, headerRow, availableSourceColumns]);

  return (
    <div className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">This page will import the latest data for you.</p>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                File to be imported (.xls*)
              </label>
              <div className="sm:col-span-3">
                <FileComponent onChange={(newFile) => setFile(newFile)} file={file} fileTypes=".xlsx, .xls, .xlsm" />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5" data-testid="selectedWorksheet">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Worksheet to be imported
              </label>
              <div className="mt-1 sm:col-span-3 sm:mt-0">
                <DropdownComponent
                  items={availableWorksheets}
                  onChange={(id: string) => {
                    setWorksheet(id);
                  }}
                  value={worksheet}
                  isOutsideCard={true}
                  disabled={file === undefined}
                  disabledText={DisabledReason.SELECT_FILE}
                  disabledTextDirection="left"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5" data-testid="selectedHeaderRow">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Select header row
              </label>
              <div className="mt-1 sm:col-span-3 sm:mt-0">
                <div className="flex items-center">
                  <SimpleInputComponent
                    name="row"
                    type="number"
                    min="1"
                    disabled={!(file !== undefined && worksheet !== "")}
                    value={headerRow}
                    onChange={(e) => setHeaderRow(e.target.value)}
                    className={defaultInputStyleWithinImporter}
                    disabledText={file !== undefined ? DisabledReason.SELECT_WORKSHEET : DisabledReason.SELECT_FILE}
                    disabledTextDirection="left"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5" data-testid="columnMapping">
              <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Column mapping
              </label>
              <ImportTableComponent
                sizeColumnToFit={true}
                maxHeightInPixel={220}
                onChange={setSelectionHandler}
                columns={importColumns}
                sourceColumns={availableSourceColumns}
                selection={selection}
                disabled={!(file !== undefined && worksheet !== "" && headerRow !== "" && availableSourceColumns.length > 1)}
                disabledText={disabledTextColumnMapping}
                disabledTextDirection="left"
              />
            </div>
            <div className="">
              <div className=" sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 " data-testid="importMode">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Import mode
                </label>
                <div className="mt-1 sm:col-span-3 sm:mt-0">
                  <div className="flex flex-row gap-x-4 items-center">
                    <ImportModeSelect selected={selectedOperations} setSelected={setSelectedOperations} />
                    <ShowPreviewCheckbox value={showPreview} setValue={setShowPreview} />
                  </div>
                </div>
              </div>
            </div>
            <div className={props.hideFinancialPeriod ? "hidden" : ""}>
              <div className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 ">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Assigned financial period
                </label>
                <div className="mt-1 sm:col-span-3 sm:mt-0">
                  <div>
                    <FinancialPeriodSelectorComponent
                      disabled={true}
                      disabledText={DisabledReason.WRONG_CONTROL}
                      width={220}
                      disabledTextDirection="left"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-2 pb-2">
        <SubmitCancelComponent
          isWithinCard={false}
          onSubmit={startImport}
          onCancel={() => navigate(`/${props.table}/show`)}
          submitText={showPreview ? "Preview" : "Import"}
          loadingStatus={loadingStatus}
          disabled={isSubmitDisabled}
          disabledText={DisabledReason.PREREQUISITES_NOT_MET}
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
        {axios.isAxiosError(errors) && errors?.response?.data?.errors?.map((lineError: string, index: number) => <div key={index}>{lineError}</div>)}
      </PopupComponent>
    </div>
  );
};

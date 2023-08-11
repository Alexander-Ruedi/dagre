import { CellClassFunc, SendToClipboardParams } from "ag-grid-community";
import _ from "lodash";
import { defaultExcelStyles, excelCSSStyle } from "../../../style/ExcelStyles";

interface ClipBoardProps {
  params: SendToClipboardParams;
}
export const ClipboardComponent = (props: ClipBoardProps) => {
  const cellRanges = props.params.api.getCellRanges();
  const cellRange = cellRanges && cellRanges.length === 1 ? cellRanges[0] : undefined;
  const columns = cellRange?.columns;

  const firstRowIndex = cellRange?.startRow?.rowIndex ?? 0;
  const lastRowIndex = cellRange?.endRow?.rowIndex != null ? cellRange.endRow.rowIndex + 1 : 0;
  const rowCount = lastRowIndex - firstRowIndex;

  const hasMultipleRows = rowCount > 1;
  const hasMultipleColumns = columns && columns.length > 1;
  const isHeaderVisible = hasMultipleRows || hasMultipleColumns;

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: excelCSSStyle }} />
        <title>clipboard</title>
      </head>
      <body>
        <table>
          {isHeaderVisible && (
            <thead>
              {columns?.map((column) => (
                <th key={`${column.getColId()}-header"`}>{column.getColDef().headerName}</th>
              ))}
            </thead>
          )}
          <tbody>
            {_.times(rowCount, (currentRow) => {
              const tableRowIndex = currentRow + firstRowIndex;
              return (
                <tr key={tableRowIndex}>
                  {columns?.map((column) => {
                    const rowNode = props.params.api.getDisplayedRowAtIndex(tableRowIndex);
                    const cellValue = rowNode ? props.params.api.getValue(column, rowNode) ?? "" : "";

                    const classId = column.getColId();
                    const cellClasses = column.getColDef().cellClass;
                    const appliedCellClasses = getValidCellClasses(classId, cellClasses);

                    return (
                      <td key={`${column.getColId()}-${tableRowIndex}"`} className={appliedCellClasses}>
                        {cellValue}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </body>
    </html>
  );
};

const getValidCellClasses = (classId: string, cellClass: string | string[] | CellClassFunc<any> | undefined) => {
  //ignore classes with minus, as it breaks excel css parser
  //ignore classes without format (empty css styles break excel css parser)

  if (typeof cellClass === "string") {
    return isAllowedClass(cellClass) ? cellClass : "";
  } else if (Array.isArray(cellClass)) {
    return cellClass.filter((cellClass) => isAllowedClass(cellClass)).join(" ");
  }
};

const getDefaultExcelFormat = (id: string) => defaultExcelStyles.find((item) => item.id === id)?.numberFormat?.format;
const hasDefaultExcelFormat = (id: string) => !!getDefaultExcelFormat(id);
const isAllowedClass = (id: string) => hasDefaultExcelFormat(id) && id.indexOf("-") === -1;

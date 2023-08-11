import { classNames } from "../../utils/StylingUtil";
import DropdownComponent from "../controls/dropdown/DropdownComponent";
import { ErrorTextComponent } from "../form/validation/ErrorTextComponent";
import { TooltipComponent } from "../table/tooltip/TooltipComponent";
import { numberFormatter } from "../table/utils/TableUtil";

interface ImportTableProps {
  columns: Array<any>;
  sourceColumns: Array<any>;
  sizeColumnToFit: boolean;
  maxHeightInPixel: number;
  onChange: (column: any, id: number | undefined) => void;
  selection: any;
  disabled?: boolean;
  disabledText?: string;
  disabledTextDirection?: "normal" | "left";
}

export const ImportTableComponent = (props: ImportTableProps) => {
  const getPreview = (sourceColumnIndex: number, typeName: "STRING" | "DECIMAL" | "BOOLEAN") => {
    const currentSourceColumn = props.sourceColumns.filter((item: any) => item.id === sourceColumnIndex.toString());
    if (currentSourceColumn.length > 0 && currentSourceColumn[0].sampleValue) {
      const textValue = currentSourceColumn[0].sampleValue;
      return typeName === "DECIMAL" ? numberFormatter(Number(textValue)) : textValue;
    } else {
      return "";
    }
  };

  return (
    <div
      className={classNames(
        "mt-1 sm:col-span-3 sm:mt-0 border rounded-md tooltip",
        props.disabledTextDirection && props.disabledTextDirection === "left" ? "tooltip-left" : "",
      )}
    >
      <table className="min-w-full divide-y divide-gray-300 rounded-md table-fixed">
        <thead className={classNames(props.disabled ? "bg-gray-100" : "bg-gray-50", "rounded-t-md ")}>
          <tr>
            <th scope="col" className="w-1/3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 rounded-tl-md">
              Destination column
            </th>
            <th scope="col" className="w-1/3 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Source column
            </th>
            <th scope="col" className="w-1/3 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 rounded-tr-md">
              Preview
            </th>
          </tr>
        </thead>
        <tbody className={classNames(props.disabled ? "bg-gray-100" : "bg-white", "divide-y divide-gray-200  rounded-md")}>
          {props.columns.map((column: any, index) => {
            const filteredSelection = props.selection.filter((item: any) => item.propertyName === column.propertyName);
            const currentSelection = filteredSelection.length > 0 ? filteredSelection[0].columnIndex : "";
            const isLastItem = index === props.columns.length - 1;
            return (
              <tr key={column.name} className={classNames(isLastItem ? "rounded-b-md" : "", "overflow-hidden")}>
                <td
                  className={classNames(
                    column.isRequired
                      ? "whitespace-nowrap py-4 pl-4 pr-3 font-semibold text-sm text-gray-900 sm:pl-6"
                      : "whitespace-nowrap py-4 pl-4 pr-3 font-normal text-sm text-gray-900 sm:pl-6",
                    isLastItem ? "rounded-bl-md" : "",
                  )}
                >
                  <span>
                    {column.name} {column.isRequired ? "*" : ""}
                  </span>
                  {!props.disabled && column.isRequired && currentSelection === "" && <ErrorTextComponent message={"This field is required"} />}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" data-testid="columnDropdown">
                  <DropdownComponent
                    items={props.sourceColumns}
                    value={currentSelection.toString()}
                    onChange={(id) => {
                      const idOrUndefined = id === "" ? undefined : Number(id);
                      props.onChange(column, idOrUndefined);
                    }}
                    disabled={props.disabled}
                    isOutsideCard={true}
                  />
                </td>
                <td className={classNames("whitespace-nowrap px-3 py-4 text-sm text-gray-500", isLastItem ? "rounded-br-md" : "")}>
                  {props.disabled ? "" : getPreview(currentSelection, column.typeName)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.disabled && props.disabledText && <TooltipComponent text={props.disabledText} />}
    </div>
  );
};

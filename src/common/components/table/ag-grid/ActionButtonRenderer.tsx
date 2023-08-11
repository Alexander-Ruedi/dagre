import { ICellRendererParams } from "ag-grid-community";
import { NavigationLinks } from "../models/TableModel";
import DeleteButtonComponent from "./DeleteButtonComponent";
import EditButtonComponent from "./EditButtonComponent";

interface ActionButtonProps extends ICellRendererParams {
  table: NavigationLinks;
}

export default function ActionButtonRenderer(props: ActionButtonProps) {
  const { table } = props;
  return (
    <ul className="flex flex-row space-x-2 items-center h-full">
      <li className="flex items-center">
        <EditButtonComponent url={`/${table}/edit/${props.data.id}`} table={table} item={props.data} />
      </li>
      <li className="flex items-center">
        <DeleteButtonComponent {...props} table={table} />
      </li>
    </ul>
  );
}

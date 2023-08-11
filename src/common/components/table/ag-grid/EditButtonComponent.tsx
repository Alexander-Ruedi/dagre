import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeModified, setSelected } from "../../../store/util/DispatcherUtil";
import { NavigationLinks } from "../models/TableModel";
import { TooltipActionButtonComponent } from "../tooltip/TooltipActionButtonComponent";

interface EditButtonProps {
  url: string;
  table: NavigationLinks;
  item?: any;
}

export default function EditButtonComponent(props: EditButtonProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const icon = <PencilSquareIcon className="h-5 w-5" />;
  return (
    <div data-testid="editRow">
      <TooltipActionButtonComponent
        onClick={() => {
          removeModified(props.table, dispatch);
          setSelected(props.table, props.item, dispatch);
          navigate(props.url);
        }}
        icon={icon}
        hoverText="Edit"
      />
    </div>
  );
}

import { getPageByNavigation } from "../../routing/data/PageData";
import { NavigationLinks } from "../models/TableModel";
import { DeleteDialogComponent } from "../../layout/dialog/DeleteDialogComponent";

interface ConfirmDeletionProps {
  item: any;
  table: NavigationLinks | string;
  onClose: () => void;
  onDelete: () => void;
}

export default function ConfirmDetailedDeleteComponent(props: ConfirmDeletionProps) {
  const tableTitle = getPageByNavigation(props.table as NavigationLinks);
  const itemLabel =
    props.item?.name || props.item?.shortName || props.item?.bookingText || props.item?.code || props.item?.service?.name || props.item?.description;

  const popupText = itemLabel
    ? `Do you want to delete the ${tableTitle.singularLabel} ${itemLabel} and all related data?`
    : `Do you want to delete the row of ${tableTitle.singularLabel} and all related data?`;

  const currentPage = getPageByNavigation(props.table);

  return <DeleteDialogComponent onCancel={() => props.onClose()} onConfirm={() => props.onDelete()} currentPage={currentPage} text={popupText} />;
}

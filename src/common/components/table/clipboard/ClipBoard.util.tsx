import { SendToClipboardParams } from "ag-grid-community";
import { renderToString } from "react-dom/server";
import { ClipboardComponent } from "./ClipBoardComponent";

export const handleClipboard = async (params: SendToClipboardParams<any>) => {
  const renderedHtml = renderToString(<ClipboardComponent params={params} />);
  await navigator.clipboard.writeText(renderedHtml);
};

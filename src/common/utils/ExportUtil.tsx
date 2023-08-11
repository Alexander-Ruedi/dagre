import { getPageByNavigation } from "../components/routing/data/PageData";
import { NavigationLinks } from "../components/table/models/TableModel";
import { onRequestError } from "../hooks/useNotificationHandlers";
import { ApiInstance, baseUrl } from "./ApiInstance";

const dataService = new ApiInstance();

export function exportFileByBillingPeriod(table: NavigationLinks, endpointMethod: string, billingPeriodId?: string) {
  if (billingPeriodId) {
    return exportFile(table, endpointMethod, billingPeriodId);
  }
}

export function exportFileByFinancialPeriod(table: NavigationLinks, endpointMethod: string, financialPeriodId?: string) {
  if (financialPeriodId) {
    return exportFile(table, endpointMethod, financialPeriodId);
  }
}

function exportFile(table: NavigationLinks, endpointMethod: string, periodId: string) {
  const currentPage = getPageByNavigation(table);

  return dataService.axios
    .get(baseUrl + "/" + table + (endpointMethod ? "/" + endpointMethod : "") + "?periodId=" + periodId, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "unknown_filename";
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
      }
      downloadFile(response.data, fileName);
    })
    .catch((error: any) => {
      onRequestError("export " + currentPage.singularLabel + " file", error);
      throw error;
    });
}

export const downloadFile = (fileBlob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([fileBlob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${fileName}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  link.style.display = "none";
  window.URL.revokeObjectURL(url);
};

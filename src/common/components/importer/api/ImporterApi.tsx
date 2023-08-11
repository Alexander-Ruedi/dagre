import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { ApiInstance, baseUrl } from "../../../utils/ApiInstance";
import { NavigationLinks } from "../../table/models/TableModel";
import { CommitRequest } from "../models/CommitRequest";
import { Merge } from "../models/Merge";
import { ProposeResponse } from "../models/ProposeResponse";

const dataService = new ApiInstance();

export const getAvailableWorksheets = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return new Observable((subscriber) => {
    dataService.axios
      .post(baseUrl + "/files/info", formData)
      .then((response: AxiosResponse) => {
        subscriber.next(response.data);
      })
      .catch((error) => subscriber.error(error))
      .finally(() => {
        return subscriber.complete();
      });
  });
};

export const getAvailableColumns = (file: File, worksheetIndex: number, headerRow: number) => {
  const requestParameters = {
    worksheetIndex: worksheetIndex,
    initialRowIndex: headerRow,
    fileType: "EXCEL",
  };

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "body",
    new Blob([JSON.stringify(requestParameters)], {
      type: "application/json",
    }),
  );

  return new Observable((subscriber) => {
    dataService.axios
      .post(baseUrl + "/files/columns", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (response: AxiosResponse) => {
          subscriber.next(response.data);
        },
        (error) => subscriber.error(error),
      )
      .finally(() => subscriber.complete());
  });
};

export function proposeImportRequest<T>(file: File, table: NavigationLinks, requestParameters: any): Promise<AxiosResponse<ProposeResponse<T>>> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "body",
    new Blob([JSON.stringify(requestParameters)], {
      type: "application/json",
    }),
  );

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return dataService.axios.post(baseUrl + "/imports/" + table + "/propose", formData, config);
}

export function commitImportRequest<T>(periodId: string, mergeData: Merge<T>[], table: NavigationLinks): Promise<AxiosResponse> {
  const commitRequest: CommitRequest<T> = { periodId: periodId, mergeData: mergeData };
  return dataService.axios.post(baseUrl + "/imports/" + table + "/commit", commitRequest);
}

export function getImportColumns(table: NavigationLinks) {
  return new Observable((subscriber) => {
    dataService.axios
      .get(baseUrl + "/imports/" + table + "/columns")
      .then(
        (response: AxiosResponse) => {
          //here we just return the response
          subscriber.next(response.data);
        },
        (error) => subscriber.error(error),
      )
      .finally(() => subscriber.complete());
  });
}

export const importRequest = (file: File, table: NavigationLinks | string, requestParameters: any): Promise<AxiosResponse<string[]>> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "body",
    new Blob([JSON.stringify(requestParameters)], {
      type: "application/json",
    }),
  );

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return dataService.axios.post(baseUrl + "/imports/" + table, formData, config);
};

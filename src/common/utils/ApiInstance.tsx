import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Observable, zip } from "rxjs";
import { authInterceptor } from "../api/AuthInterceptor";
import { getPageByNavigation } from "../components/routing/data/PageData";
import { NavigationLinks } from "../components/table/models/TableModel";
import { onRequestError } from "../hooks/useNotificationHandlers";

const defaultAxios = axios;
defaultAxios.interceptors.response.use(
  function (response) {
    // status codes within 2xx
    return response;
  },
  function (error) {
    // status codes outside of 2xx
    console.error("Api Error", error);
    return Promise.reject(error);
  },
);

defaultAxios.interceptors.request.use(authInterceptor.intercept);

export class ApiInstance {
  axios: AxiosInstance;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  baseUrl = process.env.REACT_APP_BACKEND_SERVER! + process.env.PUBLIC_URL;
  constructor() {
    this.axios = defaultAxios;
  }
}

const dataService = new ApiInstance();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const baseUrl = process.env.REACT_APP_BACKEND_SERVER! + process.env.PUBLIC_URL;

export function getDataAsObjectFromFinancialPeriod<ObjectType>(table: NavigationLinks, financialPeriodId?: string) {
  return dataService.axios
    .get<ObjectType>(baseUrl + "/" + table + (financialPeriodId ? "?financialPeriodId=" + financialPeriodId : ""))
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function getDataAsObjectsFromFinancialPeriod<ObjectType>(table: NavigationLinks, financialPeriodId?: string) {
  return getDataAsObjectFromFinancialPeriod<ObjectType[]>(table, financialPeriodId);
}

export function getDataAsObjectFromBillingPeriod<ObjectType>(table: NavigationLinks, billingPeriodId?: string) {
  return dataService.axios
    .get<ObjectType>(baseUrl + "/" + table + (billingPeriodId ? "?billingPeriodId=" + billingPeriodId : ""))
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function getDataAsObjectsFromBillingPeriod<ObjectType>(table: NavigationLinks, billingPeriodId?: string) {
  return getDataAsObjectFromBillingPeriod<ObjectType[]>(table, billingPeriodId);
}

export function getDataById(table: NavigationLinks, dataId: string) {
  const currentPage = getPageByNavigation(table);
  return new Observable((subscriber) => {
    dataService.axios
      .get(baseUrl + "/" + table + "/" + dataId)
      .then(
        (response: AxiosResponse) => {
          subscriber.next(response.data);
        },
        (error) => {
          onRequestError("load " + currentPage.singularLabel, error);
          subscriber.error(error);
        },
      )
      .finally(() => subscriber.complete());
  });
}

export function updateData(table: NavigationLinks, id: string, payload: any) {
  const currentPage = getPageByNavigation(table);
  return new Observable((subscriber) => {
    dataService.axios
      .put(baseUrl + "/" + table + "/" + id, payload)
      .then(
        (response: AxiosResponse) => {
          subscriber.next(response.data);
        },
        (error) => {
          onRequestError("update " + currentPage.singularLabel, error);
          subscriber.error(error);
        },
      )
      .finally(() => subscriber.complete());
  });
}
export function updateDataWithoutId(table: NavigationLinks, payload: any) {
  const currentPage = getPageByNavigation(table);
  return new Observable((subscriber) => {
    dataService.axios
      .put(baseUrl + "/" + table, payload)
      .then(
        (response: AxiosResponse) => {
          subscriber.next(response.data);
        },
        (error) => {
          onRequestError("update " + currentPage.singularLabel, error);
          subscriber.error(error);
        },
      )
      .finally(() => subscriber.complete());
  });
}

export function createData(table: NavigationLinks, payload: any) {
  const currentPage = getPageByNavigation(table);
  return new Observable((subscriber) => {
    dataService.axios
      .post(baseUrl + "/" + table, payload)
      .then(
        (response: AxiosResponse) => {
          subscriber.next(response.data);
        },
        (error) => {
          onRequestError("create " + currentPage.singularLabel, error);
          subscriber.error(error);
        },
      )
      .finally(() => subscriber.complete());
  });
}
export function deleteData(table: NavigationLinks, id: string, isBatch?: boolean) {
  const currentPage = getPageByNavigation(table);
  return new Observable((subscriber) => {
    dataService.axios
      .delete(baseUrl + "/" + table + "/" + id)
      .then(
        (response: AxiosResponse) => {
          subscriber.next(response.data);
        },
        (error) => {
          !isBatch && onRequestError("delete " + currentPage.singularLabel, error);
          subscriber.error(error);
        },
      )
      .finally(() => subscriber.complete());
  });
}

export function batchDelete(table: NavigationLinks, idList: Array<string>) {
  const observables = idList.map((item) => deleteData(table, item, true));
  return zip(...observables);
}

export function batchDeleteIds(table: NavigationLinks, ids: Array<string>) {
  const currentPage = getPageByNavigation(table);
  return new Observable((subscriber) => {
    dataService.axios
      .post(baseUrl + "/" + table + "/delete", ids)
      .then(
        (response: AxiosResponse) => {
          subscriber.next(response.data);
        },
        (error) => {
          onRequestError("batch delete " + currentPage.singularLabel, error);
          subscriber.error(error);
        },
      )
      .finally(() => subscriber.complete());
  });
}

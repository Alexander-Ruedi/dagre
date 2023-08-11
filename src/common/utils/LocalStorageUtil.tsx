export enum LocalStorageKeys {
  SELECTED_FINANCIAL_PERIOD = "SELECTED_FINANCIAL_PERIOD",
  SELECTED_LOCALE_FORMAT = "SELECTED_LOCALE_FORMAT",
}

export const setFinancialPeriodToLocalStorage = (newId: string) => window.localStorage.setItem(LocalStorageKeys.SELECTED_FINANCIAL_PERIOD, newId);
export const getFinancialPeriodFromLocalStorage = () => window.localStorage.getItem(LocalStorageKeys.SELECTED_FINANCIAL_PERIOD);

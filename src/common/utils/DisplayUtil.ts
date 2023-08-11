import { Company } from "../models/CompanyModel";
import { CostCenter } from "../models/CostCenterModel";
import { CostElement } from "../models/CostElementModel";
import { FinancialPeriod, getDisplayedNameForFinancialPeriodType } from "../models/FinancialPeriodModel";
import { WbsCode } from "../models/WbsCodeModel";

export const combineCodeAndName = (code: string, name?: string | null) => {
  if (name) {
    return `${code}-${name}`;
  } else {
    return code;
  }
};
export const getCompanyCodeAndName = (company?: Company) => (!company ? "-" : combineCodeAndName(company.code, company.longName));
export const getCostCenterCodeAndName = (costCenter?: CostCenter) => (!costCenter ? "-" : combineCodeAndName(costCenter.code, costCenter.name));
export const getCostElementCodeAndName = (costElement?: CostElement) =>
  !costElement ? "-" : combineCodeAndName(costElement.account, costElement.name);
export const getWbsCodeAndName = (wbsCode?: WbsCode) => (!wbsCode ? "-" : combineCodeAndName(wbsCode.code, wbsCode.name));
export const getCostElementAccountAndName = (costElement?: CostElement) =>
  !costElement ? "-" : combineCodeAndName(costElement.account, costElement.name);

export const getFinancialPeriodLabel = (financialPeriod: FinancialPeriod) =>
  `${getDisplayedNameForFinancialPeriodType(financialPeriod.type)} ${financialPeriod.order} - ${financialPeriod.name}`;

export const formatLabel = (code: string | null | undefined, name: string | null | undefined) => {
  return `${code ?? ""}${code && name ? "-" : ""}${name ?? ""}`;
};

export const ellipsisOverflow = (text: string, length: number, ellipsis = "\u2026") => text.slice(0, length) + (text.length > length ? ellipsis : "");
export const overflowFormatter = (text: string | undefined | null) => (text ? ellipsisOverflow(text, 75) : "");

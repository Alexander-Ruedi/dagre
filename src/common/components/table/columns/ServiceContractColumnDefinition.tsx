import { MyColDef } from "../../../models/TableModel";
import { getCompanyCodeAndName, overflowFormatter } from "../../../utils/DisplayUtil";
import { contractProviderCompanyColumnDefinition, ContractProviderCompanyColumns } from "./ContractProviderCompanyColumnDefinition";
import { LocaleFormat } from "../../../store/slices/SettingsSliceModel";
import { useMemo } from "react";
import { Service, ServiceProps } from "../../../models/ServiceModel";
import { FinancialPeriodColumns } from "./FinancialPeriodColumnDefinition";
import { FinancialPeriodBucketColumns } from "./FinancialPeriodBucketColumnDefinition";
import { ProviderCompanyColumns } from "./ProviderCompanyColumnDefinition";
import { ContractColumns } from "./ContractColumnDefinition";

export const getServiceCompanyCountryColumnDefinition: (
  locale: LocaleFormat,
) => MyColDef<
  Service,
  | ServiceProps
  | ContractColumns
  | ContractProviderCompanyColumns
  | FinancialPeriodColumns
  | FinancialPeriodBucketColumns
  | ProviderCompanyColumns
  | "financialPeriod.name"
  | "actions"
  | "checkbox"
>[] = (locale) =>
  useMemo(
    () => [
      {
        field: "contract.providerCompanyId",
        headerName: "Contract provider",
        cellClass: "unformattedString",
        valueGetter: (params) => (params.data?.contract?.providerCompany ? getCompanyCodeAndName(params.data?.contract?.providerCompany) : ""),
        hide: true,
      },
      ...contractProviderCompanyColumnDefinition,
      {
        field: "contract.effectiveFrom",
        headerName: "Contract effective from",
        cellClass: locale === LocaleFormat.DE ? "deDate" : "usDate",
        hide: true,
      },
      {
        field: "contract.effectiveTo",
        headerName: "Contract effective to",
        cellClass: locale === LocaleFormat.DE ? "deDate" : "usDate",
        hide: true,
      },
      {
        field: "contract.internalContractId",
        headerName: "Contract internal contract id",
        cellClass: "unformattedString",
        hide: true,
      },
      {
        field: "contract.type",
        headerName: "Contract type",
        cellClass: "unformattedString",
        hide: true,
      },
      {
        field: "contract.link",
        headerName: "Link to contract",
        cellClass: "unformattedString",
        hide: true,
      },
      {
        field: "contract.comment",
        headerName: "Contract comment",
        cellClass: "unformattedString",
        valueFormatter: (params) => overflowFormatter(params.data?.contract?.comment),
        hide: true,
      },
    ],
    [locale],
  );

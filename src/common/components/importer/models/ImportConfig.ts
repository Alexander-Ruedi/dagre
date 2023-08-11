import { MyColDef } from "../../../models/TableModel";
import { NavigationLinks } from "../../table/models/TableModel";
import { Merge } from "./Merge";

export interface ImportConfig<Data, ColumnHeaders extends string> {
  worksheetNames?: Array<string>;
  columnMappings: any;
  hideFinancialPeriod: boolean;
  periodType: ImportPeriodType;
  table: NavigationLinks;
  previewColumns: MyColDef<Merge<Data>, ColumnHeaders>[];
}

export enum ImportPeriodType {
  FINANCIAL_PERIOD = "FINANCIAL_PERIOD",
  BILLING_PERIOD = "BILLING_PERIOD",
}

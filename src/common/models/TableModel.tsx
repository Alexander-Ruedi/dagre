import { ColDef } from "ag-grid-community";

/**
 * Restricted version of Ag Grid's `ColDef`.
 * Restrict the type of `field` to `FieldType` (e.g. `type FieldType = "id" | "code" | "name"`),
 * so that if we change any property name, e.g. from `code` to `companyCode`, we will get a type checking error.
 */
export interface MyColDef<TData, FieldType extends string> extends ColDef<TData> {
  field: FieldType;
}

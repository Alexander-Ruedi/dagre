import { ChangeModel } from "./ChangeModel";
import { FinancialPeriod } from "./FinancialPeriodModel";

export interface Country extends ChangeModel {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
}

export type CountryProps = keyof Country;

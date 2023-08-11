import { ChangeModel } from "./ChangeModel";
import { Country } from "./CountryModel";
import { FinancialPeriod } from "./FinancialPeriodModel";
import { RelevanceType } from "./common/RelevanceTypeModel";

export interface BatchEditCompany {
  currency?: string;
  segment?: string | null;
  comment?: string | null;
  businessUnit?: string | null;
}
export interface Company extends ChangeModel {
  id: string;
  financialPeriodId: string;
  code: string;
  shortName?: string | null;
  longName: string;
  segment?: string | null;
  businessUnit?: string | null;
  debitorNr?: string | null;
  city?: string | null;
  companyRegion?: string | null;
  currency: string;
  vatNr?: string | null;
  comment?: string | null;
  countryId: string;
  financialPeriod?: FinancialPeriod;
  relevance: RelevanceType;
  country?: Country;
}
export type CompanyProps = keyof Company;

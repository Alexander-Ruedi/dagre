import { ChangeModel } from "./ChangeModel";
import { Company } from "./CompanyModel";
import { FinancialPeriod } from "./FinancialPeriodModel";
import { ServiceType } from "./common/ServiceTypeModel";
import { Contract } from "./ContractModel";

export interface BatchEditService {
  contractId?: string | null;
  description?: string | null;
  benefit?: string | null;
  materialNr?: string | null;
  materialName?: string | null;
}

export interface Service extends ChangeModel {
  id: string;
  company?: Company;
  contractId?: string | null;
  contract?: Contract;
  companyId: string;
  financialPeriodId: string;
  name: string;
  description?: string | null;
  benefit?: string | null;
  financialPeriod?: FinancialPeriod;
  type: ServiceType;
  materialNr?: string | null;
  materialName?: string | null;
}
export type ServiceProps = keyof Service;

import { ChangeModel } from "./ChangeModel";
import { FinancialPeriod } from "./FinancialPeriodModel";
import { Service } from "./ServiceModel";

export enum MarkUpType {
  GENERAL = "GENERAL",
  SERVICE_SPECIFIC = "SERVICE_SPECIFIC",
}

export const getDisplayedNameForMarkUpType = (markUpType: MarkUpType) => {
  switch (markUpType) {
    case MarkUpType.GENERAL:
      return "General";
    case MarkUpType.SERVICE_SPECIFIC:
      return "Service specific";
    default: {
      const _exhaustiveCheck: never = markUpType;
      return _exhaustiveCheck;
    }
  }
};

export const markUpTypeDropdownItems = (Object.keys(MarkUpType) as MarkUpType[]).map((key) => {
  return { id: key, label: getDisplayedNameForMarkUpType(key) };
});

export interface MarkUp extends ChangeModel {
  id: string;
  financialPeriodId: string;
  financialPeriod?: FinancialPeriod;
  type: MarkUpType;
  serviceId?: string | null;
  service?: Service;
  passThroughMarkup?: number | null;
  valueAddMarkup?: number | null;
  comment?: string | null;
}
export type MarkUpProps = keyof MarkUp;

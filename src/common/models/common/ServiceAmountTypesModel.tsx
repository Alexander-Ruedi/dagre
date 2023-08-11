export enum ServiceAmountTypes {
  "ABSOLUTE" = "ABSOLUTE",
  "PERCENTAGE" = "PERCENTAGE",
}

export const getDisplayedNameForServiceAmountType = (serviceAmountType: ServiceAmountTypes, useAbbreviation?: boolean) => {
  switch (serviceAmountType) {
    case ServiceAmountTypes.ABSOLUTE:
      return useAbbreviation ? "Abs." : "Absolute";
    case ServiceAmountTypes.PERCENTAGE:
      return useAbbreviation ? "%" : "Percentage";
    default: {
      const _exhaustiveCheck: never = serviceAmountType;
      return _exhaustiveCheck;
    }
  }
};

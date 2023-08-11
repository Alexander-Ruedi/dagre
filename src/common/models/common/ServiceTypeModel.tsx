export enum SingleServiceType {
  INDIRECT = "INDIRECT",
  DIRECT = "DIRECT",
}

export enum ServiceType {
  INDIRECT = "INDIRECT",
  DIRECT = "DIRECT",
  MIXED = "MIXED",
}
export const getDisplayedNameForServiceType = (serviceType: ServiceType) => {
  switch (serviceType) {
    case ServiceType.INDIRECT:
      return "Indirect";
    case ServiceType.DIRECT:
      return "Direct";
    case ServiceType.MIXED:
      return "Mixed";
    default: {
      const _exhaustiveCheck: never = serviceType;
      return _exhaustiveCheck;
    }
  }
};

export const serviceTypeDropdownItems = (Object.keys(ServiceType) as ServiceType[]).map((key) => {
  return { id: key, label: getDisplayedNameForServiceType(key) };
});
export const singleServiceTypeDropdownItems = (Object.keys(SingleServiceType) as ServiceType[]).map((key) => {
  return { id: key, label: getDisplayedNameForServiceType(key) };
});

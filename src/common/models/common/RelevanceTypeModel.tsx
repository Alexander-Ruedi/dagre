export enum SingleRelevanceType {
  RELEVANT = "RELEVANT",
  IRRELEVANT = "IRRELEVANT",
}

export enum RelevanceType {
  RELEVANT = "RELEVANT",
  IRRELEVANT = "IRRELEVANT",
  MIXED = "MIXED",
}

export const getDisplayedNameForRelevanceType = (relevanceType: RelevanceType) => {
  switch (relevanceType) {
    case RelevanceType.RELEVANT:
      return "Relevant";
    case RelevanceType.IRRELEVANT:
      return "Irrelevant";
    case RelevanceType.MIXED:
      return "Mixed";
    default: {
      const _exhaustiveCheck: never = relevanceType;
      return _exhaustiveCheck;
    }
  }
};

export const getDisplayedNameForMultipleRelevanceTypes = (relevanceTypeArray?: Array<RelevanceType>) => {
  const isRelevant = relevanceTypeArray && relevanceTypeArray.indexOf(RelevanceType.RELEVANT) !== -1;
  const isIrrelevant = relevanceTypeArray && relevanceTypeArray.indexOf(RelevanceType.IRRELEVANT) !== -1;

  if (isRelevant && isIrrelevant) {
    return "Mixed";
  } else if (isRelevant) {
    return "Relevant";
  } else if (isIrrelevant) {
    return "Irrelevant";
  } else {
    return "";
  }
};

export const relevanceTypeDropdownItems = (Object.keys(RelevanceType) as RelevanceType[]).map((key) => {
  return { id: key, label: getDisplayedNameForRelevanceType(key) };
});

export const singleRelevanceTypeDropdownItems = (Object.keys(SingleRelevanceType) as RelevanceType[]).map((key) => {
  return { id: key, label: getDisplayedNameForRelevanceType(key) };
});

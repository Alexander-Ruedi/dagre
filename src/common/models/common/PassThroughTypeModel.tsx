export enum PassThroughState {
  PASS_THROUGH = "PASS_THROUGH",
  VALUE_ADD = "VALUE_ADD",
}

export const getDisplayedNameForPassThrough = (passThroughDataType: boolean) => {
  switch (passThroughDataType) {
    case true:
      return "Pass-through";
    case false:
      return "Value-added";
  }
};

export const getDisplayedNameForMultiplePassThroughStates = (passThroughStatesArray?: Array<PassThroughState>) => {
  const isPassthrough = passThroughStatesArray && passThroughStatesArray.indexOf(PassThroughState.PASS_THROUGH) !== -1;
  const isValueAdded = passThroughStatesArray && passThroughStatesArray.indexOf(PassThroughState.VALUE_ADD) !== -1;

  if (isPassthrough && isValueAdded) {
    return "Mixed";
  } else if (isPassthrough) {
    return "Pass-through";
  } else if (isValueAdded) {
    return "Value-added";
  } else {
    return "";
  }
};

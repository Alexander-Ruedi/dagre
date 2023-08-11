import { NumericFormatProps } from "react-number-format/types/types";
import { store } from "../store/Store";
import { LocaleFormat } from "../store/slices/SettingsSliceModel";

export const getDefaultNumericFormatProps = () => {
  const currentFormat = store.getState().settings.format;
  const decimalSeparator = currentFormat === LocaleFormat.DE ? "," : ".";
  const thousandSeparator = currentFormat === LocaleFormat.DE ? "." : ",";
  const newProps: NumericFormatProps<any> = {
    thousandSeparator,
    decimalSeparator,
    decimalScale: 2,
  };
  return newProps;
};

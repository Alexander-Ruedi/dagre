import { ExcelStyle } from "ag-grid-community";

export enum ExcelFormats {
  Text = "@",
  IntNumber = "0",
  PercentageNumber = "0.00 %",
  DecimalNumber = "0.00",
  CurrencyDE = "#,##0.00 [$€-de-DE]",
  CurrencyEN = "[$€-en-US]#,##0.00",
  DateTimeDE = "dd.mm.yyyy hh:mm:ss",
  DateTimeEN = "mm/dd/yyyy hh:mm:ss",
  DateDE = "dd.mm.yyyy",
  DateEN = "mm/dd/yyyy",
}

export const defaultExcelStyles: ExcelStyle[] = [
  {
    id: "header",
    font: {
      bold: true,
    },
  },
  {
    id: "alignRight",
    alignment: {
      horizontal: "Right",
    },
  },
  {
    id: "intNumber",
    dataType: "Number",
    numberFormat: {
      format: ExcelFormats.IntNumber,
    },
  },
  {
    id: "decimalNumber",
    dataType: "Number",
    numberFormat: {
      format: ExcelFormats.DecimalNumber,
    },
  },
  {
    id: "percentageNumber",
    dataType: "Number",
    numberFormat: {
      format: ExcelFormats.PercentageNumber,
    },
  },
  {
    id: "deCurrency",
    dataType: "Number",
    numberFormat: {
      format: ExcelFormats.CurrencyDE,
    },
    alignment: {
      horizontal: "Right",
    },
  },
  {
    id: "usCurrency",
    dataType: "Number",
    numberFormat: {
      format: ExcelFormats.CurrencyEN,
    },
    alignment: {
      horizontal: "Right",
    },
  },
  {
    id: "unformattedString",
    dataType: "String",
    numberFormat: {
      format: ExcelFormats.Text,
    },
  },
  {
    id: "usDateTime",
    dataType: "DateTime",
    numberFormat: {
      format: ExcelFormats.DateTimeEN,
    },
  },
  {
    id: "deDateTime",
    dataType: "DateTime",
    numberFormat: {
      format: ExcelFormats.DateTimeDE,
    },
  },
  {
    id: "usDate",
    dataType: "DateTime",
    numberFormat: {
      format: ExcelFormats.DateEN,
    },
  },
  {
    id: "deDate",
    dataType: "DateTime",
    numberFormat: {
      format: ExcelFormats.DateDE,
    },
  },
];

export const excelCSSStyle = defaultExcelStyles
  .map((excelStyle) => {
    const excelCSSClass = excelStyle.id;
    const excelFormat = excelStyle.numberFormat?.format;
    const excelCSS = excelFormat ? `mso-number-format:"${excelFormat}"` : "";
    if (excelCSSClass && excelFormat) {
      return `.${excelCSSClass}{${excelCSS}}`;
    }
  })
  .join(" ");

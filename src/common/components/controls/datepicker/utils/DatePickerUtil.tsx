export const addLeadingZero = (num: number | string, size: number) => {
  let str = num.toString();
  while (str.length < size) str = "0" + str;
  return str;
};

export const getYear = (value?: string | null) => value?.split("-")[0] ?? "";
export const getMonth = (value?: string | null) => value?.split("-")[1] ?? "";
export const getDay = (value?: string | null) => value?.split("-")[2] ?? "";

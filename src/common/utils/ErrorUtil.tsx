import { AxiosError } from "axios";

export const getErrorMessage = (e: AxiosError) => {
  try {
    const { message } = e.response?.data as { message: string };
    return message ?? e.message;
  } catch {
    return e.message;
  }
};

import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError | any) => {
  return Promise.reject(error);
};

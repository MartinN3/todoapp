import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { AXIOS_INSTANCE } from '../constants/axiosInstance';

export const customAxiosInstance = <T>(
  config: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );

  // @ts-expect-error axios tanstack inconsistency in type, would have to dig
  promise.cancel = () => {
    source.cancel('Query was cancelled Tanstack Query');
  };

  return promise;
};

export default customAxiosInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}

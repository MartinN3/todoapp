import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: 'https://dummyjson.com',
});

export const customAxiosInstance = <T>(
  config: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );

  // @ts-expect-error axios instance wrong type
  promise.cancel = () => {
    source.cancel('Query was cancelled Tanstack Query');
  };

  return promise;
};

export default customAxiosInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}

import Axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = process.env.BASE_URL
export const AXIOS_INSTANCE = Axios.create({ baseURL: BASE_URL })

const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    }
  }

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

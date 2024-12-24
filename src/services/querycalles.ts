import axios, { AxiosResponse } from "axios";
import qs from "query-string";
import { ErrorResponse, RequestOptions } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const client = axios.create({
  baseURL: BASE_URL,
});

// Add type for success and error handlers
const onSuccess = (response: AxiosResponse) => response;
const onError = (error: ErrorResponse) => {
  // Optionally catch errors and add additional logging here
  return Promise.reject(error);
};

export const request = (options: RequestOptions): Promise<AxiosResponse> => {
  client.defaults.headers.common.Authorization = `Bearer token${1}`;
  return client(options).then(onSuccess).catch(onError);
};

// GET with Axios
export const axiosGet = async <T>(
  url: string,
  queryObj?: Record<string, any>
): Promise<AxiosResponse<T>> => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const query = queryObj ? qs.stringify(queryObj) : "";
  return await client.get<T>(`${url}?${query}`, config);
};

// POST with Axios
export const axiosPostRequest = async <T>(
  url: string,
  queryObj?: Record<string, any>,
  bodyObj?: any
): Promise<AxiosResponse<T>> => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        bodyObj?.token || localStorage.getItem("token")
      }`,
    },
  };
  const query = queryObj ? qs.stringify(queryObj) : "";
  return await client.post<T>(
    `${url}${query ? `?${query}` : ""}`,
    bodyObj,
    config
  );
};

// PUT with Axios
export const axiosPutRequest = async <T>(
  url: string,
  queryObj?: Record<string, any>,
  bodyObj?: any
): Promise<AxiosResponse<T>> => {
  const config = {
    headers: {
      Authorization: `Bearer ${bodyObj.token || localStorage.getItem("token")}`,
    },
  };
  const query = queryObj ? qs.stringify(queryObj) : "";
  return await client.put<T>(`${url}?${query}`, bodyObj, config);
};

// DELETE with Axios
export const axiosDelete = async (url: string): Promise<AxiosResponse> => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await client.delete(url, config);
};

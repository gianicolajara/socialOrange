import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const getFetch = ({
  pathUrl = "",
  withCredentials = false,
}): Promise<AxiosResponse> => {
  return axios.get(pathUrl, {
    withCredentials,
    headers: {
      ...defaultHeaders,
    },
  });
};

export const postFetch = ({
  pathUrl = "",
  withCredentials = false,
  data = {},
  headers = {},
}): Promise<AxiosResponse> => {
  return axios.post(pathUrl, data, {
    withCredentials,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });
};

export const putFetch = ({
  pathUrl = "",
  withCredentials = false,
  data = {},
}): Promise<AxiosResponse> => {
  return axios.put(pathUrl, data, {
    withCredentials,
    headers: {
      ...defaultHeaders,
    },
  });
};

export const deleteFetch = ({
  pathUrl = "",
  withCredentials = false,
}): Promise<AxiosResponse> => {
  return axios.delete(pathUrl, {
    withCredentials,
    headers: {
      ...defaultHeaders,
    },
  });
};

import axios, { AxiosError, AxiosResponse } from 'axios';

const HOST = 'http://127.0.0.1';
const PORT = 5000;

function transformResponse(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
}

function transformErr(err: AxiosError) {
  if (err) {
    const { response } = err;
    if (response && response.data) {
      return Promise.reject({ error: err, error_msg: response.data });
    }
  }
  return Promise.reject({ error: err });
}

const fetchMaker = axios.create({
  baseURL: `${HOST}:${PORT}`,
  withCredentials: true,
  responseType: 'json',
});

fetchMaker.interceptors.response.use(transformResponse, transformErr);

export { fetchMaker };

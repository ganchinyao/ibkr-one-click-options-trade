import axios, { AxiosResponse } from 'axios';

const HOST = 'http://127.0.0.1';
const PORT = 5000;

function transformResponse(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
}

const fetchMaker = axios.create({
  baseURL: `${HOST}:${PORT}`,
  withCredentials: true,
  responseType: 'json',
});

fetchMaker.interceptors.response.use(transformResponse);

export { fetchMaker };

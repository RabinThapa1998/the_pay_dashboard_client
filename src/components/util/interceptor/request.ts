import axios from 'axios';
import { BASE_URL } from '~/config';

const client = axios.create({ baseURL: BASE_URL });

export const request = ({ ...options }) => {
  // client.defaults.headers.common.Authorization = `Bearer ${Cookies.get('accessToken')}`;
  const onSuccess = (response: any) => {
    return response.data;
  };
  const onError = (error: any) => {
    return error.response.data;
  };
  return client(options).then(onSuccess).catch(onError);
};

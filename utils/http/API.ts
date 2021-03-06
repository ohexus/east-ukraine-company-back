import axios from 'axios';
import config from 'config';

export const dataAPI = axios.create({
  baseURL: `${process.env.DATA_API_URI || config.get('DATA_API_URI')}/api/`,
  responseType: 'json',
});

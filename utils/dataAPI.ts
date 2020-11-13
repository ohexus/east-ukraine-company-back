import axios from 'axios';
import config from 'config';

const dataAPI = axios.create({
  baseURL: `${process.env.DATA_API || config.get('DATA_API')}/api/`,
  responseType: 'json',
});

export default dataAPI;

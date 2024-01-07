import Axios from 'axios';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: 'https://dummyjson.com',
});

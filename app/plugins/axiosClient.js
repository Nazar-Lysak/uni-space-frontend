import axios from 'axios';

const AXIOS_CONFIG = {
  withCredentials: false,
}

export const axiosClient = axios.create(AXIOS_CONFIG)
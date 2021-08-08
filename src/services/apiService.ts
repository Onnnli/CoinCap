import axios from 'axios';

const API_URL = 'https://api.coincap.io/v2';

export const apiService = {
  getAssets: (limit: number) => axios.get(`${API_URL}/assets?limit=${limit}`),
  getCryptoInfo: (id: string) => axios.get(`${API_URL}/assets/${id}`),
  getCoinHistory: (id: string, interval: string) =>
    axios.get(`${API_URL}/assets/${id}/history?interval=${interval}`),
};

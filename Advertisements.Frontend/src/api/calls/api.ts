import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_ADVERT_API_URL}`;

const queryAsync = async <TRequest>(url: string, query?: TRequest) => {
  var response = await axios.get(url, {
    withCredentials: true,
    params: query,
  });

  return response;
};

const endpoints = {
  query: {
    advert: {
      types: `${apiUrl}/type`,
      areas: `${apiUrl}/area`,
    },
  },
};

const api = {
  queryAsync,
  endpoints,
};

export default api;

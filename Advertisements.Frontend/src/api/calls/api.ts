import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_ADVERT_API_URL}`;

type queryProps<TRequest> = {
  url: string;
  query?: TRequest;
};

const queryAsync = async <TRequest>({ url, query }: queryProps<TRequest>) => {
  console.log('query', query);
  var response = await axios.get(url, {
    withCredentials: true,
    params: query,
  });

  return response;
};

type mutateProps<TRequest> = {
  url: string;
  body: TRequest;
  httpMethod: string;
};

const mutateAsync = async <TRequest>({
  url,
  body,
  httpMethod,
}: mutateProps<TRequest>) => {
  var response = await axios(url, {
    method: httpMethod,
    data: body,
  });
};

const endpoints = {
  query: {
    advert: {
      types: `${apiUrl}/type`,
      areas: `${apiUrl}/area`,
      planes: `${apiUrl}/plane`,
    },
  },
  mutate: {
    advert: {
      object: `${apiUrl}/object`,
    },
  },
};

const api = {
  queryAsync,
  mutateAsync,
  endpoints,
};

export default api;

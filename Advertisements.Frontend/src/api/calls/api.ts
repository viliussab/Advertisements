import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_ADVERT_API_URL}`;

type queryProps<TRequest> = {
  url: string;
  query?: TRequest;
};

const queryAsync = async <TRequest>({ url, query }: queryProps<TRequest>) => {
  const response = await axios.get(url, {
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
  const response = await axios(url, {
    method: httpMethod,
    data: body,
  });
};

const endpoints = {
  common: {
    advert: {
      types: `${apiUrl}/type`,
      areas: `${apiUrl}/area`,
      planes: `${apiUrl}/plane`,
      object: `${apiUrl}/object`,
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

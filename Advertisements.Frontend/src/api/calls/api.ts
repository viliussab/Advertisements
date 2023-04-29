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
    withCredentials: true,
    method: httpMethod,
    data: body,
  });
};

const endpoints = {
  common: {
    advert: {
      type: `${apiUrl}/type`,
      area: `${apiUrl}/area`,
      plane: `${apiUrl}/plane`,
      weekly_summary: `${apiUrl}/plane/summary`,
      object: `${apiUrl}/object`,
    },
    campaigns: {
      campaign: `${apiUrl}/campaign`,
      customer: `${apiUrl}/customer`,
    },
  },
  auth: {
    me: `${apiUrl}/me`,
    login: `${apiUrl}/login`,
    logout: `${apiUrl}/logout`,
  },
  campaign: {
    options: `${apiUrl}/campaign/options`,
    download_campaign_offer: `${apiUrl}/campaign/downloadOffer`,
    buildCampaignPlanesEndpoint: (id: string) =>
      `${apiUrl}/campaign/${id}/planes`,
    buildUpsertCampaignPlaneEndpoint: (campaignId: string, planeId: string) =>
      `${apiUrl}/campaign/${campaignId}/plane/${planeId}`,
    buildCampaignConfirmEndpoint: (id: string) =>
      `${apiUrl}/campaign/${id}/confirm`,
    summary: `${apiUrl}/campaign/summary`,
  },
};

const api = {
  queryAsync,
  mutateAsync,
  endpoints,
};

export default api;

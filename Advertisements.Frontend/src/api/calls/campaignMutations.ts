import { CampaignCreateUpdate } from '../commands/schema.createUpdateCampaign';
import api from './api';

const createCampaignAsync = async (values: CampaignCreateUpdate) => {
  const response = await api.mutateAsync({
    url: api.endpoints.common.campaigns.campaign,
    body: values,
    httpMethod: 'post',
  });

  return response;
};

type updateCampaignAsyncProps = {
  id: string;
  values: CampaignCreateUpdate;
};

const updateCampaignAsync = async ({
  id,
  values,
}: updateCampaignAsyncProps) => {
  const response = await api.mutateAsync({
    url: `${api.endpoints.common.campaigns.campaign}/${id}`,
    body: values,
    httpMethod: 'put',
  });

  return response;
};

const campaignMutations = {
  campaignCreate: {
    fn: createCampaignAsync,
    key: 'campaign_create',
  },
  campaignUpdate: {
    fn: updateCampaignAsync,
    key: 'campaign_update',
  },
};

export default campaignMutations;

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

const campaignMutations = {
  campaignCreate: {
    fn: createCampaignAsync,
    key: 'campaign_create',
  },
};

export default campaignMutations;

import { CampaignCreateUpdate } from '../commands/schema.createUpdateCampaign';
import { CustomerCreateUpdate } from '../commands/schema.createUpdateCustomer';
import { UpdateCampaignPlane } from '../commands/schema.updateCampaignPlane';
import CampaignPlaneUpdate from '../commands/type.CampaignPlaneUpdate';
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

type updateCampaignPlanesAsyncProps = {
  id: string;
  campaignPlanes: CampaignPlaneUpdate[];
};

const updateCampaignPlanesAsync = async ({
  id,
  campaignPlanes,
}: updateCampaignPlanesAsyncProps) => {
  const response = await api.mutateAsync({
    url: api.endpoints.campaign.buildCampaignPlanesEndpoint(id),
    body: { campaignPlanes },
    httpMethod: 'patch',
  });

  return response;
};

const upsertCampaignPlaneAsync = async (values: UpdateCampaignPlane) => {
  const response = await api.mutateAsync({
    url: api.endpoints.campaign.buildUpsertCampaignPlaneEndpoint(
      values.campaignId,
      values.planeId,
    ),
    body: values,
    httpMethod: 'patch',
  });

  return response;
};

const confirmCampaignAsync = async (id: string) => {
  const response = await api.mutateAsync({
    url: api.endpoints.campaign.buildCampaignConfirmEndpoint(id),
    body: undefined,
    httpMethod: 'patch',
  });

  return response;
};

const createCustomerAsync = async (values: CustomerCreateUpdate) => {
  const response = await api.mutateAsync({
    url: api.endpoints.common.campaigns.customer,
    body: values,
    httpMethod: 'post',
  });

  return response;
};

type UpdateCustomerProps = {
  id: string;
  values: CustomerCreateUpdate;
};

const updateCustomerAsync = async ({ id, values }: UpdateCustomerProps) => {
  const response = await api.mutateAsync({
    url: `${api.endpoints.common.campaigns.customer}/${id}`,
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
  campaignPlanesUpdate: {
    fn: updateCampaignPlanesAsync,
    key: 'campaign_planes_update',
  },
  campaignPlaneUpsert: {
    fn: upsertCampaignPlaneAsync,
    key: 'campaign_plane_update',
  },
  campaignConfirm: {
    fn: confirmCampaignAsync,
    key: 'campaign_confirm',
  },
  createCustomer: {
    fn: createCustomerAsync,
    key: 'customer_create',
  },
  updateCustomer: {
    fn: updateCustomerAsync,
    key: 'customer_update',
  },
};

export default campaignMutations;

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import campaignMutations from '../../../api/calls/campaignMutations';
import campaignQueries from '../../../api/calls/campaignQueries';
import {
  CampaignCreateUpdate,
  CampaignCreateUpdateSchema,
} from '../../../api/commands/schema.createUpdateCampaign';
import CampaignCreateUpdateFields from '../../../components/private/campaign/CampaignCreateUpdateFields';
import CampaignOrderDocumentPreview from '../../../components/private/campaign/CampaignOrderDocumentPreview';
import Form from '../../../components/public/Form';
import constants from '../../../config/constants';
import dateFns from '../../../config/imports/dateFns';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';
import dateFunctions from '../../../functions/dateFunctions';

function CampaignUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const campaignQuery = useQuery({
    queryKey: campaignQueries.campaign.key,
    queryFn: () => campaignQueries.campaign.fn(id as string),
  });

  const campaign = campaignQuery.data;

  const form = useForm<CampaignCreateUpdate>({
    resolver: zodResolver(CampaignCreateUpdateSchema),
    values: campaign
      ? {
          ...campaign,
          start: new Date(campaign.start),
          end: new Date(campaign.end),
        }
      : undefined,
  });

  const start = form.watch('start');

  const onCreateSuccess = () => {
    toast.success('Kampanija sukurta');
    navigate(website_paths.campaigns.main);
  };

  const campaignCreateCommand = useMutation({
    mutationKey: campaignMutations.campaignCreate.key,
    mutationFn: campaignMutations.campaignCreate.fn,
    onSuccess: onCreateSuccess,
  });

  const customersQuery = useQuery({
    queryKey: campaignQueries.customers.key,
    queryFn: campaignQueries.customers.fn,
  });

  if (customersQuery.isLoading && campaignQuery.isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex justify-center">
      <Mui.Paper elevation={4} className="m-4 bg-gray-50 p-4">
        <div className="flex gap-4">
          <div>
            <Form form={form} onSubmit={campaignCreateCommand.mutateAsync}>
              <div className="flex justify-center">
                <div className="w-64 space-y-3 pt-0">
                  <CampaignCreateUpdateFields
                    update
                    form={form}
                    customers={customersQuery.data || []}
                    isSubmitting={campaignCreateCommand.isLoading}
                    submitText="Kurti naują"
                  />
                </div>
              </div>
            </Form>
          </div>
          <div>
            {start && (
              <CampaignOrderDocumentPreview
                form={form}
                customers={customersQuery.data || []}
              />
            )}
          </div>
        </div>
      </Mui.Paper>
    </div>
  );
}

export default CampaignUpdatePage;

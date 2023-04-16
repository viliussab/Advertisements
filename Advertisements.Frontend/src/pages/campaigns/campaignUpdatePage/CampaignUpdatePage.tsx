import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../api/calls/api';
import campaignMutations from '../../../api/calls/campaignMutations';
import campaignQueries from '../../../api/calls/campaignQueries';
import {
  CampaignCreateUpdate,
  CampaignCreateUpdateSchema,
} from '../../../api/commands/schema.createUpdateCampaign';
import CampaignCreateUpdateFields from '../../../components/private/campaign/CampaignCreateUpdateFields';
import CampaignOrderDocumentPreview from '../../../components/private/campaign/CampaignOrderDocumentPreview';
import Form from '../../../components/public/Form';
import FormInput from '../../../components/public/input/form';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';

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

  const campaignUpdateCommand = useMutation({
    mutationKey: campaignMutations.campaignUpdate.key,
    mutationFn: campaignMutations.campaignUpdate.fn,
    onSuccess: onCreateSuccess,
  });

  const redirectToDetalization = (_: unknown, num: number) => {
    if (num !== 1) {
      return;
    }

    const detalizationPath = generatePath(
      website_paths.campaigns.edit_detalize,
      {
        id,
      },
    );

    navigate(detalizationPath);
  };

  const customersQuery = useQuery({
    queryKey: campaignQueries.customers.key,
    queryFn: campaignQueries.customers.fn,
  });

  if (customersQuery.isLoading && campaignQuery.isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex justify-center">
      <Mui.Paper elevation={4} className="m-4 bg-gray-50">
        <Mui.Box className="w-full bg-gray-200">
          <Mui.Tabs
            value={0}
            onChange={redirectToDetalization}
            variant="fullWidth"
          >
            <Mui.Tab label="Reklamos Pasiūlymas" />
            <Mui.Tab label="Plokštumų Detalizacija" />
          </Mui.Tabs>
        </Mui.Box>
        <div className="p-4">
          <Form
            form={form}
            onSubmit={(values) => {
              campaignUpdateCommand.mutateAsync({
                id: id as string,
                values,
              });
            }}
          >
            <div className="flex gap-4">
              <div>
                <div className="flex justify-center">
                  <div className="w-64 space-y-3 pt-0">
                    <CampaignCreateUpdateFields
                      update
                      form={form}
                      customers={customersQuery.data || []}
                    />
                  </div>
                </div>
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
            <div className="mt-4 flex justify-between">
              <FormInput.SubmitButton
                isSubmitting={campaignUpdateCommand.isLoading}
              >
                Atnaujinti
              </FormInput.SubmitButton>
              <Mui.Button
                color="info"
                variant="contained"
                href={`${api.endpoints.campaign.download_campaign_offer}/${id}`}
              >
                Atsisiųsti reklamos pasiūlymą
                <Icons.FileOpen sx={{ ml: 1 }} />
              </Mui.Button>
            </div>
          </Form>
        </div>
      </Mui.Paper>
    </div>
  );
}

export default CampaignUpdatePage;

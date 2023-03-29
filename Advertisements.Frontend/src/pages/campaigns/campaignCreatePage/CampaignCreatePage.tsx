import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import campaignMutations from '../../../api/calls/campaignMutations';
import campaignQueries from '../../../api/calls/campaignQueries';
import {
  CampaignCreateUpdate,
  CampaignCreateUpdateSchema,
} from '../../../api/commands/schema.createUpdateCampaign';
import CampaignCreateUpdateFields from '../../../components/private/campaign/CampaignCreateUpdateFields';
import CampaignOrderDocumentPreview from '../../../components/private/campaign/CampaignOrderDocumentPreview';
import dateFns from '../../../config/imports/dateFns';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';
import dateFunctions from '../../../functions/dateFunctions';

function CampaignCreatePage() {
  const navigate = useNavigate();

  const nextWeekStart = dateFns.addWeeks(
    dateFunctions.getCurrentCampaignDay(),
    1,
  );

  const form = useForm<CampaignCreateUpdate>({
    resolver: zodResolver(CampaignCreateUpdateSchema),
    defaultValues: {
      periodStart: nextWeekStart,
      periodEnd: nextWeekStart,
    },
  });

  const onSuccess = () => {
    toast.success('Kampanija sukurta');
    navigate(website_paths.campaigns.main);
  };

  const campaignCreateCommand = useMutation({
    mutationKey: campaignMutations.campaignCreate.key,
    mutationFn: campaignMutations.campaignCreate.fn,
    onSuccess,
  });

  const onSubmit = (values: CampaignCreateUpdate) => {
    campaignCreateCommand.mutateAsync(values);
  };

  const customersQuery = useQuery({
    queryKey: campaignQueries.customers.key,
    queryFn: campaignQueries.customers.fn,
  });

  if (customersQuery.isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex justify-center">
      <Mui.Paper elevation={4} className="m-4 bg-gray-50 p-4">
        <div className="flex gap-4">
          <div>
            <form
              onSubmit={(e) => {
                form.handleSubmit(onSubmit)(e);
              }}
            >
              <div className="flex justify-center">
                <div className="w-64 space-y-3 pt-0">
                  <CampaignCreateUpdateFields
                    form={form}
                    customers={customersQuery.data || []}
                    isSubmitting={false}
                    submitText="Kurti naują"
                  />
                </div>
              </div>
            </form>
          </div>
          <div>
            <CampaignOrderDocumentPreview form={form} />
          </div>
        </div>
      </Mui.Paper>
    </div>
  );
}

export default CampaignCreatePage;

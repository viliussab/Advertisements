import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import campaignMutations from '../../../api/calls/campaignMutations';
import campaignQueries from '../../../api/calls/campaignQueries';
import CampaignsQuery from '../../../api/queries/type.CampaignsQuery';
import CampaignOverview from '../../../api/responses/type.CampaignOverview';
import CampaignInfoDialog from '../../../components/private/campaign/CampaignInfoDialog';
import Table, { ColumnConfig } from '../../../components/public/table/Table';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';
import dateFunctions from '../../../functions/dateFunctions';
import campaignPlanesFunctions from '../campaignPlanesPage/private/campaignPlanesFunctions';

function CampaignsListPage() {
  const navigate = useNavigate();

  const [query, setQuery] = React.useState<CampaignsQuery>({
    pageNumber: 1,
    pageSize: 25,
  });

  const campaignsQuery = useQuery({
    queryKey: [campaignQueries.pagedCampaigns.key, query],
    queryFn: () => campaignQueries.pagedCampaigns.fn(query),
  });

  const customersQuery = useQuery({
    queryKey: campaignQueries.customers.key,
    queryFn: campaignQueries.customers.fn,
  });

  const confirmMutation = useMutation({
    mutationKey: campaignMutations.campaignConfirm.key,
    mutationFn: campaignMutations.campaignConfirm.fn,
    onSuccess() {
      toast.success('Kampanija patvirtinta');
    },
  });

  const [selectedCampaignId, setSelectedCampaignId] = React.useState<string>();

  if (!customersQuery.isFetched && !campaignsQuery.isFetched) {
    return <></>;
  }

  const columns: ColumnConfig<CampaignOverview>[] = [
    {
      title: 'Atnaujinta',
      renderCell: (campaign) => (
        <>{dateFunctions.format(new Date(campaign.modificationDate))}</>
      ),
      key: 'modificationDate',
    },
    {
      title: 'Klientas',
      renderCell: (campaign) => <>{campaign.customer.name}</>,
      key: 'clientName',
    },
    {
      title: 'Kampanijos pavadinimas',
      renderCell: (campaign) => <div className="">{campaign.name}</div>,
      key: 'campaignName',
    },
    {
      title: 'Periodas',
      renderCell: (campaign) => (
        <>
          {dateFunctions.formatWeekPeriodShort(
            new Date(campaign.start),
            new Date(campaign.end),
          )}
        </>
      ),
      key: 'period',
    },
    {
      title: 'Savaitės',
      renderCell: (campaign) => <>{campaign.weekCount}</>,
      key: 'weekCount',
    },
    {
      title: 'Plokštumos',
      renderCell: (campaign) => {
        if (campaignPlanesFunctions.isCampaignFullfiled(campaign)) {
          return (
            <div className="font-bold text-green-700">
              {campaign.planeAmount}/{campaign.planeAmount}
            </div>
          );
        }

        const remainders =
          campaignPlanesFunctions.getRemaindersCampaign(campaign);
        const left =
          remainders.reduce(
            (acc, x) => acc + (campaign.planeAmount - x.left),
            0,
          ) / campaign.weekCount;

        console.log('left', left);

        return <>{`~${Math.floor(left)}/${campaign.planeAmount}`}</>;
      },
      key: 'planeAmount',
    },
    {
      title: 'Suma be PVM',
      renderCell: (campaign) => <>{campaign.totalNoVat.toFixed(2)}€</>,
      key: 'totalNoVat',
    },
  ];

  return (
    <div className="flex justify-center pt-2">
      <Table
        paging={{
          pageSize: query.pageSize,
          pageNumber: query.pageNumber,
          totalCount: campaignsQuery.data?.totalCount || 0,
          setPageNumber: (pageNumber) =>
            setQuery((prev) => ({
              ...prev,
              pageNumber,
            })),
          setPageSize(pageSize) {
            setQuery((prev) => ({
              ...prev,
              pageSize,
            }));
          },
        }}
        onClick={(campaign) => setSelectedCampaignId(campaign.id)}
        columns={columns}
        data={campaignsQuery.data?.items || []}
        keySelector={(plane) => plane.id}
        buildTrClassName={(e) => (e.isFulfilled ? 'bg-green-100' : '')}
      />
      <CampaignInfoDialog
        onConfirm={() => campaignsQuery.refetch()}
        selectedCampaignId={selectedCampaignId}
        resetSelectedId={() => {
          setSelectedCampaignId(undefined);
        }}
      />
    </div>
  );
}

export default CampaignsListPage;

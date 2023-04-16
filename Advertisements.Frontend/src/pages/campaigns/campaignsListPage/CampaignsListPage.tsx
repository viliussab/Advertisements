import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import campaignMutations from '../../../api/calls/campaignMutations';
import campaignQueries from '../../../api/calls/campaignQueries';
import CampaignsQuery from '../../../api/queries/type.CampaignsQuery';
import CampaignOverview from '../../../api/responses/type.CampaignOverview';
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

  if (!customersQuery.isFetched && !campaignsQuery.isFetched) {
    return <>Loading...</>;
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
      renderCell: (campaign) => <>{campaign.name}</>,
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
        renderOnClickMenu={(campaign) => (
          <>
            <Mui.Button
              onClick={() =>
                navigate(
                  generatePath(website_paths.campaigns.edit, {
                    id: campaign.id,
                  }),
                )
              }
            >
              Pasiūlymas <Icons.Edit sx={{ ml: 2 }} />
            </Mui.Button>
            <Mui.Button color="info">
              Stotelės <Icons.AddLocation sx={{ ml: 2 }} />
            </Mui.Button>
            {!campaign.isFulfilled &&
              campaignPlanesFunctions.isCampaignFullfiled(campaign) && (
                <Mui.Button
                  disabled={
                    confirmMutation.isLoading || confirmMutation.isSuccess
                  }
                  variant="contained"
                  onClick={() => confirmMutation.mutateAsync(campaign.id)}
                >
                  Tvirtinti kampaniją <Icons.Check sx={{ ml: 2 }} />
                </Mui.Button>
              )}
          </>
        )}
        // onClick={(campaign) => {

        // }}
        columns={columns}
        data={campaignsQuery.data?.items || []}
        keySelector={(plane) => plane.id}
      />
    </div>
  );
}

export default CampaignsListPage;

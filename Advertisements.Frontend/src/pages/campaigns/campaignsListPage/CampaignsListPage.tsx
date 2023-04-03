import React from 'react';
import { useQuery } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import campaignQueries from '../../../api/calls/campaignQueries';
import CampaignsQuery from '../../../api/queries/type.CampaignsQuery';
import CampaignOverview from '../../../api/responses/type.CampaignOverview';
import Table, { ColumnConfig } from '../../../components/public/table/Table';
import website_paths from '../../../config/website_paths';
import dateFunctions from '../../../functions/dateFunctions';

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
      key: 'campaignName',
    },
    {
      title: 'Savaičių kiekis',
      renderCell: (campaign) => <>{campaign.weekCount}</>,
      key: 'weekCount',
    },
    {
      title: 'Suma be PVM',
      renderCell: (campaign) => <>{campaign.totalNoVat}€</>,
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
        onClick={(campaign) => {
          navigate(
            generatePath(website_paths.campaigns.edit, { id: campaign.id }),
          );
        }}
        columns={columns}
        data={campaignsQuery.data?.items || []}
        keySelector={(plane) => plane.id}
      />
    </div>
  );
}

export default CampaignsListPage;

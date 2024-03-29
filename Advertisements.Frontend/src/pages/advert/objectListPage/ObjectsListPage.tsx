import React from 'react';
import { useQuery } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import advertQueries from '../../../api/calls/advertQueries';
import filterOptions from '../../../api/filterOptions/filterOptions';
import objectOptions from '../../../api/filterOptions/objectOptions';
import ObjectsQuery from '../../../api/queries/type.ObjectsQuery';
import AdvertPlaneOverview from '../../../api/responses/type.AdvertPlaneOverview';
import PlaneIlluminationIcon from '../../../components/private/advert/PlaneIlluminationIcon';
import PlanePermisson from '../../../components/private/advert/PlanePermisson';
import PlanePremiumIcon from '../../../components/private/advert/PlanePremiumIcon';
import Filters from '../../../components/public/input/filter';
import Table, { ColumnConfig } from '../../../components/public/table/Table';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';
import optionsFunctions from '../../../functions/optionsFunctions';

function ObjectsListPage() {
  const navigate = useNavigate();

  const [query, setQuery] = React.useState<ObjectsQuery>({
    pageNumber: 1,
    pageSize: 25,
  });

  const planesQuery = useQuery({
    queryKey: [advertQueries.pagedPlanes.key, query],
    queryFn: () => advertQueries.pagedPlanes.fn(query),
  });

  const areasQuery = useQuery({
    queryKey: advertQueries.areas.key,
    queryFn: advertQueries.areas.fn,
  });

  if (planesQuery.isLoading && areasQuery.isLoading) {
    <div className="flex w-full justify-center pt-2">
      <Mui.CircularProgress />
    </div>;
  }

  const regions = areasQuery.data?.flatMap((a) => a.regions) || [];

  const columns: ColumnConfig<AdvertPlaneOverview>[] = [
    {
      title: 'Nr.',
      renderCell: (plane) => <>{plane.object.serialCode}</>,
      key: 'serialCode',
    },
    {
      title: 'Pavadinimas',
      renderCell: (plane) => <>{`${plane.object.name} ${plane.partialName}`}</>,
      key: 'name',
      filter: {
        isActive: !!query.name,
        renderFilter: () => (
          <Filters.Search
            label="Pavadinimas"
            value={query.name}
            onChange={(value) => setQuery((prev) => ({ ...prev, name: value }))}
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, name: undefined }));
        },
      },
    },
    {
      title: 'Adresas',
      renderCell: (plane) => <>{plane.object.address}</>,
      key: 'address',
      filter: {
        isActive: !!query.address,
        renderFilter: () => (
          <Filters.Search
            label="Adresas"
            value={query.address}
            onChange={(value) =>
              setQuery((prev) => ({ ...prev, address: value }))
            }
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, address: undefined }));
        },
      },
    },
    {
      title: 'Pusė',
      renderCell: (plane) => <>{plane.partialName}</>,
      key: 'side',
      filter: {
        isActive: !!query.side,
        renderFilter: () => (
          <Filters.Select
            options={objectOptions.sideOptions}
            label="Pusė"
            value={query.side}
            onChange={(value) => setQuery((prev) => ({ ...prev, side: value }))}
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, side: undefined }));
        },
      },
    },
    {
      title: 'Tipas',
      renderCell: (plane) => <>{plane.object.type.name}</>,
      key: 'type',
    },
    {
      title: 'Rajonas',
      renderCell: (plane) => <>{plane.object.region}</>,
      key: 'region',
      filter: {
        isActive: !!query.region,
        renderFilter: () => (
          <Filters.Select
            options={optionsFunctions.getArrayOptions(regions)}
            label="Rajonas"
            value={query.region}
            onChange={(value) =>
              setQuery((prev) => ({ ...prev, region: value }))
            }
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, region: undefined }));
        },
      },
    },
    {
      title: 'Apšvietimas',
      renderCell: (plane) => (
        <PlaneIlluminationIcon illuminated={plane.object.illuminated} />
      ),
      key: 'illumination',
      filter: {
        isActive: !!query.illuminated?.toString(),
        renderFilter: () => (
          <Filters.Select
            emptyOptionDisplay="Visi"
            options={objectOptions.illuminationOptions}
            label="Apšvietimas"
            value={query.illuminated?.toString()}
            onChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                illuminated: filterOptions.toBoolean(value),
              }))
            }
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, illuminated: undefined }));
        },
      },
    },
    {
      title: 'Leidimas',
      renderCell: (plane) => <PlanePermisson plane={plane} />,
      key: 'permitted',
    },
    {
      title: 'Premium',
      renderCell: (plane) => <PlanePremiumIcon isPremium={plane.isPremium} />,
      key: 'premium',
      filter: {
        isActive: !!query.premium?.toString(),
        renderFilter: () => (
          <Filters.Select
            emptyOptionDisplay="Visi"
            options={objectOptions.premiumOptions}
            label="Premium"
            value={query.premium?.toString()}
            onChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                premium: filterOptions.toBoolean(value),
              }))
            }
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, premium: undefined }));
        },
      },
    },
  ];

  return (
    <div className="flex justify-center pt-2">
      <Table
        paging={{
          pageSize: query.pageSize,
          pageNumber: query.pageNumber,
          totalCount: planesQuery.data?.totalCount || 0,
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
        onClick={(plane) => {
          navigate(
            generatePath(website_paths.objects.edit, { id: plane.objectId }),
          );
        }}
        columns={columns}
        data={planesQuery.data?.items || []}
        keySelector={(plane) => plane.id}
      />
    </div>
  );
}

export default ObjectsListPage;

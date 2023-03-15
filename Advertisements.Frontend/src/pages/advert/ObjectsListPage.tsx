import React from 'react';
import { useQuery } from 'react-query';
import advertQueries from '../../api/calls/advertQueries';
import PageQuery from '../../api/queries/type.PageQuery';
import AdvertPlane, {
  AdvertPlaneWithObjectsHasAreaAndType,
} from '../../api/responses/type.AdvertPlane';
import Table, { ColumnConfig } from '../../components/public/Table';
import dateFns from '../../config/imports/dateFns';
import Icons from '../../config/imports/Icons';
import Mui from '../../config/imports/Mui';
import dateFunctions from '../../functions/dateFunctions';

function ObjectsListPage() {
  const [query, setQuery] = React.useState<PageQuery>({
    pageNumber: 1,
    pageSize: 25,
  });

  const planesQuery = useQuery({
    queryKey: [advertQueries.pagedPlanes.key, query],
    queryFn: () => advertQueries.pagedPlanes.fn(query),
  });

  if (planesQuery.isLoading) {
    <div className="flex w-full justify-center pt-2">
      <Mui.CircularProgress />
    </div>;
  }

  const columns: ColumnConfig<AdvertPlaneWithObjectsHasAreaAndType>[] = [
    {
      title: 'Nr.',
      renderCell: (plane) => <>{plane.object.serialCode}</>,
      key: 'serialCode',
    },
    {
      title: 'Pavadinimas',
      renderCell: (plane) => <>{`${plane.object.name} ${plane.partialName}`}</>,
      key: 'name',
    },
    {
      title: 'Adresas',
      renderCell: (plane) => <>{plane.object.address}</>,
      key: 'address',
    },
    {
      title: 'Pusė',
      renderCell: (plane) => <>{plane.partialName}</>,
      key: 'side',
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
    },
    {
      title: 'Apšvietimas',
      renderCell: (plane) => (
        <>
          {plane.object.illuminated ? (
            <Icons.LightMode className="text-yellow-300" />
          ) : (
            <Icons.LightMode className="text-gray-200" />
          )}
        </>
      ),
      key: 'illumination',
    },
    {
      title: 'Leidimas',
      renderCell: (plane) => <PermissionCell plane={plane} />,
      key: 'permitted',
    },
    {
      title: 'Premium',
      renderCell: (plane) => (
        <>
          {plane.isPremium ? (
            <Icons.Star className="text-amber-400" />
          ) : (
            <Icons.Star className="text-gray-200" />
          )}
        </>
      ),
      key: 'premium',
    },
  ];

  return (
    <div className="flex justify-center pt-2">
      <Table
        paging={{
          pageSize: query.pageSize,
          pageNumber: query.pageNumber,
          totalCount: planesQuery.data?.totalCount!,
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
        columns={columns}
        data={planesQuery.data?.items || []}
        keySelector={(plane) => plane.id}
      />
    </div>
  );
}

export type PermittedCellProps = {
  plane: AdvertPlane;
};

function PermissionCell({ plane }: PermittedCellProps) {
  if (!plane.isPermitted || !plane.permissionExpiryDate) {
    return (
      <div className="text-red-800">
        <Icons.Warning sx={{ mr: 1 }} />
        Nėra leidimo
      </div>
    );
  }

  const expiryDate = new Date(plane.permissionExpiryDate!);

  console.log('expiryDate', expiryDate);

  const daysLeft = dateFns.differenceInDays(expiryDate, Date.now());

  if (daysLeft <= 0) {
    return (
      <div className="text-red-800">
        <Icons.Warning sx={{ mr: 1 }} />
        Pasibaigęs leidimas
      </div>
    );
  }

  const twoMonthsInDays = 60;

  if (daysLeft <= twoMonthsInDays) {
    return (
      <div className="text-yellow-500">
        <Icons.Warning sx={{ mr: 1 }} />
        {`Leidimas pasibaigs už ${daysLeft} d.`}
      </div>
    );
  }

  return <div>{`Galioja iki ${dateFunctions.format(expiryDate)}`}</div>;
}

export default ObjectsListPage;

import React from 'react';
import { useQuery } from 'react-query';
import advertQueries from '../../../api/calls/advertQueries';
import ObjectMapRender from './private/ObjectMapRender';

const ObjectMapPage = () => {
  const areaQuery = useQuery({
    queryKey: advertQueries.areaKaunas.key,
    queryFn: advertQueries.areaKaunas.fn,
  });

  if (!areaQuery.isFetched) {
    return null;
  }

  return (
    <ObjectMapRender
      area={areaQuery.data!}
      className="h-full w-full"
      markers={
        areaQuery.data?.objects.map((x) => ({
          lat: x.latitude,
          lng: x.longitude,
        })) || []
      }
    />
  );
};

export default ObjectMapPage;

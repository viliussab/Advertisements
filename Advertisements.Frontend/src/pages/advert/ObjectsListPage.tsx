import React from 'react';
import { useQuery } from 'react-query';
import advertQueries from '../../api/calls/advertQueries';

function ObjectsListPage() {
  const typesQuery = useQuery({
    queryKey: advertQueries.pagedPlanes.key,
    queryFn: advertQueries.pagedPlanes.fn,
  });

  return <div>ObjectsListPage</div>;
}

export default ObjectsListPage;

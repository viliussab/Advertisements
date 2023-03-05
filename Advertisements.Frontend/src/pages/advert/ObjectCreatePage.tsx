import React from 'react';
import { useQuery } from 'react-query';
import advertQueries from '../../api/calls/advertQueries';

function CreateObjectPage() {
  const areasQuery = useQuery({
    queryKey: advertQueries.areas.key,
    queryFn: advertQueries.areas.fn,
  });

  const typesQuery = useQuery({
    queryKey: advertQueries.types.key,
    queryFn: advertQueries.types.fn,
  });

  const query = useQuery({
    queryKey: ['Repo'],
    queryFn: () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
        (res) => res.json(),
      ),
  });

  console.log('1', areasQuery);
  console.log('2', typesQuery);

  return <div>CreateObjectPage</div>;
}

export default CreateObjectPage;

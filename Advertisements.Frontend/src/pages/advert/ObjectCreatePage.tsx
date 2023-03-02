import React from 'react';
import { useQuery } from 'react-query';

function CreateObjectPage() {
  const query = useQuery({
    queryKey: ['Repo'],
    queryFn: () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
        (res) => res.json(),
      ),
  });

  console.log('query', query);

  return <div>CreateObjectPage</div>;
}

export default CreateObjectPage;

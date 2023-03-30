import React from 'react';
import { useQuery } from 'react-query';
import advertQueries from '../../../api/calls/advertQueries';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import ObjectMapDetailsDialog from './private/ObjectMapDetailsDialog';
import ObjectMapRender from './private/ObjectMapRender';

const ObjectMapPage = () => {
  const areaQuery = useQuery({
    queryKey: advertQueries.areaKaunas.key,
    queryFn: advertQueries.areaKaunas.fn,
  });

  const [selectedObjectId, setSelectedObjectId] = React.useState<string>();

  return (
    <>
      <ObjectMapRender
        onObjectSelect={(id) => setSelectedObjectId(id)}
        area={areaQuery.data!}
        className="h-[calc(100vh-64px)] w-[100vw]"
        objects={areaQuery.data?.objects || []}
      />
      <ObjectMapDetailsDialog
        selectedObjectId={selectedObjectId}
        resetSelectedId={() => setSelectedObjectId(undefined)}
      />
    </>
  );
};

export default ObjectMapPage;

import React from 'react';
import { useQuery } from 'react-query';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import advertQueries from '../../../api/calls/advertQueries';
import campaignQueries from '../../../api/calls/campaignQueries';
import ObjectsQuery from '../../../api/queries/type.ObjectsQuery';
import AdvertPlaneOfCampaign from '../../../api/responses/type.AdvertPlaneOfCampaign';
import Table, { ColumnConfig } from '../../../components/public/table/Table';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';
import dateFunctions from '../../../functions/dateFunctions';
import CampaignPlanesBarGraphDialog from './private/CampaignPlanesBarGraphDialog';
import campaignPLanesFunctions from './private/campaignPlanesFunctions';
import CampaignPlanesMapDetailsDialog from './private/CampaignPlanesMapDetailsDialog';
import CampaignPlanesMapRender from './private/CampaignPlanesMapRender';
import CampaignPlanesOccupancyTable from './private/CampaignPlanesOccupancyTable';
import CampaignPlanesPeriodFormDialog from './private/CampaignPlanesPeriodFormDialog';
import { SelectedPlaneToEdit } from './private/type.CampaignPlanesPage';

function CampaignPlanesPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedPlanes, setSelectedPlanes] = React.useState<
    AdvertPlaneOfCampaign[]
  >([]);

  const aboveWidthThreshold = Mui.useMediaQuery('(min-width:850px)');

  const [planeListQuery, setPlaneListQuery] = React.useState<ObjectsQuery>({
    pageNumber: 1,
    pageSize: 10000,
  });

  const planesQuery = useQuery({
    queryKey: [advertQueries.pagedPlanes.key, planeListQuery],
    queryFn: () => advertQueries.pagedPlanes.fn(planeListQuery),
  });

  const areaQuery = useQuery({
    queryKey: advertQueries.areaKaunas.key,
    queryFn: advertQueries.areaKaunas.fn,
  });

  const campaignQuery = useQuery({
    queryKey: campaignQueries.campaign.key,
    queryFn: () => campaignQueries.campaign.fn(id as string),
  });

  const [selectedMapObjectId, setSelectedMapObjectId] =
    React.useState<string>();
  const [selectedPlane, setSelectedPlane] =
    React.useState<SelectedPlaneToEdit>();
  const [openGraph, setOpenGraph] = React.useState(false);
  const [isMap, setIsMap] = React.useState(true);

  const selectedPlanesColumns: ColumnConfig<AdvertPlaneOfCampaign>[] = [
    {
      title: 'Pavadinimas',
      renderCell: (plane) => (
        <>
          {plane?.object?.name} {plane.partialName}
        </>
      ),
      key: 'name',
    },
    {
      title: 'Adresas',
      renderCell: (plane) => <>{plane?.object?.address}</>,
      key: 'address',
    },
    {
      title: 'Tipas',
      renderCell: (plane) => <>{plane?.object?.type.name}</>,
      key: 'typeName',
    },
    {
      title: 'Periodas',
      renderCell: (plane) => (
        <>{dateFunctions.formatWeekPeriodShort(plane.weekFrom, plane.weekTo)}</>
      ),
      key: 'period',
    },
  ];

  const redirectToEdit = (_: unknown, num: number) => {
    if (num !== 0) {
      return;
    }

    const detalizationPath = generatePath(website_paths.campaigns.edit, {
      id,
    });

    navigate(detalizationPath);
  };

  if (areaQuery.isLoading || campaignQuery.isLoading) {
    return <></>;
  }

  const isFullfilled = campaignPLanesFunctions.isCampaignPlanesFullfiled(
    selectedPlanes,
    campaignQuery.data!,
  );

  return (
    <div className="flex justify-center">
      <Mui.Paper elevation={4} className="m-4 bg-gray-50">
        <Mui.Box className="mb-4 w-full bg-gray-200">
          <Mui.Tabs value={1} onChange={redirectToEdit} variant="fullWidth">
            <Mui.Tab label="Reklamos Pasiūlymas" />
            <Mui.Tab label="Plokštumų Detalizacija" />
          </Mui.Tabs>
        </Mui.Box>
        <div className="">
          <div className={`${!aboveWidthThreshold ? 'w-[96vw]' : 'w-[48vw]'}`}>
            <div className="flex items-center justify-center">
              {isFullfilled ? (
                <div>Plokštumos parinktos</div>
              ) : (
                <div className="items-cetner flex flex-wrap justify-center gap-2">
                  <div className="flex items-center text-center">
                    Ne visos plokštumos parinktos
                  </div>
                  <Mui.Button onClick={() => setOpenGraph(true)}>
                    Peržiūrėti užimto grafiką
                  </Mui.Button>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              {selectedPlanes.length ? (
                <div className="overflow-scroll">
                  <Table
                    columns={selectedPlanesColumns}
                    keySelector={(plane) => plane.id}
                    data={selectedPlanes}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="m-2 flex justify-between">
              <Mui.Button variant="contained">Išsaugoti</Mui.Button>
              <Mui.Button variant="contained" color="info">
                Pdf Klientui
              </Mui.Button>
            </div>
          </div>
          <div
            className={`${
              !aboveWidthThreshold ? 'w-[96vw]' : 'w-[48vw] '
            } h-[80vh] flex-grow`}
          >
            <div className={isMap ? '' : 'hidden'}>
              <CampaignPlanesMapRender
                selectedPlanes={selectedPlanes}
                area={areaQuery.data}
                objects={areaQuery.data?.objects || []}
                className={`${
                  !aboveWidthThreshold
                    ? 'w-[96vw]'
                    : 'w-[48vw] flex-grow basis-0'
                } relative h-[80vh]`}
                onObjectSelect={(id) => {
                  setSelectedMapObjectId(id);
                }}
                switchViewMode={() => setIsMap(false)}
              />
            </div>
            <div className={isMap ? 'hidden' : 'flex bg-gray-800'}>
              <div
                className={`${
                  !aboveWidthThreshold
                    ? 'w-[96vw]'
                    : 'w-[48vw] flex-grow basis-0'
                } relative h-[80vh]`}
              >
                <CampaignPlanesOccupancyTable
                  planes={planesQuery.data?.items || []}
                />
              </div>
            </div>
          </div>
        </div>
      </Mui.Paper>
      <CampaignPlanesMapDetailsDialog
        selectedPlanes={selectedPlanes}
        selectedObjectId={selectedMapObjectId}
        resetSelectedId={() => setSelectedMapObjectId(undefined)}
        onPlaneSelect={(planeId) => setSelectedPlane(planeId)}
      />
      <CampaignPlanesPeriodFormDialog
        selectedPlane={selectedPlane}
        campaign={campaignQuery.data!}
        onSubmit={(values) => {
          const objects = areaQuery.data?.objects;
          const plane = objects!
            .flatMap((x) => x.planes)
            .find((x) => x.id === values.id);

          const selectedPlane = {
            ...plane,
            ...values,
            object: objects?.find((x) =>
              x.planes.some((p) => p.id === values.id),
            ),
          };
          setSelectedPlanes((prev) => [...prev, selectedPlane]);
          setSelectedPlane(undefined);
        }}
        resetSelectedId={() => setSelectedPlane(undefined)}
      />
      <CampaignPlanesBarGraphDialog
        campaign={campaignQuery.data!}
        open={openGraph}
        onClose={() => setOpenGraph(false)}
        selected={selectedPlanes}
      />
    </div>
  );
}

export default CampaignPlanesPage;

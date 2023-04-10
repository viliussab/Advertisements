import React from 'react';
import { useQuery } from 'react-query';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import advertQueries from '../../../api/calls/advertQueries';
import campaignQueries from '../../../api/calls/campaignQueries';
import AdvertPlaneOfCampaign from '../../../api/responses/type.AdvertPlaneOfCampaign';
import Table, { ColumnConfig } from '../../../components/public/table/Table';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';
import CampaignPlanesMapDetailsDialog from './private/CampaignPlanesMapDetailsDialog';
import CampaignPlanesMapRender from './private/CampaignPlanesMapRender';
import CampaignPlanesPeriodFormDialog from './private/CampaignPlanesPeriodFormDialog';
import { SelectedPlaneToEdit } from './private/type.CampaignPlanesPage';

function CampaignPlanesPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedPlanes, setSelectedPlanes] = React.useState<
    AdvertPlaneOfCampaign[]
  >([]);
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

  return (
    <div className="flex justify-center">
      <Mui.Paper elevation={4} className="m-4 bg-gray-50">
        <Mui.Box className="mb-4 w-full bg-gray-200">
          <Mui.Tabs value={1} onChange={redirectToEdit} variant="fullWidth">
            <Mui.Tab label="Reklamos Pasiūlymas" />
            <Mui.Tab label="Plokštumų Detalizacija" />
          </Mui.Tabs>
        </Mui.Box>
        <div className="flex justify-between">
          <div className="w-[40vw]">
            <Table
              columns={selectedPlanesColumns}
              keySelector={(plane) => plane.id}
              data={selectedPlanes}
            />
            <div className="m-2 flex justify-between">
              <Mui.Button variant="contained">Išsaugoti</Mui.Button>
              <Mui.Button variant="contained" color="info">
                Pdf Klientui
              </Mui.Button>
            </div>
          </div>
          <div className="w-[60vw]">
            <div>
              <CampaignPlanesMapRender
                selectedPlanes={selectedPlanes}
                area={areaQuery.data}
                objects={areaQuery.data?.objects || []}
                className="relative h-[calc(80vh)] w-[60vw]"
                onObjectSelect={(id) => {
                  setSelectedMapObjectId(id);
                }}
              />
            </div>
          </div>
        </div>
        <></>
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
    </div>
  );
}

export default CampaignPlanesPage;

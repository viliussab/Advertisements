import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import advertQueries from '../../../api/calls/advertQueries';
import campaignMutations from '../../../api/calls/campaignMutations';
import campaignQueries from '../../../api/calls/campaignQueries';
import CampaignPlane from '../../../api/responses/type.CampaignPlane';
import ObjectsQuery from '../../../api/queries/type.ObjectsQuery';
import AdvertPlaneOfCampaign from '../../../api/responses/type.AdvertPlaneOfCampaign';
import AreaDetailed from '../../../api/responses/type.AreaDetailed';
import FormInput from '../../../components/public/input/form';
import Table, { ColumnConfig } from '../../../components/public/table/Table';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';
import dateFunctions from '../../../functions/dateFunctions';
import CampaignPlanesBarGraphDialog from './private/CampaignPlanesBarGraphDialog';
import campaignPlanesFunctions from './private/campaignPlanesFunctions';
import CampaignPlanesMapDetailsDialog from './private/CampaignPlanesMapDetailsDialog';
import CampaignPlanesMapRender from './private/CampaignPlanesMapRender';
import CampaignPlanesOccupancyTable from './private/CampaignPlanesOccupancyTable';
import CampaignPlanesPeriodFormDialog from './private/CampaignPlanesPeriodFormDialog';
import { SelectedPlaneToEdit } from './private/type.CampaignPlanesPage';
import CampaignPlaneUpdate from '../../../api/commands/type.CampaignPlaneUpdate';

function CampaignPlanesPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedCp, setSelectedCp] = React.useState<CampaignPlaneUpdate[]>([]);

  const aboveWidthThreshold = Mui.useMediaQuery('(min-width:900px)');

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
    onSuccess(data) {
      if (selectedCp.length) {
        return;
      }
      setSelectedCp(
        data.campaignPlanes?.map((x) => ({
          ...x,
          weekFrom: new Date(x.weekFrom),
          weekTo: new Date(x.weekTo),
        })) || [],
      );
    },
  });

  const updateCampaignPlanesMutation = useMutation({
    mutationKey: campaignMutations.campaignPlanesUpdate.key,
    mutationFn: campaignMutations.campaignPlanesUpdate.fn,
    onSuccess() {
      toast.success('Atnaujintos kampanijos plokštumos');
      navigate(website_paths.campaigns.main);
    },
  });

  const [selectedMapObjectId, setSelectedMapObjectId] =
    React.useState<string>();
  const [hoveredMapObjectId, setHoveredMapObjectId] = React.useState<string>();
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

  const mapToViewFromMap = (
    area: AreaDetailed,
    campaignPlanes: (CampaignPlaneUpdate | CampaignPlane)[],
  ) => {
    const { objects } = area;
    const planes = objects!
      .flatMap((x) => x.planes)
      .filter((x) => campaignPlanes.some((cp) => cp.planeId === x.id));

    const selectedPlanes = planes.map((x) => {
      const cp = campaignPlanes.find((cp) => cp.planeId === x.id)!;
      const obj = objects?.find((o) => o.id === x.objectId);
      const planeOfCampaign = {
        ...x,
        ...cp,
        object: obj!,
      } as AdvertPlaneOfCampaign;

      return planeOfCampaign;
    });

    return selectedPlanes;
  };

  if (areaQuery.isLoading || campaignQuery.isLoading) {
    return <></>;
  }

  const area = areaQuery.data!;
  const campaign = campaignQuery.data!;

  const viewPlanes = mapToViewFromMap(area, selectedCp);

  const isFullfilled = campaignPlanesFunctions.isCampaignPlanesFullfiled(
    viewPlanes,
    campaign,
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
          <div className={`${!aboveWidthThreshold ? 'w-[96vw]' : 'w-[70vw]'}`}>
            <div className="mb-2 flex items-center justify-center">
              {isFullfilled ? (
                <div className="font-lg font-bold text-green-800">
                  Plokštumos parinktos
                </div>
              ) : (
                <div className="items-cetner flex flex-wrap justify-center gap-2">
                  <div className="flex items-center text-center">
                    Ne visos plokštumos parinktos
                  </div>
                  <Mui.Button onClick={() => setOpenGraph(true)}>
                    Peržiūrėti užimtumo grafiką
                  </Mui.Button>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              {selectedCp.length ? (
                <div className="overflow-scroll-x">
                  <Table
                    columns={selectedPlanesColumns}
                    keySelector={(plane) =>
                      plane.id +
                      plane.weekFrom.toDateString() +
                      plane.weekTo.toDateString()
                    }
                    data={viewPlanes}
                    onClick={(plane) => setSelectedMapObjectId(plane.objectId)}
                    rowsProps={{
                      onMouseOver(elem) {
                        setHoveredMapObjectId(elem.objectId);
                      },
                      onMouseOut() {
                        setHoveredMapObjectId(undefined);
                      },
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="m-2 flex justify-center gap-2">
              <FormInput.SubmitButton
                isSubmitting={updateCampaignPlanesMutation.isLoading}
                buttonProps={{
                  onClick: () => {
                    updateCampaignPlanesMutation.mutateAsync({
                      id: id as string,
                      campaignPlanes: selectedCp,
                    });
                  },
                }}
              >
                Išsaugoti
              </FormInput.SubmitButton>
              <Mui.Button variant="contained" color="info">
                Pdf Klientui
              </Mui.Button>
            </div>
          </div>
          <div
            className={`${
              !aboveWidthThreshold ? 'w-[96vw]' : 'w-[70vw]'
            } h-[80vh] flex-grow`}
          >
            <div className={isMap ? '' : 'hidden'}>
              <CampaignPlanesMapRender
                selectedPlanes={viewPlanes}
                area={area}
                hoveredObjectId={hoveredMapObjectId}
                objects={area?.objects || []}
                className={`${
                  !aboveWidthThreshold
                    ? 'w-[96vw]'
                    : 'w-[70vw] flex-grow basis-0'
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
                    : 'w-[70vw] flex-grow basis-0'
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
        deselectPlane={(id) => {
          setSelectedCp((prev) => prev.filter((x) => x.planeId !== id));
        }}
        selectedPlanes={viewPlanes}
        selectedObjectId={selectedMapObjectId}
        resetSelectedObjectId={() => setSelectedMapObjectId(undefined)}
        onPlaneSelect={(planeId) => setSelectedPlane(planeId)}
      />
      <CampaignPlanesPeriodFormDialog
        editPlane={selectedPlane}
        campaign={campaign}
        onSubmit={(values) => {
          if (selectedCp.some((cp) => cp.planeId === values.planeId)) {
            const removed = selectedCp.filter(
              (cp) => cp.planeId !== values.planeId,
            );
            console.log('values', values);
            setSelectedCp([...removed, values]);
          } else {
            setSelectedCp((prev) => [...prev, values]);
          }

          setSelectedPlane(undefined);
        }}
        resetSelectedId={() => setSelectedPlane(undefined)}
      />
      <CampaignPlanesBarGraphDialog
        campaign={campaign}
        open={openGraph}
        onClose={() => setOpenGraph(false)}
        selected={viewPlanes}
      />
    </div>
  );
}

export default CampaignPlanesPage;

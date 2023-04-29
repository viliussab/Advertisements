import React from 'react';
import { useQuery } from 'react-query';
import advertQueries from '../../../../api/calls/advertQueries';
import AdvertObjectDetailed, {
  AdvertPlaneWPhotos,
} from '../../../../api/responses/type.AdvertObjectDetailed';
import AdvertPlaneOfCampaign from '../../../../api/responses/type.AdvertPlaneOfCampaign';
import PlaneIlluminationIcon from '../../../../components/private/advert/PlaneIlluminationIcon';
import PlanePermisson from '../../../../components/private/advert/PlanePermisson';
import PlanePremiumIcon from '../../../../components/private/advert/PlanePremiumIcon';
import Icons from '../../../../config/imports/Icons';
import Mui from '../../../../config/imports/Mui';
import mapFunctions from '../../../../functions/mapFunctions';
import ObjectMapPhoto from '../../../advert/objectMapPage/private/ObjectMapPhoto';
import { SelectedPlaneToEdit } from './type.CampaignPlanesPage';

type Props = {
  selectedObjectId: string | undefined;
  resetSelectedObjectId: () => void;
  selectedPlanes: AdvertPlaneOfCampaign[];
  deselectPlane: (id: string) => void;
  onPlaneSelect: (plane: SelectedPlaneToEdit) => void;
};

const CampaignPlanesMapDetailsDialog = (props: Props) => {
  const {
    selectedObjectId,
    resetSelectedObjectId,
    onPlaneSelect,
    deselectPlane,
    selectedPlanes,
  } = props;

  const objectQuery = useQuery({
    queryKey: advertQueries.object.key,
    queryFn: () =>
      selectedObjectId ? advertQueries.object.fn(selectedObjectId) : undefined,
    enabled: !!selectedObjectId,
  });

  const object = objectQuery.data;

  return (
    <Mui.Dialog
      open={!!selectedObjectId}
      onClose={resetSelectedObjectId}
      maxWidth={false}
    >
      {objectQuery.isLoading || !object ? (
        <div className="h-32 w-32">
          <Mui.CircularProgress />
        </div>
      ) : (
        <div className="pt-4">
          <div className="pl-4 pr-4">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center text-center text-xl">
                {`${object.name}`}{' '}
                <PlaneIlluminationIcon illuminated={object.illuminated} />
              </div>
              <Mui.Button
                color="info"
                target="_blank"
                href={mapFunctions.getStreetviewUrl({
                  latitude: object.latitude,
                  longitude: object.longitude,
                })}
              >
                Atidaryti Streetview <Icons.Launch />
              </Mui.Button>
            </div>
            <div className="flex justify-between gap-2">
              <div className="text-sm text-gray-500">{`${object.address}, ${object.region}`}</div>
              <div className=""></div>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            {object.planes.map((plane) => (
              <>
                <Plane
                  deselectPlane={deselectPlane}
                  object={object}
                  onPlaneSelect={onPlaneSelect}
                  plane={plane}
                  resetSelectedObjectId={resetSelectedObjectId}
                  selectedPlanes={selectedPlanes}
                />
              </>
            ))}
          </div>
        </div>
      )}
    </Mui.Dialog>
  );
};

type PlaneProps = {
  resetSelectedObjectId: () => void;
  selectedPlanes: AdvertPlaneOfCampaign[];
  deselectPlane: (id: string) => void;
  plane: AdvertPlaneWPhotos;
  onPlaneSelect: (plane: SelectedPlaneToEdit) => void;
  object: AdvertObjectDetailed;
};

function Plane(props: PlaneProps) {
  const {
    resetSelectedObjectId,
    selectedPlanes,
    deselectPlane,
    plane,
    onPlaneSelect,
    object,
  } = props;

  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const isPlaneSelected = (id: string) => {
    return !!selectedPlanes.find((x) => x.id === id);
  };

  const getPlaneGridSize = (photosLength: number) =>
    Math.ceil(Math.sqrt(photosLength));

  return (
    <>
      <div
        key={plane.id}
        onClick={(e) => {
          const selectedPlane = selectedPlanes.find((x) => x.id === plane.id);
          if (selectedPlane) {
            setMenuAnchor(e.currentTarget);
            return;
          }

          onPlaneSelect({
            planeId: plane.id,
            name: object.name + ' ' + plane.partialName,
          });
          resetSelectedObjectId();
        }}
        className={`flex justify-between gap-4 p-4
                    ${
                      isPlaneSelected(plane.id)
                        ? 'bg-green-200 hover:cursor-pointer hover:bg-green-300'
                        : 'hover:cursor-pointer hover:bg-gray-200'
                    }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <div className="">{`${plane.partialName} pusė`}</div>
            <PlanePremiumIcon isPremium={plane.isPremium} />
          </div>
          <div className="mt-2">
            <PlanePermisson plane={plane} />
          </div>
        </div>
        {!plane.photos?.length ? (
          <div className="flex h-24 w-32 items-center justify-center bg-gray-300 text-gray-400">
            Nuotraukų nėra
          </div>
        ) : (
          <div
            className="grid h-24 w-32 bg-gray-100"
            style={{
              gridTemplateColumns: `repeat(${getPlaneGridSize(
                plane.photos.length,
              )}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${getPlaneGridSize(
                plane.photos.length,
              )}, minmax(0, 1fr))`,
            }}
          >
            {plane.photos.map((photo) => (
              <ObjectMapPhoto key={photo.id} image={photo} />
            ))}
          </div>
        )}
      </div>
      <Mui.Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
        }}
      >
        <div className="">
          <Mui.Button
            color="error"
            onClick={() => {
              setMenuAnchor(null);
              deselectPlane(plane.id);
              resetSelectedObjectId();
            }}
          >
            Panaikinti <Icons.Delete sx={{ ml: 1 }} />
          </Mui.Button>
          <Mui.Button
            onClick={() => {
              const values = selectedPlanes.find((x) => x.id === plane.id);
              setMenuAnchor(null);
              onPlaneSelect({
                planeId: plane.id,
                name: object.name + ' ' + plane.partialName,
                values,
              });
              resetSelectedObjectId();
            }}
          >
            Keisti periodą <Icons.Refresh sx={{ ml: 1 }} />
          </Mui.Button>
        </div>
      </Mui.Menu>
    </>
  );
}

export default CampaignPlanesMapDetailsDialog;

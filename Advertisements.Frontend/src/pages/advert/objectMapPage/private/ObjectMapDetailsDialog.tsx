import { ImportContactsSharp } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import advertQueries from '../../../../api/calls/advertQueries';
import PlaneIlluminationIcon from '../../../../components/private/advert/PlaneIlluminationIcon';
import PlanePermisson from '../../../../components/private/advert/PlanePermisson';
import PlanePremiumIcon from '../../../../components/private/advert/PlanePremiumIcon';
import Icons from '../../../../config/imports/Icons';
import Mui from '../../../../config/imports/Mui';
import website_paths from '../../../../config/website_paths';
import mapFunctions from '../../../../functions/mapFunctions';
import ObjectMapPhoto from './ObjectMapPhoto';

type Props = {
  selectedObjectId: string | undefined;
  resetSelectedId: () => void;
};

const ObjectMapDetailsDialog = (props: Props) => {
  const navigate = useNavigate();
  const { selectedObjectId, resetSelectedId } = props;

  const objectQuery = useQuery({
    queryKey: advertQueries.object.key,
    queryFn: () =>
      selectedObjectId ? advertQueries.object.fn(selectedObjectId) : undefined,
    enabled: !!selectedObjectId,
  });

  const object = objectQuery.data;

  const getPlaneGridSize = (photosLength: number) =>
    Math.ceil(Math.sqrt(photosLength));

  return (
    <Mui.Dialog
      open={!!selectedObjectId}
      onClose={resetSelectedId}
      maxWidth={false}
    >
      {objectQuery.isLoading || !object ? (
        <div className="h-32 w-32">
          <Mui.CircularProgress />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center text-center text-xl">
              {`${object.name}`}{' '}
              <PlaneIlluminationIcon illuminated={object.illuminated} />
            </div>
            <Mui.Button
              onClick={() => {
                navigate(
                  generatePath(website_paths.objects.edit, {
                    id: object.id,
                  }),
                );
              }}
            >
              Redaguoti objektą <Icons.Edit />
            </Mui.Button>
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-sm text-gray-500">{`${object.address}, ${object.region}`}</div>

            <div className="">
              <Button
                color="info"
                target="_blank"
                href={mapFunctions.getStreetviewUrl({
                  latitude: object.latitude,
                  longitude: object.longitude,
                })}
              >
                Atidaryti Streetview <Icons.Launch />
              </Button>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {object.planes.map((plane) => (
              <>
                <div key={plane.id} className="flex justify-between gap-4">
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
              </>
            ))}
          </div>
        </div>
      )}
    </Mui.Dialog>
  );
};

export default ObjectMapDetailsDialog;

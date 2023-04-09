import { InfoWindowF, MarkerF } from '@react-google-maps/api';
import React from 'react';
import { AdvertObjectOfArea } from '../../../../api/responses/type.AreaDetailed';
import Icons from '../../../../config/imports/Icons';
import Mui from '../../../../config/imports/Mui';
import ObjectMapPhoto from '../../../advert/objectMapPage/private/ObjectMapPhoto';

type Props = {
  object: AdvertObjectOfArea;
  onObjectSelect: (id: string) => void;
};

const CampaignPlanesMapMarker = ({ object, onObjectSelect }: Props) => {
  const [anchor, setAnchor] = React.useState<google.maps.MVCObject>();
  const [openInfo, setOpenInfo] = React.useState(false);

  return (
    <>
      <MarkerF
        onLoad={(marker) => setAnchor(marker)}
        onMouseDown={() => {
          setOpenInfo((prev) => !prev);
        }}
        key={object.id}
        position={{ lat: object.latitude, lng: object.longitude }}
      >
        {anchor && openInfo && (
          <InfoWindowF anchor={anchor}>
            <div>
              <div className="text-lg">{`${object.name}`}</div>
              <div className="text-gray-500">{`${object.address}, ${object.region}`}</div>
              <div className="">
                {`${object.planes.length} stotelės (${object.planes
                  .map((x) => x.partialName)
                  .join(', ')})`}
              </div>
              <div className="mt-2 flex justify-center">
                {object.featuredPhoto && (
                  <div className="grid h-32 w-48 bg-gray-100">
                    <ObjectMapPhoto image={object.featuredPhoto} />
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <Mui.Button
                  onClick={() => {
                    setOpenInfo(false);
                    onObjectSelect(object.id);
                  }}
                >
                  Peržiūrėti <Icons.Visibility />
                </Mui.Button>
              </div>
            </div>
          </InfoWindowF>
        )}
      </MarkerF>
    </>
  );
};

export default React.memo(CampaignPlanesMapMarker);

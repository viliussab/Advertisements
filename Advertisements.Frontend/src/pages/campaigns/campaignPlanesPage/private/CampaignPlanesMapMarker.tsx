import { InfoWindowF, MarkerF } from '@react-google-maps/api';
import React from 'react';
import { AdvertObjectOfArea } from '../../../../api/responses/type.AreaDetailed';
import Icons from '../../../../config/imports/Icons';
import Mui from '../../../../config/imports/Mui';
import ObjectMapPhoto from '../../../advert/objectMapPage/private/ObjectMapPhoto';
import { SelectStatus } from './type.CampaignPlanesPage';

type Props = {
  object: AdvertObjectOfArea;
  onObjectSelect: (id: string) => void;
  selectStatus: SelectStatus;
  clusterer: any;
};

const CampaignPlanesMapMarker = ({
  object,
  onObjectSelect,
  selectStatus,
  clusterer,
}: Props) => {
  const [anchor, setAnchor] = React.useState<google.maps.MVCObject>();
  const [openInfo, setOpenInfo] = React.useState(false);

  const onLoad = (marker: google.maps.Marker) => {
    setAnchor(marker);
  };

  const getIcon = () => {
    if (selectStatus === 'unselected') {
      return '/pins/red-pin.svg';
    }

    if (selectStatus === 'selected') {
      return '/pins/green-pin.svg';
    }

    if (selectStatus === 'notSelectable') {
      return '/pins/grey-pin.svg';
    }

    if (selectStatus === 'hovered') {
      return '/pins/blue-pin.svg';
    }
  };

  return (
    <>
      <MarkerF
        key={object.id}
        onLoad={onLoad}
        clusterer={clusterer}
        onMouseDown={() => {
          setOpenInfo((prev) => !prev);
        }}
        options={{
          icon: getIcon(),
        }}
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
                  <div className="h-32 w-48 bg-gray-100">
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
                  Pasirinkti <Icons.Visibility />
                </Mui.Button>
              </div>
            </div>
          </InfoWindowF>
        )}
      </MarkerF>
    </>
  );
};

export default CampaignPlanesMapMarker;

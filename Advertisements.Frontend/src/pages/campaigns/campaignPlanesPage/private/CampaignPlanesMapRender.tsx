import React from 'react';
import Area from '../../../../api/responses/type.Area';
import {
  GoogleMap,
  MarkerClustererF,
  useLoadScript,
} from '@react-google-maps/api';
import Mui from '../../../../config/imports/Mui';
import mapFunctions from '../../../../functions/mapFunctions';
import Icons from '../../../../config/imports/Icons';
import { AdvertObjectOfArea } from '../../../../api/responses/type.AreaDetailed';
import CampaignPlanesMapMarker from './CampaignPlanesMapMarker';
import AdvertPlaneOfCampaign from '../../../../api/responses/type.AdvertPlaneOfCampaign';

type Props = {
  area: Area | undefined;
  className: string;
  objects: AdvertObjectOfArea[];
  selectedPlanes: AdvertPlaneOfCampaign[];
  onObjectSelect: (objectId: string) => void;
};

const key = import.meta.env.VITE_GOOGLE_API_KEY;

function CampaignPlanesMapRender(props: Props) {
  const { area, className, objects, onObjectSelect, selectedPlanes } = props;

  const mapRef = React.useRef<google.maps.Map>();
  const boundaries = React.useMemo(
    () =>
      !!area && {
        sw: {
          lat: area.latitudeSouth,
          lng: area.longitudeWest,
        },
        ne: {
          lat: area.latitudeNorth,
          lng: area.longitudeWest,
        },
      },
    [area],
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  });

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  if (!isLoaded || !boundaries || !area) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <Mui.CircularProgress />
      </div>
    );
  }

  const getMarkerStatus = (object: AdvertObjectOfArea) => {
    const planeFound = (selectedPlanes || []).find((p) =>
      object.planes.some((y) => y.id === p.id),
    );

    if (planeFound) {
      return 'selected';
    }

    return 'unselected';
  };

  return (
    <GoogleMap
      onLoad={onLoad}
      zoom={mapFunctions.getBoundsZoomLevel(boundaries) + 1.2}
      mapContainerClassName={className}
      center={mapFunctions.getCenter(area)}
    >
      <MarkerClustererF minimumClusterSize={1000}>
        {(clusterer) => (
          <>
            {objects.map((o) => (
              <CampaignPlanesMapMarker
                onObjectSelect={onObjectSelect}
                key={o.id}
                object={o}
                clusterer={clusterer}
                selectStatus={getMarkerStatus(o)}
              />
            ))}
          </>
        )}
      </MarkerClustererF>
      <div>
        <Mui.Fab
          variant="extended"
          color="primary"
          className="absolute top-4 left-2"
        >
          <Icons.Refresh sx={{ mr: 1 }} />
          Sąrašas
        </Mui.Fab>
      </div>
      <div>
        <Mui.Fab variant="extended" className="absolute top-8 left-2">
          <Icons.FilterAlt sx={{ mr: 1 }} />
          Filtrai
        </Mui.Fab>
      </div>
    </GoogleMap>
  );
}

export default CampaignPlanesMapRender;

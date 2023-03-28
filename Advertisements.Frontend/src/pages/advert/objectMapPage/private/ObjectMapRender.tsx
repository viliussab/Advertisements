import React from 'react';
import Area from '../../../../api/responses/type.Area';
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';
import Mui from '../../../../config/imports/Mui';
import AdvertObjectOverview from '../../../../api/responses/type.AdvertObjectOverview';
import mapFunctions from '../../../../functions/mapFunctions';
import { getTableContainerUtilityClass } from '@mui/material';
import ObjectMapMarker from './ObjectMapMarker';

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  area: Area | undefined;
  className: string;
  objects: AdvertObjectOverview[];
  onObjectSelect: (id: string) => void;
};

const key = import.meta.env.VITE_GOOGLE_API_KEY;

function ObjectMapRender(props: Props) {
  const { area, className, objects, onObjectSelect } = props;

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
    console.log('reloaded');
    mapRef.current = map;
  };

  if (!isLoaded || !boundaries || !area) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <Mui.CircularProgress />
      </div>
    );
  }

  return (
    <GoogleMap
      onLoad={onLoad}
      zoom={mapFunctions.getBoundsZoomLevel(boundaries)}
      mapContainerClassName={className}
      center={mapFunctions.getCenter(area)}
    >
      {objects.map((o) => (
        <ObjectMapMarker
          onObjectSelect={onObjectSelect}
          key={o.id}
          object={o}
        />
      ))}
    </GoogleMap>
  );
}

export default ObjectMapRender;

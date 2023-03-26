import React from 'react';
import Area from '../../../../api/responses/type.Area';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import Mui from '../../../../config/imports/Mui';
import AdvertObjectOverview from '../../../../api/responses/type.AdvertObjectOverview';

type LatLngLiteral = google.maps.LatLngLiteral;
type bound = google.maps.LatLngBounds;

type Props = {
  area: Area;
  marker: LatLngLiteral;
  className: string;
  objects: AdvertObjectOverview[];
};

const key = import.meta.env.VITE_GOOGLE_API_KEY;

function Map(props: Props) {
  const { area, className } = props;

  const mapRef = React.useRef<google.maps.Map>();
  const marker = React.useMemo(() => props.marker, [props.marker]);
  const boundaries = React.useMemo(
    () => ({
      sw: {
        lat: area.latitudeSouth,
        lng: area.longitudeWest,
      },
      ne: {
        lat: area.latitudeNorth,
        lng: area.longitudeWest,
      },
    }),
    [area],
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  });

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    map.fitBounds(
      new google.maps.LatLngBounds(boundaries.sw, boundaries.ne),
      4,
    );
    map.panTo(marker);
  };

  if (!isLoaded) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <Mui.CircularProgress />
      </div>
    );
  }

  return (
    <GoogleMap
      onLoad={onLoad}
      center={marker}
      mapContainerClassName={className}
    >
      <MarkerF position={marker} />
    </GoogleMap>
  );
}

export default Map;

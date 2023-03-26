import React from 'react';
import Area from '../../../../api/responses/type.Area';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import Mui from '../../../../config/imports/Mui';

type LatLngLiteral = google.maps.LatLngLiteral;
type bound = google.maps.LatLngBounds;

type Props = {
  selectedArea: Area;
  marker: LatLngLiteral;
  className: string;
  setMarker: (latitude: number, longitude: number) => void;
};

const key = import.meta.env.VITE_GOOGLE_API_KEY;

function ObjectCRUDMap(props: Props) {
  const { selectedArea, className, setMarker } = props;

  const mapRef = React.useRef<google.maps.Map>();
  const marker = React.useMemo(() => props.marker, [props.marker]);
  const boundaries = React.useMemo(
    () => ({
      sw: {
        lat: selectedArea.latitudeSouth,
        lng: selectedArea.longitudeWest,
      },
      ne: {
        lat: selectedArea.latitudeNorth,
        lng: selectedArea.longitudeWest,
      },
    }),
    [selectedArea],
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

  const onMarkerDrag = (e: google.maps.MapMouseEvent) => {
    const mark = {
      lat: e.latLng?.lat()!,
      lng: e.latLng?.lng()!,
    };

    setMarker(mark.lat, mark.lng);
    mapRef.current?.panTo(mark);
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
      <MarkerF position={marker} draggable onDragEnd={onMarkerDrag} />
    </GoogleMap>
  );
}

export default ObjectCRUDMap;

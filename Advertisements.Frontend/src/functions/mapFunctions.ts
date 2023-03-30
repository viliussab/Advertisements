import Area from '../api/responses/type.Area';

const key = import.meta.env.VITE_GOOGLE_API_KEY;

type Bounds = {
  sw: {
    lat: number;
    lng: number;
  };
  ne: {
    lat: number;
    lng: number;
  };
};

type getStreetviewUrlProps = {
  latitude: number;
  longitude: number;
};

const getStreetviewUrl = ({ latitude, longitude }: getStreetviewUrlProps) =>
  `http://maps.google.com/maps?q=&layer=c&cbll=${latitude},${longitude}`;

type generateViewSourceProps = {
  longitude: number;
  latitude: number;
  zoom: number;
};

const generateViewSource = ({
  longitude,
  latitude,
  zoom,
}: generateViewSourceProps) => {
  return `https://www.google.com/maps/embed/v1/view?key=${key}
    &center=${latitude},${longitude}
    &zoom=${zoom}`;
};

const getCenter = (area: Area) => {
  const lat = (area.latitudeSouth + area.latitudeNorth) / 2;
  const lng = (area.longitudeEast + area.longitudeWest) / 2;

  return { lat, lng };
};

function getBoundsZoomLevel(bounds: Bounds) {
  function latRad(lat: number) {
    const sin = Math.sin((lat * Math.PI) / 180);
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  const latDif = Math.abs(latRad(bounds.ne.lat) - latRad(bounds.sw.lat));
  const lngDif = Math.abs(bounds.ne.lng - bounds.sw.lng);

  const latFrac = latDif / Math.PI;
  const lngFrac = lngDif / 360;

  const lngZoom = Math.log(1 / latFrac) / Math.log(2);
  const latZoom = Math.log(1 / lngFrac) / Math.log(2);

  return Math.min(lngZoom, latZoom);
}

const mapFunctions = {
  getStreetviewUrl,
  generateViewSource,
  getBoundsZoomLevel,
  getCenter,
};

export default mapFunctions;

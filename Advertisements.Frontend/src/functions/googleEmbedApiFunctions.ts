type generateViewSourceProps = {
  longitude: number;
  latitude: number;
  zoom: number;
};

const key = import.meta.env.VITE_GOOGLE_API_KEY;

const generateViewSource = ({
  longitude,
  latitude,
  zoom,
}: generateViewSourceProps) => {
  return `https://www.google.com/maps/embed/v1/view?key=${key}
    &center=${latitude},${longitude}
    &zoom=${zoom}`;
};

const googleEmbedApiFunctions = {
  generateViewSource,
};

export default googleEmbedApiFunctions;

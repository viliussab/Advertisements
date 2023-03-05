import AdvertType from '../types/type.AdvertType';
import Area from '../types/type.Area';
import api from './api';

const getTypesAsync = async () => {
  const response = await api.queryAsync(api.endpoints.query.advert.types);

  return response.data as AdvertType[];
};

const getAreasAsync = async () => {
  const response = await api.queryAsync(api.endpoints.query.advert.areas);

  return response.data as Area[];
};

const advertQueries = {
  types: {
    fn: getTypesAsync,
    key: 'types',
  },
  areas: {
    fn: getAreasAsync,
    key: 'areas',
  },
};

export default advertQueries;

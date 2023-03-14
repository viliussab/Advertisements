import { AdvertPlaneWithObjects } from '../responses/type.AdvertPlane';
import AdvertType from '../responses/type.AdvertType';
import Area from '../responses/type.Area';
import PageResponse from '../responses/type.PageResponse';
import api from './api';

const getTypesAsync = async () => {
  const response = await api.queryAsync(api.endpoints.query.advert.types);

  return response.data as AdvertType[];
};

const getAreasAsync = async () => {
  const response = await api.queryAsync(api.endpoints.query.advert.areas);

  return response.data as Area[];
};

const getPagedPlanesAsync = async () => {
  const response = await api.queryAsync(api.endpoints.query.advert.planes);

  return response.data as PageResponse<AdvertPlaneWithObjects>;
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
  pagedPlanes: {
    fn: getPagedPlanesAsync,
    key: 'pagedPlanes',
  },
};

export default advertQueries;

import PageQuery from '../queries/type.PageQuery';
import AdvertObjectDetailed from '../responses/type.AdvertObjectDetailed';
import AdvertPlaneOverview from '../responses/type.AdvertPlaneOverview';
import AdvertType from '../responses/type.AdvertType';
import Area from '../responses/type.Area';
import PageResponse from '../responses/type.PageResponse';
import api from './api';
import AreaDetailed from './../responses/type.AreaDetailed';

const getTypesAsync = async () => {
  const response = await api.queryAsync({
    url: api.endpoints.common.advert.type,
  });

  return response.data as AdvertType[];
};

const getAreasAsync = async () => {
  const response = await api.queryAsync({
    url: api.endpoints.common.advert.area,
  });

  return response.data as Area[];
};

const getPagedPlanesAsync = async (query: PageQuery) => {
  const response = await api.queryAsync({
    url: api.endpoints.common.advert.plane,
    query,
  });

  return response.data as PageResponse<AdvertPlaneOverview>;
};

const getObjectAsync = async (id: string) => {
  const response = await api.queryAsync({
    url: `${api.endpoints.common.advert.object}/${id}`,
  });

  return response.data as AdvertObjectDetailed;
};

const getKaunasAsync = async () => {
  const response = await api.queryAsync({
    url: `${api.endpoints.common.advert.area}/Kaunas`,
  });

  return response.data as AreaDetailed;
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
  object: {
    fn: getObjectAsync,
    key: 'object',
  },
  areaKaunas: {
    fn: getKaunasAsync,
    key: 'area_kaunas',
  },
};

export default advertQueries;

import GetByIdQuery from '../queries/type.GetByIdQuery';
import PageQuery from '../queries/type.PageQuery';
import AdvertObjectDetailed from '../responses/type.AdvertObjectDetailed';
import AdvertPlaneOverview from '../responses/type.AdvertPlaneOverview';
import AdvertType from '../responses/type.AdvertType';
import Area from '../responses/type.Area';
import PageResponse from '../responses/type.PageResponse';
import api from './api';

const getTypesAsync = async () => {
  const response = await api.queryAsync({
    url: api.endpoints.common.advert.types,
  });

  return response.data as AdvertType[];
};

const getAreasAsync = async () => {
  const response = await api.queryAsync({
    url: api.endpoints.common.advert.areas,
  });

  return response.data as Area[];
};

const getPagedPlanesAsync = async (query: PageQuery) => {
  const response = await api.queryAsync({
    url: api.endpoints.common.advert.planes,
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
};

export default advertQueries;

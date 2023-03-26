import { CreateAdvertObject } from '../commands/schema.createAdvertObject';
import { UpdateAdvertObject } from '../commands/schema.updateAdvertObject';
import api from './api';

const createAdvertAsync = async (values: CreateAdvertObject) => {
  const response = await api.mutateAsync({
    url: api.endpoints.common.advert.object,
    body: values,
    httpMethod: 'post',
  });

  return response;
};

type updateAdvertAsyncProps = {
  id: string;
  values: UpdateAdvertObject;
};

const updateAdvertAsync = async ({ id, values }: updateAdvertAsyncProps) => {
  const response = await api.mutateAsync({
    url: `${api.endpoints.common.advert.object}/${id}`,
    body: values,
    httpMethod: 'put',
  });

  return response;
};

const advertMutations = {
  objectCreate: {
    fn: createAdvertAsync,
    key: 'advert_create',
  },
  objectUpdate: {
    fn: updateAdvertAsync,
    key: 'advert_update',
  },
};

export default advertMutations;

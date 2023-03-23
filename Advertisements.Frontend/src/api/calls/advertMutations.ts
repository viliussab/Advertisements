import { CreateAdvertObject } from '../commands/schema.createAdvertObject';
import { UpdateAdvertObject } from '../commands/schema.updateAdvertObject';
import api from './api';

const createAdvertAsync = async (values: CreateAdvertObject) => {
  const response = await api.mutateAsync({
    url: api.endpoints.mutate.advert.object,
    body: values,
    httpMethod: 'post',
  });

  return response;
};

const updateAdvertAsync = async (values: UpdateAdvertObject) => {
  const response = await api.mutateAsync({
    url: api.endpoints.mutate.advert.object,
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
};

export default advertMutations;

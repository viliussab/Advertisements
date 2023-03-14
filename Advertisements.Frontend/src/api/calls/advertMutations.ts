import { CreateAdvertObject } from '../commands/schema.createAdvertObject';
import api from './api';

const createAdvert = async (values: CreateAdvertObject) => {
  const response = await api.mutateAsync({
    url: api.endpoints.mutate.advert.object,
    body: values,
    httpMethod: 'post',
  });

  return response;
};

const advertMutations = {
  objectCreate: {
    fn: createAdvert,
    key: 'advert_create',
  },
};

export default advertMutations;

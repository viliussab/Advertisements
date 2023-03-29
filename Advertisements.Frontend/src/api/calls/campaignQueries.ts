import Customer from '../responses/type.Customer';
import api from './api';

const getCustomersAsync = async () => {
  const response = await api.queryAsync({
    url: api.endpoints.common.campaigns.customer,
  });

  return response.data as Customer[];
};

const campaignQueries = {
  customers: {
    fn: getCustomersAsync,
    key: 'customers',
  },
};

export default campaignQueries;

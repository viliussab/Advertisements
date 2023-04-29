import api from './api';
import { LoginCommand } from '../commands/schema.login';

const loginAsync = async (request: LoginCommand) => {
  await api.mutateAsync({
    url: api.endpoints.auth.login,
    body: request,
    httpMethod: 'post',
  });
};

const logoutAsync = async () => {
  await api.mutateAsync({
    httpMethod: 'post',
    body: undefined,
    url: api.endpoints.auth.logout,
  });
};

const authMutations = {
  login: {
    fn: loginAsync,
    key: 'login',
  },
  logout: {
    fn: logoutAsync,
    key: 'logout',
  },
};

export default authMutations;

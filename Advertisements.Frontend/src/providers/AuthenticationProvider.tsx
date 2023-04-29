import React, { createContext } from 'react';
import { toast } from 'react-toastify';
import api from '../api/calls/api';
import { LoginCommand } from '../api/commands/schema.login';

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  isLoggedIn: boolean;
  id?: string;
  email?: string;
  loginAsync: (request: LoginCommand) => Promise<void>;
  logoutAsync: () => Promise<void>;
};

type User = {
  id: string;
  email: string;
};

export const UserContext = createContext<ContextProps>({
  isLoggedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loginAsync: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logoutAsync: async () => {},
});

function AuthenticationProvider({ children }: Props) {
  const [isUserLoading, setIsUserLoading] = React.useState(true);
  const [user, setUser] = React.useState<User>();

  const logoutAsync = async () => {
    try {
      await api.mutateAsync({
        httpMethod: 'post',
        body: undefined,
        url: api.endpoints.auth.logout,
      });
    } finally {
      setUser(undefined);
      getUserInfoAsync();
    }
  };

  const loginAsync = async (request: LoginCommand) => {
    try {
      await api.mutateAsync({
        url: api.endpoints.auth.login,
        body: request,
        httpMethod: 'post',
      });
      getUserInfoAsync();
    } catch {
      toast.error('Neteisingi prisijungimo duomenys');
    }
  };

  const getUserInfoAsync = async () => {
    setIsUserLoading(true);
    try {
      const response = await api.queryAsync({ url: api.endpoints.auth.me });
      setUser(response.data as User);
    } finally {
      setIsUserLoading(false);
    }
  };

  React.useEffect(() => {
    getUserInfoAsync();
  }, []);

  const isLoggedIn = !!user;

  const userContextValue = {
    ...user,
    isLoggedIn,
    loginAsync,
    logoutAsync,
  };

  if (isUserLoading) {
    return null;
  }

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default AuthenticationProvider;

import axios from 'axios';
import React, { createContext } from 'react';
import api from '../api/calls/api';

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  isLoggedIn: boolean;
  id?: string;
  email?: string;
};

type User = {
  id: string;
  email: string;
};

export const UserContext = createContext<ContextProps>({
  isLoggedIn: false,
});

function AuthenticationProvider({ children }: Props) {
  const [isUserLoading, setIsUserLoading] = React.useState(true);
  const [user, setUser] = React.useState<User>();

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

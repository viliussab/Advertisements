import routes, { Route } from '../config/routes';
import {
  Route as RRD_Route,
  BrowserRouter,
  Routes,
  Navigate,
} from 'react-router-dom';
import Layout from '../components/private/layout/Layout';
import { UserContext } from './AuthenticationProvider';
import React from 'react';
import website_paths from '../config/website_paths';

function PagesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <RRD_Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute route={route} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

type ProtectedRouteProps = {
  route: Route;
};

function ProtectedRoute({ route }: ProtectedRouteProps) {
  const user = React.useContext(UserContext);

  // if (!route.allowAnonymous && !user.isLoggedIn) {
  //   return <Navigate to={website_paths.auth.login} replace />;
  // }

  return <Layout route={route} />;
}

export default PagesProvider;

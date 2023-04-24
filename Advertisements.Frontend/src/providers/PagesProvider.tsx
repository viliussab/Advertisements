import routes, { Route } from '../config/routes';
import { Route as RRD_Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from '../components/private/layout/Layout';

function PagesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <RRD_Route
            key={route.path}
            path={route.path}
            element={<Layout route={route} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default PagesProvider;

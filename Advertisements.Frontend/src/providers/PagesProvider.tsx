import routes, { Route } from '../config/routes';
import { Route as RRD_Router, BrowserRouter, Routes } from 'react-router-dom';

function PagesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <RRD_Router
            key={route.path}
            path={route.path}
            element={<route.Page />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

function Layout(route: Route) {
  if (!route.layout) {
    return <route.Page />;
  }

  return;
}

export default PagesProvider;

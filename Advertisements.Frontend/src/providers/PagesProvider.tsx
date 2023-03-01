import routes from "../config/routes";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function PagesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.Page />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default PagesProvider;

import React from 'react';
import { Route } from '../../../config/routes';
import Navbar from './Navbar';

type Props = {
  route: Route;
};

function Layout({ route }: Props) {
  if (!route.layout) {
    return <route.Page />;
  }

  return (
    <>
      <Navbar />
      <route.Page />
    </>
  );
}

export default Layout;

import { ReactElement } from 'react';
import ObjectCreatePage from '../pages/advert/ObjectCreatePage';
import ObjectsListPage from '../pages/advert/ObjectsListPage';
import CampaignsViewPage from '../pages/campaigns/CampaignsViewPage';
import website_paths from './website_paths';

export type Route = {
  path: string;
  Page: () => ReactElement;
  layout: boolean;
};

const routes: Array<Route> = [
  {
    path: website_paths.campaigns.main,
    Page: CampaignsViewPage,
    layout: true,
  },
  {
    path: website_paths.objects.create,
    Page: ObjectCreatePage,
    layout: true,
  },
  {
    path: website_paths.objects.main,
    Page: ObjectsListPage,
    layout: true,
  },
];

export default routes;

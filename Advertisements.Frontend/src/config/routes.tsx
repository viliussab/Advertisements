import { ReactElement } from 'react';
import ObjectCreatePage from '../pages/advert/objectCreatePage/ObjectCreatePage';
import ObjectsListPage from '../pages/advert/ObjectsListPage';
import ObjectUpdatePage from '../pages/advert/objectUpdatePage/ObjectUpdatePage';
import CampaignsViewPage from '../pages/campaigns/CampaignsViewPage';
import website_paths from './website_paths';

export type Route = {
  path: string;
  Page: () => ReactElement;
  layout?: {
    title: string;
  };
};

const routes: Array<Route> = [
  {
    path: website_paths.campaigns.main,
    Page: CampaignsViewPage,
    layout: {
      title: 'Kampanijų sąrašas',
    },
  },
  {
    path: website_paths.objects.create,
    Page: ObjectCreatePage,
    layout: {
      title: 'Kurti objektą',
    },
  },
  {
    path: website_paths.objects.edit,
    Page: ObjectUpdatePage,
    layout: {
      title: 'Redaguoti objektą',
    },
  },
  {
    path: website_paths.objects.main,
    Page: ObjectsListPage,
    layout: {
      title: 'Objektų sąrašas',
    },
  },
];

export default routes;

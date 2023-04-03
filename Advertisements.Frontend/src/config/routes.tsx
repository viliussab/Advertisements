import { ReactElement } from 'react';
import ObjectCreatePage from '../pages/advert/objectCreatePage/ObjectCreatePage';
import ObjectsListPage from '../pages/advert/objectListPage/ObjectsListPage';
import ObjectMapPage from '../pages/advert/objectMapPage/ObjectMapPage';
import ObjectUpdatePage from '../pages/advert/objectUpdatePage/ObjectUpdatePage';
import CampaignCreatePage from '../pages/campaigns/campaignCreatePage/CampaignCreatePage';
import CampaignsListPage from '../pages/campaigns/campaignsListPage/CampaignsListPage';
import CampaignUpdatePage from '../pages/campaigns/campaignUpdatePage/CampaignUpdatePage';
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
    Page: CampaignsListPage,
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
    path: website_paths.objects.map,
    Page: ObjectMapPage,
    layout: {
      title: 'Objektų žemėlapis',
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
  {
    path: website_paths.campaigns.create,
    Page: CampaignCreatePage,
    layout: {
      title: 'Kurti reklamos pasiūlymą',
    },
  },
  {
    path: website_paths.campaigns.edit,
    Page: CampaignUpdatePage,
    layout: {
      title: 'Keisti reklamos pasiūlymą',
    },
  },
];

export default routes;

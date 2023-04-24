const website_paths = {
  objects: {
    map: '/objects/map',
    edit: '/objects/:id',
    create: '/objects/create',
    main: '/objects',
  },
  campaigns: {
    create: '/campaigns/create',
    edit: '/campaigns/:id',
    edit_detalize: '/campaigns/:id/planes',
    main: '/',
    weekly_overview: '/campaigns/weekly-overview',
  },
  customers: {
    main: '/customers',
  },
  adverts: {
    weekly_occupancy: '/adverts/occupancy',
  },
  auth: {
    login: '/login',
  },
};

export default website_paths;

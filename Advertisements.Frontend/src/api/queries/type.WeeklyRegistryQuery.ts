import PageQuery from './type.PageQuery';

type WeeklyRegistryQuery = PageQuery & {
  from: Date;
  name?: string;
  address?: string;
  side?: string;
  region?: string;
  premium?: boolean;
};

export default WeeklyRegistryQuery;

import PageQuery from './type.PageQuery';

type ObjectsQuery = PageQuery & {
  name?: string;
  address?: string;
  side?: string;
  region?: string;
  illuminated?: boolean;
  premium?: boolean;
};

export default ObjectsQuery;

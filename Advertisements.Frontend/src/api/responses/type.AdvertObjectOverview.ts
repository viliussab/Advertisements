import AdvertObject from './type.AdvertObject';
import AdvertPlane from './type.AdvertPlane';
import AdvertType from './type.AdvertType';

type AdvertObjectOverview = AdvertObject & {
  planes: AdvertPlane[];
  type: AdvertType;
};

export default AdvertObjectOverview;

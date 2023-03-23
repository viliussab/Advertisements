import AdvertObject from './type.AdvertObject';
import AdvertPlane from './type.AdvertPlane';
import AdvertType from './type.AdvertType';
import Area from './type.Area';

type AdvertPlaneOverview = AdvertPlane & {
  object: AdvertObject & {
    area: Area;
    type: AdvertType;
  };
};

export default AdvertPlaneOverview;

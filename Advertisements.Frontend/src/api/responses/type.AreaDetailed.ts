import Area from './type.Area';
import AdvertObject from './type.AdvertObject';
import AdvertPlane from './type.AdvertPlane';
import AdvertType from './type.AdvertType';

type AreaDetailed = Area & {
  objects: (AdvertObject & {
    planes: AdvertPlane[];
    type: AdvertType;
  })[];
};

export default AreaDetailed;

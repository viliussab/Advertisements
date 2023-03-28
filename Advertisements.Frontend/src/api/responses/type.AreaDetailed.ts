import Area from './type.Area';
import AdvertObject from './type.AdvertObject';
import AdvertPlane from './type.AdvertPlane';

type AreaDetailed = Area & {
  objects: (AdvertObject & {
    planes: AdvertPlane[];
  })[];
};

export default AreaDetailed;

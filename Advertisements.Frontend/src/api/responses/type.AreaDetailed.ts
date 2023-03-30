import Area from './type.Area';
import AdvertObject from './type.AdvertObject';
import AdvertPlane from './type.AdvertPlane';
import AdvertType from './type.AdvertType';
import FileResponse from './type.FileResponse';

type AreaDetailed = Area & {
  objects: AdvertObjectOfArea[];
};

export type AdvertObjectOfArea = AdvertObject & {
  planes: AdvertPlane[];
  type: AdvertType;
  featuredPhoto: FileResponse;
};

export default AreaDetailed;

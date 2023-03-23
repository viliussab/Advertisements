import AdvertObject from './type.AdvertObject';
import AdvertPlane from './type.AdvertPlane';
import FileResponse from './type.FileResponse';

type AdvertObjectDetailed = AdvertObject & {
  planes: AdvertPlaneWPhotos[];
};

type AdvertPlaneWPhotos = AdvertPlane & {
  photos: FileResponse[];
};

export default AdvertObjectDetailed;

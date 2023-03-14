import AdvertObject from './type.AdvertObject';
import AdvertType from './type.AdvertType';
import Area from './type.Area';

type AdvertPlane = {
  id: string;
  objectId: string;
  partialName: string;
  isPermitted: false;
  permissionExpiryDate?: string;
  isPremium: boolean;
};

export type AdvertPlaneWithObjectsHasAreaAndType = AdvertPlane & {
  object: AdvertObject & {
    area: Area;
    type: AdvertType;
  };
};

export default AdvertPlane;

import AdvertObject from './type.AdvertObject';

type AdvertPlane = {
  id: string;
  objectId: string;
  partialName: string;
  isPermitted: false;
  permissionExpiryDate: Date;
  isPremium: boolean;
};

export type AdvertPlaneWithObjects = AdvertPlane & {
  object: AdvertObject;
};

export default AdvertPlane;

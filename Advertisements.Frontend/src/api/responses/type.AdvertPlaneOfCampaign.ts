import AdvertObject from './type.AdvertObject';
import AdvertPlane from './type.AdvertPlane';
import AdvertType from './type.AdvertType';

type AdvertPlaneOfCampaign = AdvertPlane & {
  weekFrom: Date;
  weekTo: Date;
  object: AdvertObject & {
    type: AdvertType;
  };
};

export default AdvertPlaneOfCampaign;

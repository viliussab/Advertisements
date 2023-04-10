import AdvertObject from './type.AdvertObject';
import AdvertPlane from './type.AdvertPlane';
import AdvertType from './type.AdvertType';
import Area from './type.Area';

type AdvertPlaneOfCampaign = AdvertPlane & {
  weekFrom: Date;
  weekTo: Date;
  object: AdvertObject & {
    area: Area;
    type: AdvertType;
  };
};

export default AdvertPlaneOfCampaign;

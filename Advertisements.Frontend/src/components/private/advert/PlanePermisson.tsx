import React from 'react';
import AdvertPlane from '../../../api/responses/type.AdvertPlane';
import dateFns from '../../../config/imports/dateFns';
import Icons from '../../../config/imports/Icons';
import dateFunctions from '../../../functions/dateFunctions';

type Props = {
  plane: AdvertPlane;
};

const PlanePermisson = ({ plane }: Props) => {
  if (!plane.isPermitted || !plane.permissionExpiryDate) {
    return (
      <div className="text-sm text-red-800">
        <Icons.Warning sx={{ mr: 1 }} />
        Nėra leidimo
      </div>
    );
  }

  const expiryDate = new Date(plane.permissionExpiryDate);

  const daysLeft = dateFns.differenceInDays(expiryDate, Date.now());

  if (daysLeft <= 0) {
    return (
      <div className="text-sm text-red-800">
        <Icons.Warning sx={{ mr: 1 }} />
        Pasibaigęs leidimas
      </div>
    );
  }

  const twoMonthsInDays = 60;

  if (daysLeft <= twoMonthsInDays) {
    return (
      <div className="text-sm text-yellow-500">
        <Icons.Warning sx={{ mr: 1 }} />
        {`Leidimas pasibaigs už ${daysLeft} d.`}
      </div>
    );
  }

  return (
    <div className="text-sm">{`Galioja iki ${dateFunctions.format(
      expiryDate,
    )}`}</div>
  );
};

export default PlanePermisson;

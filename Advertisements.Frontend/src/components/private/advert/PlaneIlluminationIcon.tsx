import React from 'react';
import Icons from '../../../config/imports/Icons';

type Props = {
  illuminated: boolean;
};

const PlaneIlluminationIcon = ({ illuminated }: Props) => {
  return (
    <>
      {illuminated ? (
        <Icons.LightMode className="text-yellow-300" />
      ) : (
        <Icons.LightMode className="text-gray-200" />
      )}
    </>
  );
};

export default PlaneIlluminationIcon;

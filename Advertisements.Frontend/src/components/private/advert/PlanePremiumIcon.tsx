import React from 'react';
import Icons from '../../../config/imports/Icons';

type Props = {
  isPremium: boolean;
};

function PlanePremiumIcon({ isPremium }: Props) {
  return (
    <>
      {isPremium ? (
        <Icons.Star className="text-amber-400" />
      ) : (
        <Icons.Star className="text-gray-200" />
      )}
    </>
  );
}

export default PlanePremiumIcon;

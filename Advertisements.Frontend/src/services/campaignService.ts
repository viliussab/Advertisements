import { CampaignCreateUpdate } from '../api/commands/schema.createUpdateCampaign';
import constants from '../config/constants';
import dateFns from '../config/imports/dateFns';
import dateFunctions from '../functions/dateFunctions';

const getEstimateProps = (campaign: CampaignCreateUpdate) => {
  const planePrice = campaign.pricePerPlane || constants.initial_plane_price;

  const weekPeriod =
    !!campaign.periodStart && !!campaign.periodEnd
      ? dateFunctions.formatPeriodShort(
          campaign.periodStart,
          campaign.periodEnd,
        )
      : '-';

  const weekCount =
    !!campaign.periodStart && !!campaign.periodEnd
      ? dateFns.differenceInWeeks(campaign.periodEnd, campaign.periodStart) + 1
      : 0;

  const stopPriceDiscounted = campaign.discountPercent
    ? planePrice * ((100 - campaign.discountPercent) / 100)
    : planePrice;

  const pressUnits =
    !!campaign.planeAmount && !!campaign.requiresPrinting
      ? Math.round(campaign.planeAmount * constants.press_print_ratio)
      : 0;

  const pressUnitsPrice = pressUnits * constants.press_price;

  const unplannedPrice =
    !!campaign.planeAmount &&
    !dateFunctions.isCampaignWeekday(campaign.periodStart)
      ? constants.unplanned_plane_fee * campaign.planeAmount
      : 0;

  const sideTotalPrice =
    (campaign.planeAmount || 0) * weekCount * stopPriceDiscounted;

  const totalPriceNoVat = pressUnitsPrice + unplannedPrice + sideTotalPrice;

  const totalPriceVat = totalPriceNoVat * (1 + constants.vat);

  return {
    weekCount,
    weekPeriod,
    isUnplanned: !dateFunctions.isCampaignWeekday(campaign.periodStart),
    stopPriceDiscounted: stopPriceDiscounted.toFixed(2),
    sideTotalPrice: sideTotalPrice.toFixed(2),
    pressUnitsPrice: pressUnitsPrice.toFixed(2),
    pressUnits,
    unplannedPrice: unplannedPrice.toFixed(2),
    totalPriceNoVat: totalPriceNoVat.toFixed(2),
    totalPriceVat: totalPriceVat.toFixed(2),
  };
};

const campaignService = {
  getEstimateProps,
};

export default campaignService;

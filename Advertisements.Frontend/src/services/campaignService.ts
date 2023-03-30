import { CampaignCreateUpdate } from '../api/commands/schema.createUpdateCampaign';
import constants from '../config/constants';
import dateFns from '../config/imports/dateFns';
import dateFunctions from '../functions/dateFunctions';

const getEstimate = (campaign: CampaignCreateUpdate) => {
  const planePrice =
    parseInt(campaign.pricePerPlane.toString(), 10) ||
    constants.initial_plane_price;

  const weekPeriod =
    !!campaign.periodStart && !!campaign.periodEnd
      ? dateFunctions.formatWeekPeriodShort(
          campaign.periodStart,
          campaign.periodEnd,
        )
      : '-';

  const weekCount =
    !!campaign.periodStart && !!campaign.periodEnd
      ? dateFns.differenceInWeeks(campaign.periodEnd, campaign.periodStart) + 1
      : 0;

  const planePriceDiscounted = campaign.discountPercent
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

  const planesPrice = (campaign.planeAmount || 0) * weekCount * planePrice;

  const planesPriceDiscounted =
    planePriceDiscounted * weekCount * (campaign.planeAmount || 0);

  const totalPriceNoVat =
    planesPriceDiscounted + unplannedPrice + pressUnitsPrice;
  const totalPriceOnlyVat = totalPriceNoVat * constants.vat;

  const totalPriceVat = totalPriceNoVat * (1 + constants.vat);

  return {
    weekCount,
    weekPeriod,
    plane: {
      price: planePrice.toFixed(2),
      totalPrice: planesPrice.toFixed(2),
      priceDiscounted: planePriceDiscounted.toFixed(2),
      totalDiscounted: planesPriceDiscounted.toFixed(2),
    },
    unplanned: {
      isUnplanned: !dateFunctions.isCampaignWeekday(campaign.periodStart),
      totalPrice: unplannedPrice.toFixed(2),
      price: constants.unplanned_plane_fee.toFixed(2),
    },
    press: {
      count: pressUnits,
      unitPrice: constants.press_price.toFixed(2),
      totalPrice: pressUnitsPrice.toFixed(2),
    },
    totalNoVat: totalPriceNoVat.toFixed(2),
    totalOnlyVat: totalPriceOnlyVat.toFixed(2),
    totalInclVat: totalPriceVat.toFixed(2),
  };
};

const campaignService = {
  getEstimate: getEstimate,
};

export default campaignService;

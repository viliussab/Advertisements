import { ca } from 'date-fns/locale';
import { date } from 'zod';
import AdvertPlaneOfCampaign from '../../../../api/responses/type.AdvertPlaneOfCampaign';
import Campaign from '../../../../api/responses/type.Campaign';
import dateFns from '../../../../config/imports/dateFns';
import { SelectedPlaneToEdit } from './type.CampaignPlanesPage';

type CampaignSelectRemainder = {
  left: number;
  weekFrom: Date;
  weekTo: Date;
};

type PlanesToFillForDate = {
  date: Date;
  left: number;
};

const getRemainders = (
  selected: AdvertPlaneOfCampaign[],
  campaign: Campaign,
) => {
  const start = new Date(campaign.start);
  const end = new Date(campaign.end);

  let leftArray = [] as PlanesToFillForDate[];

  const isInPlane = (plane: AdvertPlaneOfCampaign, date: Date) =>
    plane.weekFrom.getTime() <= date.getTime() &&
    plane.weekTo.getTime() >= date.getTime();

  for (
    let date = start;
    date.getTime() <= end.getTime();
    date = dateFns.addWeeks(date, 1)
  ) {
    const count = selected.filter((x) => isInPlane(x, date)).length;
    const left = campaign.planeAmount - count;

    leftArray = [...leftArray, { date, left }];
  }

  return leftArray;
};

const isCampaignPlanesFullfiled = (
  selected: AdvertPlaneOfCampaign[],
  campaign: Campaign,
) => {
  const lefts = getRemainders(selected, campaign);

  return lefts.every((x) => x.left === 0);
};

const campaignPLanesFunctions = {
  getRemainders,
  isCampaignPlanesFullfiled,
};

export default campaignPLanesFunctions;

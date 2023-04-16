import Campaign from '../../../../api/responses/type.Campaign';
import CampaignOverview from '../../../../api/responses/type.CampaignOverview';
import dateFns from '../../../../config/imports/dateFns';

type PlanesToFillForDate = {
  date: Date;
  left: number;
};

type CampaignPlanePeriod = {
  weekFrom: Date;
  weekTo: Date;
};

const getRemainders = (selected: CampaignPlanePeriod[], campaign: Campaign) => {
  const start = new Date(campaign.start);
  const end = new Date(campaign.end);

  let leftArray = [] as PlanesToFillForDate[];

  const isInPlane = (cp: CampaignPlanePeriod, date: Date) =>
    cp.weekFrom.getTime() <= date.getTime() &&
    cp.weekTo.getTime() >= date.getTime();

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
  selected: CampaignPlanePeriod[],
  campaign: Campaign,
) => {
  const lefts = getRemainders(selected, campaign);

  return lefts.every((x) => x.left === 0);
};

const getRemaindersCampaign = (campaign: CampaignOverview) => {
  const cps = campaign.campaignPlanes.map((cp) => ({
    weekFrom: new Date(cp.weekFrom),
    weekTo: new Date(cp.weekTo),
  }));

  return getRemainders(cps, campaign);
};

const isCampaignFullfiled = (campaign: CampaignOverview) => {
  const lefts = getRemaindersCampaign(campaign);

  console.log('lefts', lefts);

  return lefts.every((x) => x.left === 0);
};

const campaignPlanesFunctions = {
  getRemainders,
  getRemaindersCampaign,
  isCampaignFullfiled,
  isCampaignPlanesFullfiled,
};

export default campaignPlanesFunctions;

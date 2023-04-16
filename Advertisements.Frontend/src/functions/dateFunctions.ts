import constants from '../config/constants';
import dateFns from '../config/imports/dateFns';

const format = (date: Date) => {
  return dateFns.format(date, 'yyyy-MM-dd');
};

type weekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const getCurrentCampaignDay = () => {
  const lastDayOfWeek = dateFns.lastDayOfWeek(new Date(), {
    weekStartsOn: constants.week_starts_on as weekDay,
  });

  const campaignDayOfWeek = dateFns.addDays(lastDayOfWeek, -6);

  return campaignDayOfWeek;
};

const formatWeekPeriodShort = (dateFrom: Date, dateTo: Date) => {
  const weekFrom = dateFns.getWeek(dateFrom, {
    weekStartsOn: constants.week_starts_on as weekDay,
  });

  const weekTo = dateFns.getWeek(dateTo, {
    weekStartsOn: constants.week_starts_on as weekDay,
  });

  return `w${weekFrom}-${weekTo}`;
};

const toDateOnly = (date: Date) => {
  const dateOnly = new Date(date);
  dateOnly.setUTCHours(0, 0, 0, 0);

  return dateOnly;
};

const formatWeekShort = (date: Date) => {
  const weekFrom = dateFns.getWeek(date, {
    weekStartsOn: constants.week_starts_on as weekDay,
  });

  return `w${weekFrom}`;
};

const isCampaignWeekday = (date: Date) => {
  const dayofWeek = date.getDay();

  return dayofWeek === constants.week_starts_on;
};

const dateFunctions = {
  format: format,
  toDateOnly,
  getCurrentCampaignDay,
  formatWeekPeriodShort,
  formatWeekShort,
  isCampaignWeekday,
};

export default dateFunctions;

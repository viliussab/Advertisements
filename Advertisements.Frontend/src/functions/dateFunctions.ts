import constants from '../config/constants';
import dateFns from '../config/imports/dateFns';

const format = (date: Date) => {
  return dateFns.format(date, 'yyyy-MM-dd');
};

export type weekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const getCampaignDay = (date: Date) => {
  const lastDayOfWeek = dateFns.lastDayOfWeek(date, {
    weekStartsOn: constants.week_starts_on as weekDay,
  });

  const campaignDayOfWeek = dateFns.addDays(lastDayOfWeek, 1);
  const jsDate = new Date();
  const result = dateFns.addMinutes(
    campaignDayOfWeek,
    -1 * jsDate.getTimezoneOffset(),
  );

  return result;
};

const getCurrentCampaignDay = () => {
  const lastDayOfWeek = dateFns.lastDayOfWeek(new Date(), {
    weekStartsOn: constants.week_starts_on as weekDay,
  });

  const campaignDayOfWeek = dateFns.subDays(lastDayOfWeek, 6);
  const jsDate = new Date();
  const date = dateFns.addMinutes(
    campaignDayOfWeek,
    -1 * jsDate.getTimezoneOffset(),
  );

  return date;
};

const formatWeekPeriodMonths = (dateFrom: Date, dateTo: Date) => {
  const from = dateFns.format(dateFrom, 'MM.dd');

  const to = dateFns.format(dateTo, 'MM.dd');

  return `${from} - ${to}`;
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
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const utcDateOnly = dateFns.addMinutes(
    dateOnly,
    -1 * date.getTimezoneOffset(),
  );

  return utcDateOnly;
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
  getCampaignDay,
  format: format,
  toDateOnly,
  formatWeekPeriodMonths,
  getCurrentCampaignDay,
  formatWeekPeriodShort,
  formatWeekShort,
  isCampaignWeekday,
};

export default dateFunctions;

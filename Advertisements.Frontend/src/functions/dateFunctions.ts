import dateFns from '../config/imports/dateFns';

const format = (date: Date) => {
  return dateFns.format(date, 'yyyy-MM-dd');
};

const dateFunctions = {
  format: format,
};

export default dateFunctions;

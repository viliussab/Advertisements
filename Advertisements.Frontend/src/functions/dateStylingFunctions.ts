import dateFns from '../config/imports/dateFns';

export type MonthColorCss = {
  strong: string;
  weak: string;
};

const getMonthCss = (weekStart: Date): MonthColorCss => {
  const month = getMonth(weekStart);

  const dictionary = [
    {
      // 1
      strong: 'bg-blue-300',
      weak: 'bg-blue-200',
    },
    {
      // 2
      strong: 'bg-cyan-300',
      weak: 'bg-cyan-200',
    },
    {
      // 3
      strong: 'bg-teal-300',
      weak: 'bg-teal-200',
    },
    {
      // 4
      strong: 'bg-emerald-300',
      weak: 'bg-emerald-200',
    },
    {
      // 5
      strong: 'bg-green-300',
      weak: 'bg-green-200',
    },
    {
      // 6
      strong: 'bg-lime-300',
      weak: 'bg-lime-200',
    },
    {
      // 7
      strong: 'bg-yellow-300',
      weak: 'bg-yellow-200',
    },
    {
      // 8
      strong: 'bg-amber-300',
      weak: 'bg-amber-200',
    },
    {
      // 9
      strong: 'bg-orange-300',
      weak: 'bg-orange-200',
    },
    {
      // 10
      strong: 'bg-fuchsia-300',
      weak: 'bg-fuchsia-200',
    },
    {
      // 11
      strong: 'bg-violet-300',
      weak: 'bg-violet-200',
    },
    {
      // 12
      strong: 'bg-indigo-300',
      weak: 'bg-indigo-200',
    },
  ] as MonthColorCss[];

  return dictionary[month];
};

const getMonth = (weekStart: Date) => {
  const offset = dateFns.addDays(weekStart, 3);

  return offset.getMonth();
};

const getMonthText = (weekStart: Date, index: number) => {
  const offset = dateFns.addDays(weekStart, 3);

  if (index === 0 || offset.getDate() <= 7) {
    const result = dateFns.format(offset, 'LLLL');
    return result;
  }

  return '';
};

const dateStylingFunctions = {
  getMonthCss,
  getMonth,
  getMonthText,
};

export default dateStylingFunctions;

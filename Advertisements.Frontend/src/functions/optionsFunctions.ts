import { SelectOption } from '../components/public/input/type.SelectOption';

type convertProps<T> = {
  data: T[];
  keySelector: (value: T) => string;
  displaySelector: (value: T) => string | number | React.ReactNode;
};

const getArrayOptions = (options: string[]): SelectOption[] =>
  options.map((o) => ({
    display: o,
    key: o,
  }));

const convert = <T>({
  data,
  keySelector,
  displaySelector,
}: convertProps<T>) => {
  const options = data.map((value) => ({
    key: keySelector(value),
    display: displaySelector(value),
  }));

  return options;
};

const optionsFunctions = {
  convert,
  getArrayOptions,
};

export default optionsFunctions;

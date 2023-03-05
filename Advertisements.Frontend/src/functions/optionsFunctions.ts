type convertProps<T> = {
  data: T[];
  keySelector: (value: T) => string;
  displaySelector: (value: T) => string | number | React.ReactNode;
};

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
};

export default optionsFunctions;

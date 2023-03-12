const coordinatePrecision = 7;

const toNumCoordinate = (number: string | number) => {
  return convertToPreciseNumber(number, coordinatePrecision);
};

const toStringCoordinate = (number: string | number) => {
  return convertToPreciseString(number, coordinatePrecision);
};

const convertToPreciseString = (number: string | number, precision: number) => {
  if (typeof number === 'string') {
    const floatNum = parseFloat(number);
    const numString = floatNum.toFixed(precision);

    return numString;
  }

  const numString = number.toFixed(precision);

  return numString;
};

const convertToPreciseNumber = (number: string | number, precision: number) => {
  if (typeof number === 'string') {
    const floatNum = parseFloat(number);
    const numString = floatNum.toFixed(precision);
    const preciseNum = parseFloat(numString);

    return preciseNum;
  }

  const numString = number.toFixed(precision);
  const preciseNum = parseFloat(numString);

  return preciseNum;
};

const precisionFunctions = {
  toNumCoordinate,
  toStringCoordinate,
};

export default precisionFunctions;

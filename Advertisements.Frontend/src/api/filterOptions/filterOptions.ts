const toBoolean = (boolishString: string | undefined) => {
  if (!boolishString) {
    return undefined;
  }

  if (boolishString === 'true') {
    return true;
  }

  if (boolishString === 'false') {
    return false;
  }

  return undefined;
};

const filterOptions = {
  toBoolean,
};

export default filterOptions;

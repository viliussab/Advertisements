import React from 'react';
import Mui from '../../../../config/imports/Mui';

type Props = {
  value: string;
  label: string;
};

function FormReadOnly({ value, label }: Props) {
  return (
    <Mui.TextField
      label={label}
      value={value}
      disabled
      fullWidth
      variant="filled"
    />
  );
}

export default FormReadOnly;

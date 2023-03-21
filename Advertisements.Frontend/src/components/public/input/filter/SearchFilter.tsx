import React from 'react';
import * as Mui from '@mui/material';
import Icons from '../../../../config/imports/Icons';

type SearchFilterProps = {
  label: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  muiProps?: Mui.TextFieldProps | undefined;
};

export default function SearchFilter(props: SearchFilterProps) {
  const { label, value, onChange, muiProps } = props;

  const onChangeOverride = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = event.target.value;

    if (!value) {
      onChange(undefined);
    } else {
      onChange(value);
    }
  };

  return (
    <Mui.TextField
      fullWidth
      variant="standard"
      label={label}
      value={value || ''}
      InputProps={{ endAdornment: <Icons.Search /> }}
      onChange={onChangeOverride}
      {...muiProps}
    />
  );
}

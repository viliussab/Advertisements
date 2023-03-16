import React from 'react';
import * as Mui from '@mui/material';
import Icons from '../../../../config/imports/Icons';

const REFRESH_TIME_MS = 1000;

type SearchFilterProps = {
  label: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  muiProps?: Mui.TextFieldProps | undefined;
};

export default function SearchFilter(props: SearchFilterProps) {
  const { label, value, onChange, muiProps } = props;

  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(value);

  React.useEffect(
    () => setSearchTerm(value === '' ? undefined : value),
    [value],
  );

  React.useEffect(() => {
    const delayChange = setTimeout(() => {
      if (value == searchTerm) {
        return;
      }

      onChange(searchTerm);
    }, REFRESH_TIME_MS);

    return () => clearTimeout(delayChange);
  }, [onChange, searchTerm, value]);

  return (
    <Mui.TextField
      fullWidth
      variant="standard"
      label={label}
      value={searchTerm || ''}
      InputProps={{ endAdornment: <Icons.Search /> }}
      onChange={(event) => setSearchTerm(event.target.value)}
      {...muiProps}
    />
  );
}

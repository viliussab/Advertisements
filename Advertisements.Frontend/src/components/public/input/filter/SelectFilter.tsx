import * as Mui from '@mui/material';
import { SelectOption } from '../type.SelectOption';

type SelectProps = {
  onChange: (key: string | undefined) => void;
  value?: string;
  label: string;
  emptyOptionDisplay: string;
  options: SelectOption[];
  muiProps?: Mui.SelectProps;
};

const SelectFilter = (props: SelectProps) => {
  const { label, options, value, muiProps, emptyOptionDisplay } = props;

  return (
    <Mui.FormControl variant="standard" fullWidth>
      <Mui.InputLabel>{label}</Mui.InputLabel>
      <Mui.Select
        {...muiProps}
        fullWidth
        value={value || ''}
        onChange={(event) =>
          props.onChange(
            event.target.value === ''
              ? undefined
              : (event.target.value as string),
          )
        }
      >
        <Mui.MenuItem value={''}>
          <em>{emptyOptionDisplay ? emptyOptionDisplay : 'Nepasirinkta'}</em>
        </Mui.MenuItem>
        {options?.map((option) => (
          <Mui.MenuItem key={option.key} value={option.key}>
            {option.display}
          </Mui.MenuItem>
        ))}
      </Mui.Select>
    </Mui.FormControl>
  );
};

export default SelectFilter;

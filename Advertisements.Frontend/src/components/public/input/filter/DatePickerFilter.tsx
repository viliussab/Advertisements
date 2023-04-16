import React from 'react';
import {
  LocalizationProvider,
  DatePickerProps,
  DatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Mui from '../../../../config/imports/Mui';
import dateFunctions from '../../../../functions/dateFunctions';

type Props = {
  label: string;
  includeWeekNumber?: 'regular' | 'end';
  onChangeSuccess?: (value: Date) => void;
  value: Date;
  onChange: (value: Date) => void;
  datePickerProps?: Omit<
    DatePickerProps<Date>,
    'value' | 'onChange' | 'slotProps'
  >;
  textFieldProps?: Mui.TextFieldProps;
};

function DatePickerFilter(props: Props) {
  const {
    label,
    onChangeSuccess,
    datePickerProps,
    textFieldProps,
    includeWeekNumber,
    value,
    onChange,
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="relative flex items-center">
        <DatePicker
          displayWeekNumber
          {...datePickerProps}
          defaultValue={value}
          label={label}
          onChange={(value) => {
            if (!value) {
              return;
            }
            const date = dateFunctions.toDateOnly(value);
            onChange(date);
            if (onChangeSuccess && date) {
              onChangeSuccess(date);
            }
          }}
          slotProps={{
            textField: {
              ...textFieldProps,
              variant: 'outlined',
              fullWidth: true,
            },
          }}
        />
        {includeWeekNumber && value && (
          <div className="absolute right-10">
            <Mui.Chip label={dateFunctions.formatWeekShort(value)}></Mui.Chip>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default DatePickerFilter;

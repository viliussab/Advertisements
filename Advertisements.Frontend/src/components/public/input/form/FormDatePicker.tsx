import React from 'react';
import {
  LocalizationProvider,
  DatePickerProps,
  DatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import RHF from '../../../../config/imports/RHF';
import Mui from '../../../../config/imports/Mui';

type Props<T extends RHF.FieldValues> = {
  fieldName: RHF.Path<T>;
  form: RHF.UseFormReturn<T>;
  label: string;
  onChangeSuccess?: (value: Date) => void;
  datePickerProps?: Omit<
    DatePickerProps<Date>,
    'value' | 'onChange' | 'slotProps'
  >;
  textFieldProps?: Mui.TextFieldProps;
};

function FormDatePicker<T extends RHF.FieldValues>(props: Props<T>) {
  const {
    form,
    label,
    fieldName,
    onChangeSuccess,
    datePickerProps,
    textFieldProps,
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RHF.Controller
        name={fieldName}
        control={form.control}
        render={({ field: { onChange, ...restField } }) => (
          <DatePicker
            {...datePickerProps}
            label={label}
            onChange={(value) => {
              onChange(value);
              if (onChangeSuccess && value) {
                onChangeSuccess(value);
              }
            }}
            {...restField}
            slotProps={{
              textField: {
                ...textFieldProps,
                variant: 'filled',
                fullWidth: true,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default FormDatePicker;

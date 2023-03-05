import React from 'react';
import {
  LocalizationProvider,
  DatePickerProps,
  DatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

  const currentValue = form.watch(fieldName);

  const onChange = (value: Date | null) => {
    if (!value) {
      return;
    }

    // @ts-ignore
    form.setValue(fieldName, value);

    if (onChangeSuccess) {
      onChangeSuccess(value);
    }
  };

  return (
    // TODO: move to datefns adapter
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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

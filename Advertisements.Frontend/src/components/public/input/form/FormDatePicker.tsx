import React from 'react';
import {
  LocalizationProvider,
  DatePickerProps,
  DatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import RHF from '../../../../config/imports/RHF';
import Mui from '../../../../config/imports/Mui';
import dateFunctions from '../../../../functions/dateFunctions';

type Props<T extends RHF.FieldValues> = {
  fieldName: RHF.Path<T>;
  form: RHF.UseFormReturn<T>;
  label: string;
  includeWeekNumber?: 'regular' | 'end';
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
    includeWeekNumber,
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RHF.Controller
        name={fieldName}
        control={form.control}
        render={({ field: { onChange, ref, ...restField } }) => (
          <div className="relative flex items-center">
            <DatePicker
              displayWeekNumber
              {...datePickerProps}
              label={label}
              onChange={(value) => {
                if (!value) {
                  return onChange(value);
                }
                const date = dateFunctions.toDateOnly(value);
                onChange(date);
                if (onChangeSuccess && date) {
                  onChangeSuccess(date);
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
            {includeWeekNumber && restField.value && (
              <div className="absolute right-10">
                <Mui.Chip
                  label={dateFunctions.formatWeekShort(restField.value)}
                ></Mui.Chip>
              </div>
            )}
          </div>
        )}
      />
    </LocalizationProvider>
  );
}

export default FormDatePicker;

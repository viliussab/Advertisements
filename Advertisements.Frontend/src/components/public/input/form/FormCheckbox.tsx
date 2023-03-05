import React from 'react';
import RHF from '../../../../config/imports/RHF';
import { FormFieldProps } from '.';
import Mui from '../../../../config/imports/Mui';

type Props<T extends RHF.FieldValues> = FormFieldProps<T> & {
  label: string;
};

function FormCheckbox<T extends RHF.FieldValues>(props: Props<T>) {
  const { fieldName, form, rules, label } = props;

  const { field } = RHF.useController({
    name: fieldName,
    control: form.control,
    rules,
  });

  return (
    <Mui.FormControlLabel
      control={<Mui.Checkbox checked={!!field.value} {...field} />}
      label={label}
    />
  );
}

export default FormCheckbox;

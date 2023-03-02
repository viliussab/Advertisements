import RHF from '../../../../imports/RHF';
import Mui from '../../../../imports/Mui';
import { FormFieldProps } from '.';

type Props<T extends RHF.FieldValues> = FormFieldProps<T> & {
  label: string;
  muiProps?: Mui.TextFieldProps;
};

const FormTextField = <T extends RHF.FieldValues>(props: Props<T>) => {
  const { fieldName, form, label, muiProps, rules } = props;

  const { field, formState } = RHF.useController({
    name: fieldName,
    control: form.control,
    rules,
  });

  const error = formState.errors[fieldName];

  return (
    <Mui.TextField
      label={label}
      error={!!error}
      helperText={error ? error.message?.toString() : ''}
      fullWidth
      variant="filled"
      {...field}
      {...muiProps}
    />
  );
};

export default FormTextField;

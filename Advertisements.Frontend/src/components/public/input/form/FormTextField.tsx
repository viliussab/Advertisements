import RHF from '../../../../config/imports/RHF';
import Mui from '../../../../config/imports/Mui';
import { FormFieldProps } from '.';

type Props<T extends RHF.FieldValues> = FormFieldProps<T> & {
  label: string;
  muiProps?: Mui.TextFieldProps;
};

const FormTextField = <T extends RHF.FieldValues>(props: Props<T>) => {
  const { fieldName, form, label, muiProps, rules } = props;

  const error = form.formState.errors[fieldName];

  return (
    <RHF.Controller
      name={fieldName}
      control={form.control}
      rules={rules}
      defaultValue="" // Avoid error "A component is changing the uncontrolled value state to be controlled."
      render={({ field }) => (
        <Mui.TextField
          label={label}
          error={!!error}
          helperText={error ? error.message?.toString() : ''}
          fullWidth
          variant="filled"
          {...field}
          {...muiProps}
        />
      )}
    />
  );
};

export default FormTextField;

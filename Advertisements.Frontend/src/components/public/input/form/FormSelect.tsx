import RHF from '../../../../imports/RHF';
import Mui from '../../../../imports/Mui';
import { FormFieldProps } from '.';
import { SelectOption } from '../type.SelectOption';

type Props<T extends RHF.FieldValues> = FormFieldProps<T> & {
  label: string;
  options: SelectOption[];
};

const FormSelect = <T extends RHF.FieldValues>(props: Props<T>) => {
  const { fieldName, form, options, rules, label } = props;

  const { field, formState } = RHF.useController({
    name: fieldName,
    control: form.control,
    rules,
  });

  const error = formState.errors[fieldName];

  return (
    <Mui.FormControl variant="filled" fullWidth error={!!error}>
      <Mui.InputLabel>{label}</Mui.InputLabel>
      <Mui.Select fullWidth required {...field}>
        <Mui.MenuItem value={''}>
          <em>Nepasirinkta</em>
        </Mui.MenuItem>
        {options.map((option) => (
          <Mui.MenuItem key={option.key} value={option.key}>
            {option.displayValue}
          </Mui.MenuItem>
        ))}
      </Mui.Select>
      {error && (
        <Mui.FormHelperText>{error.message?.toString()}</Mui.FormHelperText>
      )}
    </Mui.FormControl>
  );
};

export default FormSelect;

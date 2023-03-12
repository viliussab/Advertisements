import RHF from '../../../../config/imports/RHF';
import Mui from '../../../../config/imports/Mui';
import { FormFieldProps } from '.';
import { SelectOption } from '../type.SelectOption';

type Props<T extends RHF.FieldValues> = FormFieldProps<T> & {
  label: string;
  options: SelectOption[];
  muiProps?: Mui.SelectProps;
  emptyOption?: SelectOption;
  showDefaultOption?: boolean;
};

const FormSelect = <T extends RHF.FieldValues>(props: Props<T>) => {
  const {
    fieldName,
    form,
    options,
    rules,
    label,
    muiProps,
    showDefaultOption,
  } = props;

  const emptyOption =
    props.emptyOption ||
    (showDefaultOption && {
      key: '',
      display: 'Nepasirinkta',
    });

  const { field, formState } = RHF.useController({
    name: fieldName,
    control: form.control,
    rules,
  });

  const error = formState.errors[fieldName];

  return (
    <Mui.FormControl variant="filled" fullWidth error={!!error}>
      <Mui.InputLabel>{label}</Mui.InputLabel>
      <Mui.Select fullWidth required {...field} {...muiProps}>
        {emptyOption && (
          <Mui.MenuItem value={emptyOption.key}>
            <em>{emptyOption.display}</em>
          </Mui.MenuItem>
        )}
        {options.map((option) => (
          <Mui.MenuItem key={option.key} value={option.key}>
            {option.display}
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

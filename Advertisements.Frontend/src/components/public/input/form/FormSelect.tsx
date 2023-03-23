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
  isLoading?: boolean;
};

const FormSelect = <T extends RHF.FieldValues>(props: Props<T>) => {
  const {
    fieldName,
    form,
    options,
    rules,
    label,
    muiProps,
    isLoading,
    showDefaultOption,
  } = props;

  const emptyOption =
    props.emptyOption ||
    (showDefaultOption && {
      key: '',
      display: 'Nepasirinkta',
    });

  const error = form.formState.errors[fieldName];

  if (isLoading) {
    return (
      <Mui.FormControl variant="filled" fullWidth error={!!error}>
        <Mui.InputLabel>{label}</Mui.InputLabel>
        <Mui.Select fullWidth required disabled></Mui.Select>
      </Mui.FormControl>
    );
  }

  return (
    <Mui.FormControl variant="filled" fullWidth error={!!error}>
      <Mui.InputLabel>{label}</Mui.InputLabel>
      <RHF.Controller
        name={fieldName}
        control={form.control}
        rules={rules}
        defaultValue="" // Avoid error "A component is changing the uncontrolled value state to be controlled."
        render={({ field }) => (
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
        )}
      />
      {error && (
        <Mui.FormHelperText>{error.message?.toString()}</Mui.FormHelperText>
      )}
    </Mui.FormControl>
  );
};

export default FormSelect;

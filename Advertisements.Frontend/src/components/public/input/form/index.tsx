import RHF from '../../../../imports/RHF';
import FormSelect from './FormSelect';
import FormTextField from './FormTextField';

export type FormFieldProps<T extends RHF.FieldValues> = {
  fieldName: RHF.Path<T>;
  form: RHF.UseFormReturn<T>;
  rules?: Omit<
    RHF.RegisterOptions<T, RHF.Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
};

const FormInput = {
  TextField: FormTextField,
  Select: FormSelect,
};

export default FormInput;

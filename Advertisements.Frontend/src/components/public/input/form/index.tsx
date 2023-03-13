import RHF from '../../../../config/imports/RHF';
import FormCheckbox from './FormCheckbox';
import FormDatePicker from './FormDatePicker';
import FormReadOnly from './FormReadOnly';
import FormSelect from './FormSelect';
import FormTextField from './FormTextField';
import FormSubmitButton from './FormSubmitButton';

export type FormFieldProps<T extends RHF.FieldValues> = {
  fieldName: RHF.Path<T>;
  form: RHF.UseFormReturn<T>;
  rules?: Omit<RHF.RegisterOptions<T, RHF.Path<T>>, 'disabled'>;
};

const FormInput = {
  TextField: FormTextField,
  Select: FormSelect,
  Checkbox: FormCheckbox,
  DatePicker: FormDatePicker,
  ReadOnly: FormReadOnly,
  SubmitButton: FormSubmitButton,
};

export default FormInput;

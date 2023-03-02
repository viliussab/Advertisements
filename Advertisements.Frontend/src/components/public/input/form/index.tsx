import RHF from '../../../../imports/RHF';

export type FormFieldProps<T extends RHF.FieldValues> = {
  fieldName: RHF.Path<T>;
  form: RHF.UseFormReturn<T>;
  rules?: Omit<
    RHF.RegisterOptions<T, RHF.Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
};

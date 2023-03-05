import RHF from '../../config/imports/RHF';

type Props<T extends RHF.FieldValues> = {
  form: RHF.UseFormReturn<T>;
  onSubmit?: (values: T) => void;
  children?: React.ReactNode;
};

function Form<T extends RHF.FieldValues>(props: Props<T>) {
  const { form, children, onSubmit } = props;

  const emptySubmit = (values: T) => {
    console.log('form values', values);
  };

  const onSubmitForm = onSubmit
    ? form.handleSubmit(onSubmit)
    : form.handleSubmit(emptySubmit);

  return (
    <>
      <form onSubmit={onSubmitForm}>{children}</form>
    </>
  );
}

export default Form;

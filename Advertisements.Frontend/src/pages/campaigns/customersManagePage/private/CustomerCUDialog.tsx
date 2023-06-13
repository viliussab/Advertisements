import { zodResolver } from '@hookform/resolvers/zod';
import {
  CustomerCreateUpdate,
  customerCreateUpdateSchema,
} from '../../../../api/commands/schema.createUpdateCustomer';
import FormInput from '../../../../components/public/input/form';
import Mui from '../../../../config/imports/Mui';
import RHF from '../../../../config/imports/RHF';

type CustomerCUDialogProps = {
  open: boolean;
  onClose: () => void;
  submitText: string;
  title: string;
  onSubmit: (values: CustomerCreateUpdate) => void;
  isSubmitting: boolean;
  values?: CustomerCreateUpdate;
};

const CustomerCUDialog = ({
  open,
  onClose,
  submitText,
  title,
  onSubmit,
  values,
  isSubmitting,
}: CustomerCUDialogProps) => {
  const form = RHF.useForm({
    resolver: zodResolver(customerCreateUpdateSchema),
    defaultValues: values,
  });

  return (
    <Mui.Dialog open={open} onClose={onClose}>
      <div className="flex justify-center">
        <div className="bg-gray-50 p-2 pb-4">
          <div className="mt-2 text-center text-xl font-semibold">{title}</div>
          <form
            onSubmit={(e) => {
              form.handleSubmit(onSubmit)(e);
            }}
          >
            <div className="m-4 mb-0">
              <FormInput.TextField
                label="Įmonės pavadinimas"
                form={form}
                fieldName="name"
                muiProps={{ required: true }}
              />
            </div>
            <div className="flex justify-center">
              <div className="m-4 w-64 space-y-3 pt-0">
                <FormInput.TextField
                  label="Įmonės kodas"
                  form={form}
                  fieldName="companyCode"
                  muiProps={{ required: true }}
                />
                <FormInput.TextField
                  label="PVM kodas"
                  form={form}
                  fieldName="vatCode"
                  muiProps={{ required: true }}
                />
                <FormInput.TextField
                  label="Adresas"
                  form={form}
                  fieldName="address"
                  muiProps={{ required: true }}
                />
              </div>
              <div className="m-4 w-64 space-y-3 pt-0">
                <FormInput.TextField
                  label="Telefonas"
                  form={form}
                  fieldName="phone"
                  muiProps={{ required: true }}
                />
                <FormInput.TextField
                  label="Kontaktinis asmuo"
                  form={form}
                  fieldName="contactPerson"
                  muiProps={{ required: true }}
                />
                <FormInput.TextField
                  label="El. paštas"
                  form={form}
                  fieldName="email"
                  muiProps={{ required: true }}
                />
              </div>
            </div>
            <div className="mt-2 flex justify-center">
              <FormInput.SubmitButton isSubmitting={isSubmitting}>
                {submitText}
              </FormInput.SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </Mui.Dialog>
  );
};

export default CustomerCUDialog;

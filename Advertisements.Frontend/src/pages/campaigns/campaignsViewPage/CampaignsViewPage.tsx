import Form from '../../../components/public/Form';
import FormInput from '../../../components/public/input/form';
import Mui from '../../../config/imports/Mui';
import RHF from '../../../config/imports/RHF';

type Type = {
  textfield: string;
  select: string;
};

function CampaignsViewPage() {
  const form = RHF.useForm<Type>({
    defaultValues: {
      textfield: '',
      select: '',
    },
  });

  return (
    <div className="pt-3 text-center text-3xl font-bold underline">
      CampaignsViewPage
      <Form form={form}>
        <FormInput.TextField form={form} fieldName="textfield" label="test" />
        <FormInput.Select
          form={form}
          fieldName="select"
          label="test2"
          options={[
            {
              key: '1',
              display: 'test',
            },
            {
              key: '2',
              display: 'test2',
            },
          ]}
        />
        <Mui.FormGroup>
          <Mui.FormControlLabel
            control={<Mui.Checkbox defaultChecked />}
            label="Label"
          />
          <Mui.FormControlLabel
            disabled
            control={<Mui.Checkbox />}
            label="Disabled"
          />
        </Mui.FormGroup>
      </Form>
    </div>
  );
}

export default CampaignsViewPage;

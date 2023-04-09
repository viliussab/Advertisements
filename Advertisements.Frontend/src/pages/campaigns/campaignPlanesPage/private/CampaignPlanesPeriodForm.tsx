import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import {
  UpdateCampaignPlane,
  updateCampaignPlaneSchema,
} from '../../../../api/commands/schema.updateCampaignPlane';
import Campaign from '../../../../api/responses/type.Campaign';
import Form from '../../../../components/public/Form';
import FormInput from '../../../../components/public/input/form';
import dateFns from '../../../../config/imports/dateFns';
import RHF from '../../../../config/imports/RHF';

type Props = {
  values: UpdateCampaignPlane;
  campaign: Campaign;
  onSubmit: (values: UpdateCampaignPlane) => void;
};

function CampaignPlanesPeriodForm({ values, campaign, onSubmit }: Props) {
  const form = RHF.useForm({
    resolver: zodResolver(updateCampaignPlaneSchema),
    defaultValues: values,
  });

  const formValues = form.watch();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormInput.DatePicker
        form={form}
        label="Data nuo"
        fieldName="weekFrom"
        includeWeekNumber="regular"
        onChangeSuccess={(value) => {
          if (value > formValues.weekTo) {
            form.setValue('weekTo', value);
          }
        }}
        datePickerProps={{
          minDate: new Date(campaign.start),
          maxDate: new Date(campaign.end),
          disabled: !formValues.weekFrom,
          shouldDisableDate: (date) =>
            new Date(campaign.start).getDay() !== date.getDay(),
        }}
      />
      <FormInput.DatePicker
        form={form}
        label="Data iki"
        includeWeekNumber="end"
        fieldName="weekTo"
        datePickerProps={{
          minDate: formValues.weekFrom,
          disabled: !formValues.weekFrom,
          maxDate: new Date(campaign.end),
          shouldDisableDate: (date) =>
            new Date(campaign.start).getDay() !== date.getDay(),
        }}
      />
      <FormInput.SubmitButton isSubmitting={false}>
        Tvirtinti
      </FormInput.SubmitButton>
    </Form>
  );
}

export default CampaignPlanesPeriodForm;

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import {
  UpdateCampaignPlane,
  updateCampaignPlaneSchema,
} from '../../../../api/commands/schema.updateCampaignPlane';
import Campaign from '../../../../api/responses/type.Campaign';
import Form from '../../../../components/public/Form';
import FormInput from '../../../../components/public/input/form';
import Mui from '../../../../config/imports/Mui';
import RHF from '../../../../config/imports/RHF';
import dateFunctions from '../../../../functions/dateFunctions';
import { SelectedPlaneToEdit } from './type.CampaignPlanesPage';

type Props = {
  selectedPlane: SelectedPlaneToEdit | undefined;
  resetSelectedId: () => void;
  campaign: Campaign;
  onSubmit: (values: UpdateCampaignPlane) => void;
};

function CampaignPlanesPeriodFormDialog(props: Props) {
  const {
    campaign,
    onSubmit,
    selectedPlane: selectedPlane,
    resetSelectedId,
  } = props;

  if (!selectedPlane) {
    return <></>;
  }

  const form = RHF.useForm({
    resolver: zodResolver(updateCampaignPlaneSchema),
    defaultValues: {
      id: selectedPlane.id,
      weekFrom: dateFunctions.toDateOnly(new Date(campaign.start)),
      weekTo: dateFunctions.toDateOnly(new Date(campaign.end)),
    },
  });

  const formValues = form.watch();

  return (
    <Mui.Dialog
      open={!!selectedPlane}
      onClose={resetSelectedId}
      maxWidth={false}
    >
      <Form form={form} onSubmit={onSubmit}>
        <div className="space-y-3 bg-gray-50 p-4">
          <div className="text-lg ">
            <span>{`Pasirinkti `}</span>
            <span className="font-bold">{selectedPlane.name}</span>
            <span>{` periodą`}</span>
          </div>
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
          <div className="flex justify-center">
            <FormInput.SubmitButton isSubmitting={false}>
              Tvirtinti
            </FormInput.SubmitButton>
          </div>
        </div>
      </Form>
    </Mui.Dialog>
  );
}

export default CampaignPlanesPeriodFormDialog;

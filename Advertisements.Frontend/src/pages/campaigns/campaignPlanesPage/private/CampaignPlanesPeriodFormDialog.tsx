import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import {
  UpdateCampaignPlane,
  updateCampaignPlaneSchema,
} from '../../../../api/commands/schema.updateCampaignPlane';
import Campaign from '../../../../api/responses/type.Campaign';
import CampaignOption from '../../../../api/responses/type.CampaignOption';
import Form from '../../../../components/public/Form';
import FormInput from '../../../../components/public/input/form';
import Mui from '../../../../config/imports/Mui';
import RHF from '../../../../config/imports/RHF';
import dateFunctions from '../../../../functions/dateFunctions';
import { SelectedPlaneToEdit } from './type.CampaignPlanesPage';

type Props = {
  editPlane: SelectedPlaneToEdit | undefined;
  resetSelected: () => void;
  campaign: CampaignOption;
  dateBoundaries?: {
    from: Date;
    to: Date;
  };
  isSubmitting: boolean;
  onSubmit: (values: UpdateCampaignPlane) => void;
};

function CampaignPlanesPeriodFormDialog(props: Props) {
  const {
    campaign,
    onSubmit,
    isSubmitting,
    editPlane,
    resetSelected: resetSelected,
    dateBoundaries,
  } = props;

  if (!editPlane) {
    return <></>;
  }

  const form = RHF.useForm({
    resolver: zodResolver(updateCampaignPlaneSchema),
    defaultValues: editPlane.values
      ? editPlane.values
      : {
          planeId: editPlane.planeId,
          weekFrom: dateFunctions.toDateOnly(new Date(campaign.start)),
          weekTo: dateFunctions.toDateOnly(new Date(campaign.end)),
        },
  });

  const formValues = form.watch();

  return (
    <Mui.Dialog open={!!editPlane} onClose={resetSelected} maxWidth={false}>
      <Form form={form} onSubmit={onSubmit}>
        <div className="space-y-3 bg-gray-50 p-4">
          <div className="">
            <div className="text-lg font-bold">{editPlane.name} </div>
            <div className="">Kampanijai {campaign.name} </div>
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
              minDate: dateBoundaries?.from || new Date(campaign.start),
              maxDate: dateBoundaries?.to || new Date(campaign.end),
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
              maxDate: dateBoundaries?.to || new Date(campaign.end),
              shouldDisableDate: (date) =>
                new Date(campaign.start).getDay() !== date.getDay(),
            }}
          />
          <div className="flex justify-center">
            <FormInput.SubmitButton isSubmitting={isSubmitting}>
              Tvirtinti
            </FormInput.SubmitButton>
          </div>
        </div>
      </Form>
    </Mui.Dialog>
  );
}

export default CampaignPlanesPeriodFormDialog;

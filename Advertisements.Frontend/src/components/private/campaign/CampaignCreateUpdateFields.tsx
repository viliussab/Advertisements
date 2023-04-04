import React from 'react';
import { CampaignCreateUpdate } from '../../../api/commands/schema.createUpdateCampaign';
import Customer from '../../../api/responses/type.Customer';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import RHF from '../../../config/imports/RHF';
import optionsFunctions from '../../../functions/optionsFunctions';
import FormInput from '../../public/input/form';
import dateFns from './../../../config/imports/dateFns';

type Props = {
  form: RHF.UseFormReturn<CampaignCreateUpdate>;
  customers: Customer[];
  update?: boolean;
};

function CampaignCreateUpdateFields(props: Props) {
  const { form, customers, update } = props;

  const [start, end] = form.watch(['start', 'end']);

  return (
    <>
      <div className="flex justify-center">
        <div className="space-y-3 pt-0">
          <FormInput.TextField
            label="Kampanijos pavadinimas"
            form={form}
            fieldName="name"
            muiProps={{
              required: true,
            }}
          />
          <FormInput.Select
            label="Klientas"
            form={form}
            fieldName="customerId"
            options={optionsFunctions.convert({
              data: customers,
              displaySelector: (customer) => customer.name,
              keySelector: (customer) => customer.id,
            })}
          />
          {!start && update ? null : (
            <FormInput.DatePicker
              form={form}
              label="Data nuo"
              fieldName="start"
              includeWeekNumber="regular"
              onChangeSuccess={(value) =>
                form.setValue('end', dateFns.addDays(value, 7))
              }
            />
          )}
          {!end && update ? null : (
            <FormInput.DatePicker
              form={form}
              label="Data iki"
              includeWeekNumber="end"
              fieldName="end"
              datePickerProps={{
                minDate: dateFns.addDays(start, 7),
                disabled: !start,
                shouldDisableDate: (date) => start.getDay() !== date.getDay(),
              }}
            />
          )}

          <FormInput.TextField
            label="Plokštumų kiekis"
            form={form}
            fieldName="planeAmount"
            muiProps={{
              required: true,
              type: 'number',
            }}
            rules={{
              valueAsNumber: true,
            }}
          />
          <FormInput.TextField
            label="Kaina"
            form={form}
            fieldName="pricePerPlane"
            muiProps={{
              required: true,
              type: 'number',
              InputProps: {
                endAdornment: (
                  <Mui.InputAdornment position="end">
                    <Icons.Euro />
                  </Mui.InputAdornment>
                ),
              },
            }}
            rules={{
              valueAsNumber: true,
            }}
          />
          <FormInput.TextField
            label="Taikoma nuolaida"
            form={form}
            fieldName="discountPercent"
            muiProps={{
              required: true,
              type: 'number',
              InputProps: {
                endAdornment: (
                  <Mui.InputAdornment position="end">
                    <Icons.Percent />
                  </Mui.InputAdornment>
                ),
              },
            }}
            rules={{
              valueAsNumber: true,
            }}
          />
          <FormInput.Checkbox
            fieldName="requiresPrinting"
            form={form}
            label="Reikia spausdinti"
          />
        </div>
      </div>
    </>
  );
}

export default CampaignCreateUpdateFields;

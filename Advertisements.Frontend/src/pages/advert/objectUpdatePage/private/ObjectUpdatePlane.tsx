import React from 'react';
import FormInput from '../../../../components/public/input/form';
import sides_enum from '../../../../config/enums/sides';
import Icons from '../../../../config/imports/Icons';
import Mui from '../../../../config/imports/Mui';
import RHF from '../../../../config/imports/RHF';
import optionsFunctions from '../../../../functions/optionsFunctions';
import ObjectUpdatePhotosUpload from './ObjectUpdatePhotosUpload';
import { UpdateAdvertObject } from '../../../../api/commands/schema.updateAdvertObject';

type Props = {
  remove: RHF.UseFieldArrayRemove;
  field: RHF.FieldArrayWithId<UpdateAdvertObject, 'planes', 'rhfId'>;
  form: RHF.UseFormReturn<UpdateAdvertObject>;
  index: number;
  name: string;
};

function Plane({ form, field, remove, index, name }: Props) {
  const partialName = form.watch(`planes.${index}.partialName`);
  const updateStatus = form.watch(`planes.${index}.updateStatus`);

  const onPlaneRemove = () => {
    if (updateStatus === 'New') {
      remove(index);
      return;
    }

    form.setValue(`planes.${index}.updateStatus`, 'Deleted');
  };

  const onDeletedRestore = () => {
    form.setValue(`planes.${index}.updateStatus`, 'Existing');
  };

  return (
    <div
      className={`m-4 rounded-lg border-4   border-opacity-50 p-6 shadow-md
        ${updateStatus === 'Existing' && ' border-blue-700'}
        ${updateStatus === 'New' && ' border-green-400'}
        ${updateStatus === 'Deleted' && ' border-red-400'}`}
    >
      <div className="flex justify-between align-middle">
        <div className="w-64">
          <FormInput.ReadOnly
            value={`${name} ${partialName || ''}`}
            label="Pilnas pavadinimas"
          />
        </div>
        {updateStatus === 'Deleted' ? (
          <div className="flex items-start">
            <Mui.Button color="info" onClick={onDeletedRestore}>
              <Icons.Restore />
              Anuluoti trinimą
            </Mui.Button>
          </div>
        ) : (
          <div className="flex items-start">
            <Mui.Button color="error" onClick={onPlaneRemove}>
              <Icons.Remove />
              Ištrinti plokštumą
            </Mui.Button>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <div className="mt-2 flex w-64 flex-col space-y-3">
          <FormInput.Select
            form={form}
            fieldName={`planes.${index}.partialName`}
            label="Pusė"
            options={optionsFunctions.convert({
              data: sides_enum,
              keySelector: (value) => value,
              displaySelector: (value) => value,
            })}
          />
          <FormInput.Checkbox
            form={form}
            fieldName={`planes.${index}.isPremium`}
            label="Premium"
          />
          <FormInput.Checkbox
            form={form}
            fieldName={`planes.${index}.isPermitted`}
            label="Licenzija"
          />
          <FormInput.DatePicker
            form={form}
            fieldName={`planes.${index}.permissionExpiryDate`}
            label="Licenzijos pasibaigimo data"
            datePickerProps={{
              disabled: !form.watch(`planes.${index}.isPermitted`),
            }}
          />
        </div>
        <ObjectUpdatePhotosUpload form={form} planeIndex={index} />
      </div>
    </div>
  );
}

export default Plane;

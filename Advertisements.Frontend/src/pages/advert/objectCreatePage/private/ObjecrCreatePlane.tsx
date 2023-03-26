import React from 'react';
import { useDropzone } from 'react-dropzone';
import { CreateAdvertObject } from '../../../../api/commands/schema.createAdvertObject';
import FormInput from '../../../../components/public/input/form';
import sides_enum from '../../../../config/enums/sides';
import Icons from '../../../../config/imports/Icons';
import Mui from '../../../../config/imports/Mui';
import RHF from '../../../../config/imports/RHF';
import optionsFunctions from '../../../../functions/optionsFunctions';
import fileFunctions from '../../../../functions/fileFunctions';
import PhotosUpload from './ObjectCreatePhotosUpload';

type Props = {
  remove: RHF.UseFieldArrayRemove;
  field: RHF.FieldArrayWithId<CreateAdvertObject, 'planes', 'id'>;
  form: RHF.UseFormReturn<CreateAdvertObject>;
  index: number;
  name: string;
};

function ObjectCreatePlane({ form, field, remove, index, name }: Props) {
  const partialName = form.watch(`planes.${index}.partialName`);

  return (
    <div className="m-4 rounded-lg border border-blue-700 border-opacity-50 p-6 shadow-md">
      <div className="flex justify-between align-middle">
        <div className="w-64">
          <FormInput.ReadOnly
            value={`${name} ${partialName}`}
            label="Pilnas pavadinimas"
          />
        </div>
        <div className="flex items-start">
          <Mui.Button color="error" onClick={() => remove(index)}>
            <Icons.Remove />
            Ištrinti plokštumą
          </Mui.Button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mt-2 flex w-64 flex-col space-y-3">
          <FormInput.Select
            key={field.id}
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
        <PhotosUpload form={form} planeIndex={index} />
      </div>
    </div>
  );
}

export default ObjectCreatePlane;

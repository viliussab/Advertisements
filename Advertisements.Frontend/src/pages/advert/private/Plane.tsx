import React from 'react';
import { useDropzone } from 'react-dropzone';
import { CreateAdvertObject } from '../../../api/commands/schema.createAdvertObject';
import FormInput from '../../../components/public/input/form';
import sides_enum from '../../../config/enums/sides';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import RHF from '../../../config/imports/RHF';
import optionsFunctions from '../../../functions/optionsFunctions';
import fileFunctions from './../../../functions/fileFunctions';

type Props = {
  remove: RHF.UseFieldArrayRemove;
  field: RHF.FieldArrayWithId<CreateAdvertObject, 'planes', 'id'>;
  form: RHF.UseFormReturn<CreateAdvertObject>;
  index: number;
  name: string;
};

function Plane({ form, field, remove, index, name }: Props) {
  const partialName = form.watch(`planes.${index}.partialName`);

  const f = useDropzone({
    multiple: false,
    accept: { 'image/*': [] },
    onDrop: async (acceptedFiles: File[]) => {
      const imageBlob = acceptedFiles[0];
      console.log('imageblob', imageBlob);
      const base64 = await fileFunctions.toBase64Async(imageBlob);
      form.setValue(`planes.${index}.image`, {
        mime: imageBlob.type,
        base64,
      });
    },
  });
  const image = form.watch(`planes.${index}.image`);

  return (
    <div className="m-4 rounded-lg border border-blue-700 border-opacity-50 p-6 shadow-md">
      <div className="flex justify-between align-middle">
        {!!name && !!partialName ? (
          <Mui.Typography variant="h6">{`${name} ${partialName}`}</Mui.Typography>
        ) : (
          <div />
        )}
        <Mui.IconButton onClick={() => remove(index)}>
          <Icons.Remove />
        </Mui.IconButton>
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
        <div
          className={`m-2 ml-4 flex h-60 w-60 cursor-pointer items-center justify-center ${
            !image && 'bg-gray-100'
          }`}
          {...f.getRootProps()}
        >
          <input hidden {...f.getInputProps} />
          {image ? (
            <img src={`data:${image.mime};base64, ${image.base64}`}></img>
          ) : (
            <>Pridėti stotelęs nuotrauką</>
          )}
        </div>
      </div>
    </div>
  );
}

export default Plane;

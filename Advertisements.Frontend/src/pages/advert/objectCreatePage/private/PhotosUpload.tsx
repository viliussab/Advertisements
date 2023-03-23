import React from 'react';
import { useDropzone } from 'react-dropzone';
import { CreateAdvertObject } from '../../../../api/commands/schema.createAdvertObject';
import Icons from '../../../../config/imports/Icons';
import RHF from '../../../../config/imports/RHF';
import fileFunctions from '../../../../functions/fileFunctions';
import Photo from './Photo';

type Props = {
  form: RHF.UseFormReturn<CreateAdvertObject>;
  planeIndex: number;
};

function PhotosUpload({ form, planeIndex }: Props) {
  const { fields, append, remove } = RHF.useFieldArray({
    control: form.control,
    name: `planes.${planeIndex}.photos`,
  });

  const f = useDropzone({
    accept: { 'image/*': [] },
    onDrop: async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const base64 = await fileFunctions.toBase64Async(file);

        append({
          mime: file.type,
          name: file.name,
          base64,
        });
      }
    },
  });

  if (fields.length === 0) {
    return (
      <div className="mb-2 w-80 bg-gray-200 p-2">
        <div
          className="color-blue-900 flex h-60  cursor-pointer items-center justify-center rounded-sm border-2 border-dashed border-gray-300 p-1 pt-3 pb-3 text-center text-sm font-semibold uppercase text-blue-900 "
          {...f.getRootProps()}
        >
          Įtempkite nuotrauką arba paspauskite
          <Icons.Image />
          <input hidden {...f.getInputProps} />
        </div>
      </div>
    );
  }

  const rectangularSize = Math.ceil(Math.sqrt(fields.length));

  return (
    <div className="m-2 ml-4">
      <div className=" mb-2 w-80 bg-gray-200 p-2">
        <div
          className="color-blue-900 flex cursor-pointer items-center justify-center rounded-sm border-2 border-dashed border-gray-300 p-1 pt-3 pb-3 text-center text-sm font-semibold uppercase text-blue-900 "
          {...f.getRootProps()}
        >
          Įtempkite nuotrauką arba paspauskite
          <Icons.Image />
          <input hidden {...f.getInputProps} />
        </div>
      </div>
      <div
        className={`grid h-60 w-80 
  bg-gray-100`}
        style={{
          gridTemplateColumns: `repeat(${rectangularSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rectangularSize}, minmax(0, 1fr))`,
        }}
      >
        {fields.map((image, i) => (
          <Photo key={image.id} image={image} remove={remove} index={i} />
        ))}
      </div>
    </div>
  );
}

export default PhotosUpload;

import React from 'react';
import { CreateAdvertObject } from '../../../api/commands/schema.createAdvertObject';
import FormInput from '../../../components/public/input/form';
import sides_enum from '../../../config/enums/sides';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import RHF from '../../../config/imports/RHF';
import optionsFunctions from '../../../functions/optionsFunctions';
import Plane from './Plane';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type Props = {
  form: RHF.UseFormReturn<CreateAdvertObject>;
  isSubbmiting: boolean;
};

function PlanesGroup({ form, isSubbmiting }: Props) {
  const { fields, append, remove } = RHF.useFieldArray({
    control: form.control,
    name: 'planes',
  });

  console.log('isSubbmiting', isSubbmiting);

  const name = form.watch('name');
  const [listRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <>
      <div className="ml-4 mr-4 flex">
        <Mui.Button
          onClick={() =>
            append({
              isPermitted: false,
              isPremium: false,
              permissionExpiryDate: new Date(),
              partialName: '',
              images: [],
            })
          }
        >
          <Icons.Add /> Pridėti reklaminę plokštumą
        </Mui.Button>
        {fields.length > 0 && (
          <div className="flex flex-grow justify-end">
            <FormInput.SubmitButton isSubmitting={isSubbmiting}>
              Kurti Objektą
            </FormInput.SubmitButton>
          </div>
        )}
      </div>

      <div ref={listRef}>
        {fields.map((field, index) => (
          <Plane
            key={field.id}
            name={name}
            form={form}
            field={field}
            index={index}
            remove={remove}
          />
        ))}
      </div>
    </>
  );
}

export default PlanesGroup;

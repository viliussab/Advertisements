import React from 'react';
import { CreateAdvertObject } from '../../../../api/commands/schema.createAdvertObject';
import FormInput from '../../../../components/public/input/form';
import sides_enum from '../../../../config/enums/sides';
import Icons from '../../../../config/imports/Icons';
import Mui from '../../../../config/imports/Mui';
import RHF from '../../../../config/imports/RHF';
import optionsFunctions from '../../../../functions/optionsFunctions';
import Plane from './ObjectUpdatePlane';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { UpdateAdvertObject } from '../../../../api/commands/schema.updateAdvertObject';

type Props = {
  form: RHF.UseFormReturn<UpdateAdvertObject>;
  isSubbmiting: boolean;
};

function ObjectUpdatePlanesGroup({ form, isSubbmiting }: Props) {
  const { fields, append, remove } = RHF.useFieldArray({
    control: form.control,
    name: 'planes',
    keyName: 'rhfId',
  });

  const name = form.watch('name');
  const planes = form.watch('planes');
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
              photos: [],
              updateStatus: 'New',
            })
          }
        >
          <Icons.Add /> Pridėti reklaminę plokštumą
        </Mui.Button>
        {fields.length >
          planes?.filter((x) => x.updateStatus === 'Deleted').length && (
          <div className="flex flex-grow justify-end">
            <FormInput.SubmitButton isSubmitting={isSubbmiting}>
              Atnaujinti objektą
            </FormInput.SubmitButton>
          </div>
        )}
      </div>

      <div ref={listRef}>
        {fields.map((field, index) => (
          <Plane
            key={field.rhfId}
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

export default ObjectUpdatePlanesGroup;

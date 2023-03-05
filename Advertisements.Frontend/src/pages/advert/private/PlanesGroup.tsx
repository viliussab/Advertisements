import React from 'react';
import { CreateAdvertObject } from '../../../api/commands/schema.createAdvertObject';
import FormInput from '../../../components/public/input/form';
import sides_enum from '../../../config/enums/sides';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import RHF from '../../../config/imports/RHF';
import optionsFunctions from '../../../functions/optionsFunctions';
import Plane from './Plane';

type Props = {
  form: RHF.UseFormReturn<CreateAdvertObject>;
};

function PlanesGroup({ form }: Props) {
  const { fields, append, remove } = RHF.useFieldArray({
    control: form.control,
    name: 'planes',
  });

  const name = form.watch('name');

  return (
    <>
      <Mui.IconButton
        onClick={() =>
          append({
            isPermitted: false,
            isPremium: false,
            permissionExpiryDate: new Date(),
            partialName: '',
          })
        }
      >
        <Icons.Add />
      </Mui.IconButton>
      Pridėti
      <div>
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

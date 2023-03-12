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
};

function PlanesGroup({ form }: Props) {
  const { fields, append, remove } = RHF.useFieldArray({
    control: form.control,
    name: 'planes',
  });

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
            })
          }
        >
          <Icons.Add /> Pridėti stotelę
        </Mui.Button>
        {fields.length > 0 && (
          <div className="flex flex-grow justify-end">
            <Mui.Button variant="contained">Kurti Objektą</Mui.Button>
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
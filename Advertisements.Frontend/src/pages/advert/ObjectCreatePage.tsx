import React from 'react';
import { useQuery } from 'react-query';
import advertQueries from '../../api/calls/advertQueries';

import { zodResolver } from '@hookform/resolvers/zod';
import RHF from '../../config/imports/RHF';
import {
  CreateAdvertObject,
  createAdvertObjectSchema,
} from '../../api/commands/schema.createAdvertObject';
import Mui from '../../config/imports/Mui';
import Form from '../../components/public/Form';
import FormInput from '../../components/public/input/form';
import optionsFunctions from '../../functions/optionsFunctions';
import Private from './private';

function CreateObjectPage() {
  const form = RHF.useForm<CreateAdvertObject>({
    resolver: zodResolver(createAdvertObjectSchema),
    defaultValues: {
      isIlluminated: false,
      latitude: 0,
      longitude: 0,
      serialCode: '',
      typeId: '',
      areaId: '',
      name: '',
      address: '',
      region: '',
      planes: [],
    },
  });

  const areasQuery = useQuery({
    queryKey: advertQueries.areas.key,
    queryFn: advertQueries.areas.fn,
  });

  const typesQuery = useQuery({
    queryKey: advertQueries.types.key,
    queryFn: advertQueries.types.fn,
  });

  return (
    <div className="flex justify-center">
      <Mui.Paper elevation={4} className="m-4 bg-gray-50 p-4">
        <Form form={form}>
          <div className="flex justify-center">
            <div className="m-4 w-64 space-y-3 pt-0">
              <FormInput.TextField
                label="Nr."
                form={form}
                fieldName="serialCode"
                muiProps={{ required: true }}
              />
              <FormInput.TextField
                label="Pavadinimas"
                form={form}
                fieldName="name"
                muiProps={{ required: true }}
              />
              {areasQuery.isLoading || !areasQuery.data ? (
                <FormInput.Select
                  form={form}
                  label="Miestas"
                  fieldName="areaId"
                  options={[]}
                  muiProps={{ disabled: true, required: true }}
                />
              ) : (
                <FormInput.Select
                  form={form}
                  label="Miestas"
                  fieldName="areaId"
                  options={optionsFunctions.convert({
                    data: areasQuery.data,
                    keySelector: (value) => value.id,
                    displaySelector: (value) => value.name,
                  })}
                  muiProps={{ required: true }}
                />
              )}
              {typesQuery.isLoading || !typesQuery.data ? (
                <FormInput.Select
                  form={form}
                  label="Tipas"
                  fieldName="typeId"
                  options={[]}
                  muiProps={{ disabled: true }}
                />
              ) : (
                <FormInput.Select
                  form={form}
                  label="Tipas"
                  fieldName="typeId"
                  options={optionsFunctions.convert({
                    data: typesQuery.data,
                    keySelector: (value) => value.id,
                    displaySelector: (value) => value.name,
                  })}
                  muiProps={{ disabled: true }}
                />
              )}
              <FormInput.TextField
                label="Adresas"
                form={form}
                fieldName="address"
                muiProps={{ required: true }}
              />
              <FormInput.Checkbox
                form={form}
                fieldName="isIlluminated"
                label="Apšvietimas"
              />
            </div>
            {/* <BillboardFormCoordinateSection form={form} areas={areas} /> */}
          </div>
          <Private.PlanesGroup form={form} />
        </Form>
      </Mui.Paper>
    </div>
  );
}

export default CreateObjectPage;

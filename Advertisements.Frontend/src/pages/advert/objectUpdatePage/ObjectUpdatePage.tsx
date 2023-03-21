import React from 'react';
import { useNavigate } from 'react-router-dom';
import RHF from '../../../config/imports/RHF';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from 'react-query';
import advertQueries from '../../../api/calls/advertQueries';
import website_paths from '../../../config/website_paths';
import { toast } from 'react-toastify';
import precisionFunctions from '../../../functions/precisionFunctions';
import Mui from '../../../config/imports/Mui';
import Form from '../../../components/public/Form';
import FormInput from '../../../components/public/input/form';
import optionsFunctions from '../../../functions/optionsFunctions';
import {
  UpdateAdvertObject,
  updateAdvertObjectSchema,
} from '../../../api/commands/schema.updateAdvertObject';
import advertMutations from '../../../api/calls/advertMutations';
import Icons from '../../../config/imports/Icons';
import CreatePrivate from '../objectCreatePage/private';

function ObjectUpdatePage() {
  const navigate = useNavigate();

  const form = RHF.useForm<UpdateAdvertObject>({
    resolver: zodResolver(updateAdvertObjectSchema),
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

  const onSuccess = () => {
    toast.success('Objektas atnaujintas');
    navigate(website_paths.objects.main);
  };

  const updateMutation = useMutation({
    mutationKey: advertMutations.objectCreate.key,
    mutationFn: advertMutations.objectCreate.fn,
    onSuccess,
  });

  const selectedAreaId = form.watch('areaId');

  const area = areasQuery.data?.find((x) => x.id === selectedAreaId);

  const [lat, long] = form.watch(['latitude', 'longitude']);

  const setCoordinates = React.useCallback(
    (lat: number, long: number) => {
      form.setValue('latitude', precisionFunctions.toNumCoordinate(lat));
      form.setValue('longitude', precisionFunctions.toNumCoordinate(long));
    },
    [form],
  );

  React.useEffect(() => {
    if (area) {
      const lat = (area.latitudeSouth + area.latitudeNorth) / 2;
      const long = (area.longitudeEast + area.longitudeWest) / 2;

      setCoordinates(lat, long);
    }
  }, [area, setCoordinates]);

  return (
    <div className="flex justify-center">
      <Mui.Paper elevation={4} className="m-4 bg-gray-50 p-4">
        <Form
          form={form}
          onSubmit={(values) => {
            updateMutation.mutateAsync(values);
          }}
        >
          <div className="m-4 flex justify-center">
            <div className=" w-64 space-y-3 pt-0">
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
              <FormInput.Select
                form={form}
                label="Regionas"
                fieldName="region"
                options={optionsFunctions.convert({
                  data: area?.regions || [],
                  keySelector: (region) => region,
                  displaySelector: (region) => region,
                })}
                muiProps={{ required: true, disabled: !area }}
              />
              {typesQuery.isLoading || !typesQuery.data ? (
                <FormInput.Select
                  form={form}
                  label="Tipas"
                  fieldName="typeId"
                  options={[]}
                  muiProps={{ required: true, disabled: true }}
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
                  muiProps={{ required: true }}
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
            <div className="ml-4 w-96 space-y-3">
              <div className="flex">
                <div className="pr-4">
                  <FormInput.TextField
                    label="Platuma"
                    form={form}
                    fieldName="latitude"
                    muiProps={{
                      type: 'number',
                    }}
                    rules={{
                      valueAsNumber: true,
                    }}
                  />
                </div>
                <div>
                  <FormInput.TextField
                    label="Ilguma"
                    form={form}
                    fieldName="longitude"
                    rules={{
                      valueAsNumber: true,
                    }}
                    muiProps={{
                      type: 'number',
                    }}
                  />
                </div>
              </div>
              <div className="h-96 w-96">
                {area ? (
                  <CreatePrivate.Map
                    className="h-96 w-96"
                    marker={{
                      lat: precisionFunctions.toNumCoordinate(lat),
                      lng: precisionFunctions.toNumCoordinate(long),
                    }}
                    selectedArea={area}
                    setMarker={setCoordinates}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <Icons.Map />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Private.PlanesGroup
            form={form}
            isSubbmiting={updateMutation.isLoading}
          />
        </Form>
      </Mui.Paper>
    </div>
  );
}

export default ObjectUpdatePage;

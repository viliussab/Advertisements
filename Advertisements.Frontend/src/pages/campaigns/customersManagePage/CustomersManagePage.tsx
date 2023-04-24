import { create } from '@mui/material/styles/createTransitions';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import campaignMutations from '../../../api/calls/campaignMutations';
import campaignQueries from '../../../api/calls/campaignQueries';
import Customer from '../../../api/responses/type.Customer';
import Table, { ColumnConfig } from '../../../components/public/table/Table';
import Mui from '../../../config/imports/Mui';
import CustomerCUDialog from './private/CustomerCUDialog';

function CustomersManagePage() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer>();

  const customersQuery = useQuery({
    queryKey: campaignQueries.customers.key,
    queryFn: campaignQueries.customers.fn,
  });

  const createMutation = useMutation({
    mutationKey: campaignMutations.createCustomer.key,
    mutationFn: campaignMutations.createCustomer.fn,
    onSuccess() {
      setOpenCreate(false);
      toast.success('Klientas sukurtas');
      customersQuery.refetch();
    },
  });

  const updateMutation = useMutation({
    mutationKey: campaignMutations.updateCustomer.key,
    mutationFn: campaignMutations.updateCustomer.fn,
    onSuccess() {
      setSelectedCustomer(undefined);
      toast.success('Klientas atnaujintas');
      customersQuery.refetch();
    },
  });

  if (customersQuery.isLoading) {
    return <></>;
  }

  const columns: ColumnConfig<Customer>[] = [
    {
      title: 'Pavadinimas',
      renderCell: (c) => <>{c.name}</>,
      key: 'Title',
    },
    {
      title: 'Adresas',
      renderCell: (c) => <>{c.address}</>,
      key: 'address',
    },
    {
      title: 'Telefonas',
      renderCell: (c) => <>{c.phone}</>,
      key: 'phone',
    },
    {
      title: 'Kontaktinis asmuo',
      renderCell: (c) => <>{c.contactPerson}</>,
      key: 'contactPerson',
    },
    {
      title: 'Paštas',
      renderCell: (c) => <>{c.email}</>,
      key: 'email',
    },
  ];

  return (
    <>
      <div className="m-4 flex justify-center">
        <div className="align-center flex w-auto flex-col">
          <div className="mb-2 flex justify-center">
            <Mui.Button
              onClick={() => {
                setOpenCreate(true);
              }}
            >
              Sukurti naują klientą
            </Mui.Button>
          </div>
          <CustomerCUDialog
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            title="Kurti naują klientą"
            submitText="Kurti klientą"
            isSubmitting={createMutation.isLoading}
            onSubmit={(values) => createMutation.mutateAsync(values)}
          />
          {selectedCustomer && (
            <CustomerCUDialog
              open={!!selectedCustomer}
              onClose={() => setSelectedCustomer(undefined)}
              title="Redaguoti kliento duomenis"
              submitText="Atnaujinti klientą"
              isSubmitting={updateMutation.isLoading}
              values={selectedCustomer}
              onSubmit={(values) =>
                updateMutation.mutateAsync({ id: selectedCustomer.id, values })
              }
            />
          )}
          <Table
            onClick={(elem) => setSelectedCustomer(elem)}
            columns={columns}
            keySelector={(c) => c.id}
            data={customersQuery.data || []}
          />
        </div>
      </div>
    </>
  );

  return <div>CustomersManagePage</div>;
}

export default CustomersManagePage;

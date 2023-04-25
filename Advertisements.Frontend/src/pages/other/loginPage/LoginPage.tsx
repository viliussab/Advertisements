import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Login, loginSchema } from '../../../api/commands/schema.login';
import Form from '../../../components/public/Form';
import FormInput from '../../../components/public/input/form';
import RHF from '../../../config/imports/RHF';

export default function LoginPage() {
  const form = RHF.useForm<Login>({
    resolver: zodResolver(loginSchema),
  });
  return (
    <div className="mt-[-10vh] flex h-[100vh] flex-col items-center justify-center">
      <div className="mb-4 flex items-center justify-center">
        <img className="mt-2 w-[210px]" src="/logo_alt.png" />
      </div>
      <Form form={form}>
        <div className="flex w-[300px] flex-col gap-4 bg-gray-100 p-8">
          <FormInput.TextField
            muiProps={{ type: 'email' }}
            form={form}
            fieldName="email"
            label="El. paštas"
          />
          <FormInput.TextField
            muiProps={{ type: 'password' }}
            form={form}
            fieldName="password"
            label="Slaptažodis"
          />
          <FormInput.SubmitButton isSubmitting={false}>
            Prisijungti
          </FormInput.SubmitButton>
        </div>
      </Form>
    </div>
  );
}

import zod from 'zod';

export const customerCreateUpdateSchema = zod.object({
  name: zod.string(),
  companyCode: zod.string(),
  vatCode: zod.string(),
  address: zod.string(),
  phone: zod.string(),
  contactPerson: zod.string(),
  email: zod.string().email(),
});

export type CustomerCreateUpdate = zod.TypeOf<
  typeof customerCreateUpdateSchema
>;

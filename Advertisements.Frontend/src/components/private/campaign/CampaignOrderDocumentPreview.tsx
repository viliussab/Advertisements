import React from 'react';
import { CampaignCreateUpdate } from '../../../api/commands/schema.createUpdateCampaign';
import RHF from '../../../config/imports/RHF';
import campaignService, {
  getEstimateReturn,
} from '../../../services/campaignService';
import Customer from '../../../api/responses/type.Customer';
import constants from '../../../config/constants';

type Props = {
  form: RHF.UseFormReturn<CampaignCreateUpdate>;
  customers: Customer[];
};

const CampaignOrderDocumentPreview = ({ form, customers }: Props) => {
  const campaign = form.watch();
  const customer = customers.find((x) => x.id === campaign.customerId);

  const estimate = campaignService.getEstimate(campaign);

  const renderCustomerRow = (header: string, content?: string) => {
    return (
      <tr className="border border-black">
        <td className="min-w-[124px] border border-black px-2 text-center ">
          {header}
        </td>
        <td className="min-w-[248px] border border-black px-2 text-center">
          {content}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="border-2 border-gray-300 bg-white p-2">
        <div className="flex items-start justify-between">
          <div className="w-96">
            <img src="/logo_alt.png" />
          </div>
          <table className="border-collapse border border-black">
            <tbody>
              {renderCustomerRow('Klientas', customer?.name)}
              {renderCustomerRow('Įm. kodas', customer?.companyCode)}
              {renderCustomerRow('PVM kodas', customer?.vatCode)}
              {renderCustomerRow('Adresas', customer?.address)}
              {renderCustomerRow('Kampanija', campaign.name)}
              {renderCustomerRow('Kontaktinis asmuo', customer?.contactPerson)}
              {renderCustomerRow('Telefonas', customer?.phone)}
              {renderCustomerRow('El. paštas', customer?.email)}
            </tbody>
          </table>
        </div>
        <div className="mt-2 mb-2 w-full text-center font-bold">
          <div>Reklamos paslaugų teikimo pasiūlymas</div>
        </div>
        <div className="flex justify-center">
          <table className="border-collapse border">
            <tr className="w-full text-center">
              <td
                className="border border-black px-2 text-center"
                colSpan="100%"
              >
                Užsakymo informacija
              </td>
            </tr>
            <tbody>
              <tr>
                <th className="border border-black px-2 text-center">
                  Produktas
                </th>
                <th className="border border-black px-2 text-center">
                  Kiekis<sup>1</sup>
                </th>
                <th className="border border-black px-2 text-center">
                  Savaitės
                </th>
                <th className="border border-black px-2 text-center">
                  (Savaitinė) kaina
                </th>
                <th className="border border-black px-2 text-center">
                  Suma Gross
                </th>
                <th className="border border-black px-2 text-center">
                  Nuolaida
                </th>
                <th className="border border-black px-2 text-center">
                  Vnt. kaina su nuolaida
                </th>
                <th className="border border-black px-2 text-center">
                  Suma Net
                </th>
              </tr>
              <tr>
                <td className="border border-black px-2 text-center">
                  Plokštuma
                </td>
                <td className="border border-black px-2 text-center">
                  {campaign.planeAmount}
                </td>
                <td className="border border-black px-2 text-center">
                  {estimate?.weekCount}
                </td>
                <td className="border border-black px-2 text-center">
                  {estimate?.plane.price}€
                </td>
                <td className="border border-black px-2 text-center">
                  {estimate?.plane.totalPrice}€
                </td>
                <td className="border border-black px-2 text-center">
                  {campaign.discountPercent}%
                </td>
                <td className="border border-black px-2 text-center">
                  {estimate?.plane.priceDiscounted}€
                </td>
                <td className="border border-black px-2 text-center">
                  {estimate?.plane.totalDiscounted}€
                </td>
              </tr>
              {campaign.requiresPrinting && (
                <tr>
                  <td className="border border-black px-2 text-center">
                    Spauda
                  </td>
                  <td className="border border-black px-2 text-center">
                    {estimate?.press.count}
                    <sup>2</sup>
                  </td>
                  <td className="border border-black px-2 text-center">-</td>
                  <td className="border border-black px-2 text-center">
                    {estimate?.press.unitPrice}€
                  </td>
                  <td className="border border-black px-2 text-center">
                    {estimate?.press.totalPrice}€
                  </td>
                  <td className="border border-black px-2 text-center">-</td>
                  <td className="border border-black px-2 text-center">
                    {estimate?.press.unitPrice}€
                  </td>
                  <td className="border border-black px-2 text-center">
                    {estimate?.press.totalPrice}€
                  </td>
                </tr>
              )}
              {estimate?.unplanned.isUnplanned && (
                <tr>
                  <td className="border border-black px-2 text-center">
                    Neplaninis kabinimas
                  </td>
                  <td className="border border-black px-2 text-center">
                    {campaign.planeAmount}
                  </td>
                  <td className="border border-black px-2 text-center">-</td>
                  <td className="border border-black px-2 text-center">
                    {estimate.unplanned.price}€
                  </td>
                  <td className="border border-black px-2 text-center">
                    {estimate.unplanned.totalPrice}€
                  </td>
                  <td className="border border-black px-2 text-center">-</td>
                  <td className="border border-black px-2 text-center">
                    {estimate.unplanned.price}€
                  </td>
                  <td className="border border-black px-2 text-center">
                    {estimate.unplanned.totalPrice}€
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={6}></td>
                <td
                  colSpan={2}
                  className="border border-black px-2 text-center font-bold"
                >
                  Bendra Suma
                </td>
              </tr>
              <tr>
                <td colSpan={6}>
                  <sup className="ml-2">1</sup> Užsakomos plokštumos
                  detalizuojamos priede nr. 1 po sąmatos patvirtinimo
                </td>
                <td className="border border-black px-2 text-center font-bold">
                  Suma be PVM
                </td>
                <td className="border border-black px-2 text-center">
                  {estimate?.totalNoVat}€
                </td>
              </tr>
              <tr>
                <td colSpan={6}>
                  {campaign.requiresPrinting && (
                    <>
                      <sup className="ml-2">2</sup> Užsakomų plakatų skaičius
                      10% didesnis nei nuomojamų plokštumų
                    </>
                  )}
                </td>
                <td className="border border-black px-2 text-center font-bold">
                  PVM 21%
                </td>
                <td className="border border-black px-2 text-center">
                  {estimate?.totalOnlyVat}€
                </td>
              </tr>
              <tr>
                <td colSpan={6}></td>
                <td className="border border-black px-2 text-center font-bold">
                  Suma su PVM
                </td>
                <td className="border border-black px-2 text-center">
                  {estimate?.totalInclVat}€
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

type TrProps = {
  children: React.ReactNode;
};

const Tr = ({ children }: TrProps) => {
  return <tr className="border border-black">{children}</tr>;
};

export default CampaignOrderDocumentPreview;

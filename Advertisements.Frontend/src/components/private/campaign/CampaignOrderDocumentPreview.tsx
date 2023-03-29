import React from 'react';
import { CampaignCreateUpdate } from '../../../api/commands/schema.createUpdateCampaign';
import RHF from '../../../config/imports/RHF';
import campaignService from '../../../services/campaignService';

type Props = {
  form: RHF.UseFormReturn<CampaignCreateUpdate>;
};

const CampaignOrderDocumentPreview = ({ form }: Props) => {
  const campaign = form.watch();

  const esmitate = campaignService.getEstimateProps(campaign);

  return (
    <>
      <div className="flex flex-col justify-end gap-1">
        <EstimatePart
          title="Spaudos kiekis"
          value={`${esmitate.pressUnits} vnt.`}
        />
        <EstimatePart title="Savaičių kiekis" value={`${esmitate.weekCount}`} />
        <EstimatePart
          title="Periodas (savaitėms)"
          value={esmitate.weekPeriod}
        />
        <EstimatePart
          title="Plokštumos kaina su nuolaida"
          value={`${esmitate.stopPriceDiscounted} €`}
        />
        <EstimatePart
          title="Reklamos paslaugos"
          value={`${esmitate.sideTotalPrice} €`}
        />
        <EstimatePart
          title="Spaudos kaina"
          value={`${esmitate.pressUnitsPrice} €`}
        />
        <EstimatePart
          title="Neplaninio nukabinimo kaina"
          value={`${esmitate.unplannedPrice} €`}
        />
        <EstimatePart title="Suma" value={`${esmitate.totalPriceNoVat} €`} />
        <div className="font-bold">
          <EstimatePart
            title="Suma su PVM"
            value={`${esmitate.totalPriceVat} €`}
          />
        </div>
      </div>
    </>
  );
};

type EstimatePartProps = {
  title: string;
  value: string;
};

const EstimatePart = ({ title, value }: EstimatePartProps) => (
  <div className="flex justify-between">
    <div className="text-left" style={{ width: '60%' }}>
      {title}
    </div>
    <div style={{ width: '5%' }} />
    <div className="text-right" style={{ width: '35%' }}>
      {value}
    </div>
  </div>
);

export default CampaignOrderDocumentPreview;

import React from 'react';
import AdvertPlaneOfCampaign from '../../../../api/responses/type.AdvertPlaneOfCampaign';
import Campaign from '../../../../api/responses/type.Campaign';
import Mui from '../../../../config/imports/Mui';
import campaignPlanesFunctions from './campaignPlanesFunctions';
import { Bar, Chart } from 'react-chartjs-2';
import dateFunctions from '../../../../functions/dateFunctions';

type Props = {
  selected: AdvertPlaneOfCampaign[];
  campaign: Campaign;
  open: boolean;
  onClose: () => void;
};

function CampaignPlanesBarGraphDialog(props: Props) {
  const { selected, campaign, open, onClose } = props;

  const getBackgroundColor = (accumulated: number) => {
    if (accumulated < campaign.planeAmount) {
      return 'rgba(201, 203, 207, 0.4)';
    }

    if (accumulated > campaign.planeAmount) {
      return 'rgba(255, 99, 132, 0.4)';
    }

    return 'rgba(75, 192, 192, 0.4)';
  };

  const getBorderColor = (accumulated: number) => {
    if (accumulated < campaign.planeAmount) {
      return 'rgb(201, 203, 207)';
    }

    if (accumulated > campaign.planeAmount) {
      return 'rgb(255, 99, 132)';
    }

    return 'rgb(75, 192, 192)';
  };

  const getAccumulated = (left: number) => campaign.planeAmount - left;

  const remainders = campaignPlanesFunctions.getRemainders(selected, campaign);
  const dataset = remainders.map((x) => ({
    label: dateFunctions.formatWeekShort(x.date),
    data: getAccumulated(x.left),
    backgroundColor: getBackgroundColor(getAccumulated(x.left)),
    borderColor: getBorderColor(getAccumulated(x.left)),
  }));

  return (
    <Mui.Dialog open={open} onClose={onClose}>
      <div className="m-4">
        <div className="mb-2 flex justify-center">
          Savaitinis pasiskirstymas
        </div>
        <Bar
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            indexAxis: 'y',
            scales: {
              x: {
                suggestedMin: 0,
                suggestedMax: campaign.planeAmount,
              },
            },
          }}
          data={{
            labels: dataset.map((x) => x.label),
            datasets: [
              {
                data: dataset.map((x) => x.data),
                borderColor: dataset.map((x) => x.borderColor),
                backgroundColor: dataset.map((x) => x.backgroundColor),
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </Mui.Dialog>
  );
}

export default CampaignPlanesBarGraphDialog;

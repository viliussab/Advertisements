import { useMutation, useQuery } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import campaignMutations from '../../../api/calls/campaignMutations';
import campaignQueries from '../../../api/calls/campaignQueries';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';
import campaignPlanesFunctions from '../../../pages/campaigns/campaignPlanesPage/private/campaignPlanesFunctions';

type Props = {
  selectedCampaignId: string | undefined;
  resetSelectedId: () => void;
  onConfirm: () => void;
};

const CampaignInfoDialog = (props: Props) => {
  const navigate = useNavigate();
  const { selectedCampaignId, resetSelectedId, onConfirm } = props;

  const campaignQuery = useQuery({
    queryKey: campaignQueries.campaign.key,
    queryFn: () =>
      selectedCampaignId
        ? campaignQueries.campaign.fn(selectedCampaignId)
        : undefined,
    enabled: !!selectedCampaignId,
  });

  const confirmMutation = useMutation({
    mutationKey: campaignMutations.campaignConfirm.key,
    mutationFn: campaignMutations.campaignConfirm.fn,
    onSuccess() {
      toast.success('Kampanija patvirtinta');
      resetSelectedId();
      onConfirm();
    },
  });

  const campaign = campaignQuery.data;

  return (
    <Mui.Dialog
      open={!!selectedCampaignId}
      onClose={resetSelectedId}
      maxWidth={false}
    >
      {campaignQuery.isLoading || !campaign ? (
        <div className="h-32 w-32">
          <Mui.CircularProgress />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center text-center text-xl">
              {`${campaign.name}`}
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-sm text-gray-500">
              Klientas: {`${campaign.customer.name}`}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Mui.Button
              onClick={() => {
                navigate(
                  generatePath(website_paths.campaigns.edit, {
                    id: campaign.id,
                  }),
                );
              }}
            >
              Redaguoti pasiūlymą <Icons.Edit sx={{ ml: 1 }} />
            </Mui.Button>
            <Mui.Button
              color="info"
              onClick={() => {
                navigate(
                  generatePath(website_paths.campaigns.edit_detalize, {
                    id: campaign.id,
                  }),
                );
              }}
            >
              Rinkti plokštumas
              <Icons.AddLocation sx={{ ml: 1 }} />
            </Mui.Button>
            {!campaign.isFulfilled &&
              campaignPlanesFunctions.isCampaignFullfiled(campaign) && (
                <Mui.Button
                  disabled={
                    confirmMutation.isLoading || confirmMutation.isSuccess
                  }
                  variant="contained"
                  onClick={() => confirmMutation.mutateAsync(campaign.id)}
                >
                  Tvirtinti kampaniją <Icons.Check sx={{ ml: 2 }} />
                </Mui.Button>
              )}
          </div>
        </div>
      )}
    </Mui.Dialog>
  );
};

export default CampaignInfoDialog;

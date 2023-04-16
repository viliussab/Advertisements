import AdvertPlaneOfCampaign from '../../../../api/responses/type.AdvertPlaneOfCampaign';

export type SelectStatus =
  | 'unselected'
  | 'selected'
  | 'notSelectable'
  | 'hovered';

export type SelectedPlaneToEdit = {
  name: string;
  planeId: string;
  values?: AdvertPlaneOfCampaign;
};

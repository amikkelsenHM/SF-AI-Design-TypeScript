import { ObjectDetailsResponse, ObjectDetailsView } from '../types';
import { campaignAdapter } from './campaign-adapter';

export const objectDetailsAdapter = ({
  tasks,
  target,
  ...response
}: ObjectDetailsResponse): ObjectDetailsView => {
  return {
    ...response,
    target,
    tasks: {
      paging: tasks.paging,
      payload: tasks.payload.map((campaign) =>
        campaignAdapter(campaign, target)
      ),
    },
  };
};

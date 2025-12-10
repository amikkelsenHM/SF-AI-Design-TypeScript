import { deleteOrganization, updateOrganization } from '@/api/account';
import { assignNetworkToOrg, removeNetworkFromOrg } from '@/api/network';
import { useAppStore } from '@/store/useStore';
import { useQueryClient } from '@tanstack/react-query';
import { CookiesEnum } from 'models/enums/CookiesEnum';
import { INetwork } from 'models/interfaces/INetwork';
import { SnackbarSeverity } from 'models/interfaces/IStore';
import { useState } from 'react';
import { Cookies } from 'react-cookie';

export interface OrganizationType {
  id?: string;
  name: string;
  networks?: string[];
  defaultTdmFormat?: string;
  availableTdmFormats?: string[];
  aberrationCorrectionPreference?: string;
}

interface DialogState {
  isOpen: boolean;
  action: 'edit' | 'delete' | '';
  organization: OrganizationType | null;
}

export const useOrganizationActions = ({
  id,
  onRowUpdate,
  networks,
}: {
  id: string;
  onRowUpdate?: (id: string, updates?: Partial<any>) => void;
  networks?: INetwork[];
}) => {
  const { setSnackbar, setTransferCampaignsTo, transferCampaignsTo } =
    useAppStore();
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    action: '',
    organization: null,
  });

  const [editingOrganization, setEditingOrganization] =
    useState<OrganizationType>({
      name: '',
      networks: [],
      defaultTdmFormat: 'Standard',
      availableTdmFormats: ['Standard'],
      aberrationCorrectionPreference: 'Uncorrected',
    });

  const queryClient = useQueryClient();
  const cookies = new Cookies();
  const token = cookies.get(CookiesEnum.TOKEN);

  const openDialog = (
    action: 'edit' | 'delete',
    organization: OrganizationType
  ) => {
    setDialogState({
      isOpen: true,
      action,
      organization,
    });
    if (action === 'edit') {
      setEditingOrganization({
        ...organization,
        defaultTdmFormat: organization.defaultTdmFormat || 'Standard',
        availableTdmFormats: organization.availableTdmFormats || ['Standard'],
        aberrationCorrectionPreference:
          organization.aberrationCorrectionPreference || 'Uncorrected',
      });
    }
  };

  const closeDialog = () => {
    setTransferCampaignsTo();
    setDialogState({
      isOpen: false,
      action: '',
      organization: null,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteOrganization(id, token, transferCampaignsTo!);
      setSnackbar(
        SnackbarSeverity.Success,
        'Organisation deleted successfully'
      );
      onRowUpdate?.(id);
      setTransferCampaignsTo();
      queryClient.invalidateQueries({ queryKey: ['allOrganizations'] });
      closeDialog();
    } catch (error) {
      setSnackbar(SnackbarSeverity.Error, 'Failed to delete organisation');
    }
  };

  const handleUpdate = async (
    updatedOrganization: Partial<OrganizationType>
  ) => {
    try {
      const updateData = {
        name: updatedOrganization.name!,
        defaultTdmFormat: updatedOrganization.defaultTdmFormat,
        availableTdmFormats: updatedOrganization.availableTdmFormats,
        aberrationCorrectionPreference:
          updatedOrganization.aberrationCorrectionPreference,
      };

      await updateOrganization(id, updateData, token);

      if (updatedOrganization.networks) {
        const currentNetworks =
          editingOrganization.networks?.map((n: string | INetwork) =>
            typeof n === 'string' ? n : n.id
          ) || [];

        const newNetworks = updatedOrganization.networks;

        const networksToAdd = newNetworks.filter(
          (id) => !currentNetworks.includes(id)
        );

        const networksToRemove = currentNetworks.filter(
          (id) => !newNetworks.includes(id)
        );

        for (const networkId of networksToAdd) {
          try {
            await assignNetworkToOrg(id, networkId, token);
          } catch (error) {
            setSnackbar(
              SnackbarSeverity.Error,
              `Failed to assign network ${networkId}`
            );
          }
        }

        for (const networkId of networksToRemove) {
          try {
            await removeNetworkFromOrg(id, networkId, token);
          } catch (error) {
            setSnackbar(
              SnackbarSeverity.Error,
              `Failed to remove network ${networkId}`
            );
          }
        }
      }

      setSnackbar(
        SnackbarSeverity.Success,
        'Organisation updated successfully'
      );

      onRowUpdate?.(id, updatedOrganization);
      queryClient.invalidateQueries({ queryKey: ['allOrganizations'] });
      closeDialog();
    } catch (error) {
      setSnackbar(SnackbarSeverity.Error, 'Failed to update organisation');
    }
  };

  return {
    dialogState,
    editingOrganization,
    setEditingOrganization,
    openDialog,
    closeDialog,
    handleDelete,
    handleUpdate,
  };
};

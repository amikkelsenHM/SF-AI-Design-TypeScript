import { createOrganization } from '@/api/account';
import { useAppStore } from '@/store/useStore';
import { useQueryClient } from '@tanstack/react-query';
import { SnackbarSeverity } from 'models/interfaces/IStore';
import { useState } from 'react';
import { Cookies } from 'react-cookie';

export type OrganizationType = {
  id?: string;
  name: string;
  defaultTdmFormat?: string;
  availableTdmFormats?: string[];
  aberrationCorrectionPreference?: string;
};

const initialDialogValue: OrganizationType = {
  name: '',
  defaultTdmFormat: 'Standard',
  availableTdmFormats: ['Standard'],
  aberrationCorrectionPreference: 'Uncorrected',
};

export const useOrganizationModal = () => {
  const [dialogValue, setDialogValue] =
    useState<OrganizationType>(initialDialogValue);
  const { setSnackbar } = useAppStore();
  const queryClient = useQueryClient();
  const cookies = new Cookies();

  const handleSubmit = async (data: Partial<OrganizationType>) => {
    try {
      await createOrganization(
        {
          name: data.name!,
          defaultTdmFormat:
            data.defaultTdmFormat || initialDialogValue.defaultTdmFormat,
          availableTdmFormats:
            data.availableTdmFormats || initialDialogValue.availableTdmFormats,
          aberrationCorrectionPreference:
            data.aberrationCorrectionPreference ||
            initialDialogValue.aberrationCorrectionPreference,
        },
        cookies.get('token')
      );

      setSnackbar(
        SnackbarSeverity.Success,
        'Organisation created successfully'
      );
      queryClient.invalidateQueries({ queryKey: ['allOrganizations'] });
      return true;
    } catch (error) {
      setSnackbar(SnackbarSeverity.Error, 'Failed to create organisation');
      return false;
    }
  };

  const resetDialog = () => {
    setDialogValue(initialDialogValue);
  };

  return {
    dialogValue,
    setDialogValue,
    handleSubmit,
    resetDialog,
  };
};

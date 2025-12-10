'use client';

import { NotificationDialog } from '@/components/v2/dialog/notification-dialog';
import { ControlledInputField } from '@/components/v2/inputs/controlled-input-field';
import { apiKeyColumns } from '@/components/v2/table/columns/account-settings/api-key';
import {
  ApiKey,
  useGenerateApiKey,
} from 'hooks/queries/mutations/useGenerateApiKey';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import TableSection from '../table-section';

const ApiKeySection = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState<ApiKey[]>([]);

  const { control, handleSubmit, setError, reset } = useForm<{
    password: string;
  }>({
    defaultValues: {
      password: '',
    },
  });

  const handleClose = useCallback(() => {
    reset();
    setDialogOpen(false);
  }, [reset]);

  const { mutate, isPending } = useGenerateApiKey({
    setError,
    setData,
    handleClose,
  });

  const onSubmit = ({ password }: { password: string }) => {
    mutate(password);
  };

  return (
    <>
      <TableSection
        title="API Key"
        data={data}
        columns={apiKeyColumns}
        event={() => setDialogOpen(true)}
        eventText="Generate API Key"
        titleClasses="mb-7"
      />

      <NotificationDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        onConfirm={handleSubmit(onSubmit)}
        title="Generate API Key"
        description={
          <div className="flex flex-col gap-2">
            <p>
              Please copy and safely store the key. It is visible only once. You
              will not be able to see the key again.
            </p>
            <span className="text-sm">
              To generate a new API Key, please confirm your password:
            </span>
            <ControlledInputField
              name="password"
              control={control}
              placeholder="Enter password"
              type="password"
              required
              isLoading={isPending}
            />
          </div>
        }
        primaryButtonText="Cancel"
        secondaryButtonText="Confirm"
        variant="warning"
        isLoading={isPending}
      />
    </>
  );
};

export default ApiKeySection;

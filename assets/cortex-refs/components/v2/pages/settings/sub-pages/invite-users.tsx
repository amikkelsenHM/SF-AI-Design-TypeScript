'use client';
import { Separator } from '@/components/components/ui/separator';
import BackButton from '@/components/v2/buttons/back-button';
import Header from '@/components/v2/header';
import { InfoBlock } from '@/components/v2/info-block';
import { BulkCsvUpload } from '@/components/v2/info-block/upload-block';
import { UploadStatusHint } from '@/components/v2/info-block/upload-status-hint';
import { NotificationBanner } from '@/components/v2/notification-banner/notification-banner';
import { useInviteUsersController } from '@/hooks/csv/useInviteUsersController';
import { AddUserSection } from '../sections/invite-users/add-user';
import { BulkInviteReview } from '../sections/invite-users/bulk-invite-preview';

const InviteUsersPage = () => {
  const {
    errorMessage,
    isBannerOpen,
    raiseUiError,
    setIsBannerOpen,
    handleClick,
    fileRef,
    handleChange,
    created,
    sent,
    uploadError,
    draft,
    preview,
    isPending,
    handleSend,
    handleDiscard,
  } = useInviteUsersController();

  return (
    <>
      <NotificationBanner
        variant="error"
        text={errorMessage || ''}
        isOpen={!!errorMessage && isBannerOpen}
        onClose={() => setIsBannerOpen(false)}
      />
      <Header
        title="Invite Users"
        description="Manage your personal settings, organisation and API access."
        standardActions={{ logout: true }}
      />

      <div className="bg-foreground-subtle p-6">
        <InfoBlock
          title="Invite Users"
          description="Invite users to setup a password and login into the platform via their organisation"
          rightSlot={
            <BackButton
              label="Back to User Overview"
              fallbackTo="/settings?tab=users"
            />
          }
        />

        <Separator className="my-9 bg-border-progress !w-1/2" />

        <AddUserSection
          title="Add a User"
          description="Add one or many users via the table below"
          onError={raiseUiError}
        />

        <Separator className="my-9 bg-border-progress" />

        <BulkCsvUpload
          isPending={isPending}
          onUploadClick={handleClick}
          fileInputRef={fileRef}
          onFileChange={handleChange}
          buttonAdjacent={
            <UploadStatusHint
              created={created}
              sent={sent}
              errorText={uploadError ? 'Upload failed' : null}
            />
          }
        />

        {draft && preview && (
          <div className="mt-4">
            <BulkInviteReview
              data={preview}
              isSending={isPending}
              onSend={handleSend}
              onDiscard={handleDiscard}
              hasErrors={!!uploadError?.length}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default InviteUsersPage;

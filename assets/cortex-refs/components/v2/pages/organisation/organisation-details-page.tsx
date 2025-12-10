'use client';

import { Button } from '@/components/components/ui/button';
import { Typography } from '@/components/components/ui/typography';
import {
  useGetOrganisationById,
  useGetOrganisationUsers,
} from '@/hooks/queries/accountQuery';
import { useNavigation } from '@/hooks/useNavigation';
import { useMemo } from 'react';
import BackButton from '../../buttons/back-button';
import Header from '../../header';
import { InfoBlock } from '../../info-block';
import { allUsersColumns } from '../../table/columns/account-settings/all-users';
import TableSection from '../settings/sections/table-section';
import { SETTINGS_COMMON_BREADCRUMBS } from '../settings/sub-pages/constants';

const DetailRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex gap-6 py-1">
    <Typography className="text-sm">{label}</Typography>
    <Typography className="text-sm">{value ?? '—'}</Typography>
  </div>
);

const OrganisationDetailsPage = ({ id }: { id: string }) => {
  const { data: organisation } = useGetOrganisationById(id);
  const { data: users = [] } = useGetOrganisationUsers(id);

  const { navigate } = useNavigation({
    linkTo: `/settings/organisation/${id}/edit`,
  });

  const details = useMemo(
    () => [
      {
        label: 'Organisation Name',
        value: organisation?.name,
      },
      {
        label: 'Default TDM Format',
        value: organisation?.defaultTdmFormat,
      },
      {
        label: 'Available TDM Formats',
        value: organisation?.availableTdmFormats?.join(', '),
      },
      {
        label: 'Aberration Correction',
        value: organisation?.aberrationCorrectionPreference,
      },
    ],
    [organisation]
  );

  return (
    <>
      <Header
        title={organisation?.name ?? 'Organisation Details'}
        description="Manage organisation details and members"
        standardActions={{ logout: true }}
        customBreadcrumbs={SETTINGS_COMMON_BREADCRUMBS}
      />

      <div className="bg-foreground-subtle p-6 rounded-md">
        <InfoBlock
          title=""
          rightSlot={
            <BackButton
              label="Back to Organisations"
              fallbackTo="/settings?tab=organisation"
            />
          }
        />

        <div className="mt-6 mb-10">
          <div className="flex items-center gap-5 mb-6">
            <Typography variant="overline-md">Details</Typography>
            <Button variant="secondary" onClick={navigate}>
              Edit
            </Button>
          </div>

          <div className="grid gap-2">
            {details.map(({ label, value }) => (
              <DetailRow key={label} label={label} value={value} />
            ))}
          </div>
        </div>

        <TableSection
          title="Users"
          columns={allUsersColumns}
          data={users}
          features={{
            tableKey: 'organisationUsers',
            sorting: true,
            filtering: true,
            pagination: true,
            globalFilter: true,
          }}
        />
      </div>
    </>
  );
};

export default OrganisationDetailsPage;

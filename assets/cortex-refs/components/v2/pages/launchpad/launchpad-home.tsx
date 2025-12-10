'use client';

import Header from '@/components/v2/header';
import { useAccountMy } from 'hooks/queries/accountQuery';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { useMemo } from 'react';
import CreateTaskButton from '../object-tracking/common/header/create-task-button';
import {
  HEADER_LAUNCHPAD_DESCRIPTION,
  HEADER_LAUNCHPAD_TITLE,
} from './constants/header';
import LatestObservationsSection from './sections/latest-observations/latest-observations';
import LaunchpadSensorsSections from './sections/launchpad-sensors';

const LaunchpadHome = () => {
  const { data } = useAccountMy();
  const { firstName } = data?.payload || {};

  const title = useMemo(
    () => `${HEADER_LAUNCHPAD_TITLE}${firstName ? `, ${firstName}` : ''}`,
    [firstName]
  );

  return (
    <>
      <Header
        title={title}
        description={HEADER_LAUNCHPAD_DESCRIPTION}
        showBreadcrumbs={false}
        actions={
          <CreateTaskButton
            subscriptionType={SubscriptionType.Time}
            variant="secondary"
          />
        }
      />

      <LatestObservationsSection />

      <LaunchpadSensorsSections />
    </>
  );
};

export default LaunchpadHome;

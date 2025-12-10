'use client';

import { useAuthSession } from 'hooks/useAuthSession';
import { useMemo } from 'react';
import { isAdmin } from 'utils/v2/permissions';
import NetworkMapSection from './network-map-section';
import ObservationPerformanceSection from './observation-performance';
import SensorStatusSection from './sensor-status';

interface LaunchpadSensorsSectionsProps {
  isLoading?: boolean;
}

enum LaunchpadSensorsAuthState {
  LOADING = 'loading',
  ADMIN = 'admin',
  USER = 'user',
}

const AdminLayout = ({ isLoading }: { isLoading: boolean }) => (
  <>
    <div className="mt-5">
      <SensorStatusSection isLoading={isLoading} />
    </div>
    <ObservationPerformanceSection isLoading={isLoading} />
  </>
);

const UserLayout = ({ isLoading }: { isLoading: boolean }) => (
  <div className="mt-5 grid grid-cols-[1fr_400px] gap-5 items-start">
    <NetworkMapSection isLoading={isLoading} />
    <SensorStatusSection isLoading={isLoading} />
  </div>
);

const LoadingLayout = ({ isLoading }: { isLoading: boolean }) => (
  <div className="mt-5">
    <SensorStatusSection isLoading={isLoading} />
  </div>
);

const LaunchpadSensorsSections = ({
  isLoading = false,
}: LaunchpadSensorsSectionsProps) => {
  const { data: session, status } = useAuthSession();

  const authState = useMemo(() => {
    if (status === 'loading') return LaunchpadSensorsAuthState.LOADING;

    if (isAdmin(session)) return LaunchpadSensorsAuthState.ADMIN;

    return LaunchpadSensorsAuthState.USER;
  }, [session, status]);

  const layouts: Record<LaunchpadSensorsAuthState, JSX.Element> = {
    loading: <LoadingLayout isLoading={isLoading} />,
    admin: <AdminLayout isLoading={isLoading} />,
    user: <UserLayout isLoading={isLoading} />,
  };

  return layouts[authState];
};

export default LaunchpadSensorsSections;

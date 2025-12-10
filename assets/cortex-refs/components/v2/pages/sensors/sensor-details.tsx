'use client';

import { useTelescopeDetails } from 'hooks/queries/telescopeQuery';
import { useEventSimulator } from 'hooks/useEventSimulator';
import { useCallback, useState } from 'react';
import { NotificationDialog } from '../../dialog/notification-dialog';
import Header from '../../header';
import { NotificationBanner } from '../../notification-banner/notification-banner';
import { SensorStatus } from './enums';
import SensorConditionsSection from './sections/sensor-condition';
import SensorDetailsSection from './sections/sensor-details';
import SensorFeedSection from './sections/sensor-feed';
import SensorObservationPerformance from './sections/sensor-observation-performance';
import SensorStatusSection from './sections/sensor-status';

const SensorDetails = ({ id, name }: { id: string; name: string }) => {
  const { data } = useTelescopeDetails(name);
  const { payload: telescopeDetails } = data || {};
  // OUT_OF_SCOPE;
  // const { data: session } = useAuthSession();
  // const isAdmin = useMemo(() => isAdminSession(session), [session]);

  // const { execute: handleDownload, isLoading: isDownloading } =
  //   useAsyncAction(downloadAndSaveAsCSV);

  const {
    alertState: { description, variant },
    handleClose: handleCloseBanner,
  } = useEventSimulator(id);

  if (!telescopeDetails) {
    return null;
  }

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpen = useCallback(() => setDialogOpen(true), []);
  const handleClose = useCallback(() => setDialogOpen(false), []);

  const handleConfirm = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const rawStatus = telescopeDetails.operationStatus?.value;
  const operationStatus = rawStatus ? rawStatus.replace(/_/g, ' ') : '';
  const notObserving =
    operationStatus === SensorStatus.NOT_OBSERVING.toUpperCase();

  return (
    <>
      <NotificationBanner
        variant={variant}
        text={description}
        isOpen={!!variant}
        onClose={handleCloseBanner}
      />

      <NotificationDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="This title is more than one line long it’s two lines long for the maximum mium "
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        variant="error"
      />

      <Header
        title={`Sensor: ${telescopeDetails?.name}`}
        standardActions={{ back: true }}
        // TODO: OUT_OF_SCOPE
        // actionComponent={
        //   isAdmin && (
        //     <div>
        //       <Button
        //         variant="tertiary"
        //         size="sm"
        //         onClick={() => handleDownload(id)}
        //         isLoading={isDownloading}
        //       >
        //         Session Logs
        //         <DownloadIcon />
        //       </Button>
        //     </div>
        //   )
        // }
      />
      <SensorStatusSection data={telescopeDetails} />

      <SensorFeedSection sensorId={id} notObserving={notObserving} />

      <SensorConditionsSection
        sensorId={id}
        sensorCoordinates={{
          lat: telescopeDetails.latitude,
          lng: telescopeDetails.longitude,
        }}
      />

      <SensorObservationPerformance sensorId={id} />

      <SensorDetailsSection sensor={telescopeDetails} />
    </>
  );
};

export default SensorDetails;

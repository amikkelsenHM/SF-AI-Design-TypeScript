import Header from '@/components/v2/header';
import MapContainer from '../../map-chart/map-container';
import SensorsTable from '../../sensors/sensors-table';
import {
  HEADER_SENSOR_DESCRIPTION,
  HEADER_SENSOR_TITLE,
} from './constants/header';

const SensorHome = () => {
  return (
    <>
      <Header
        title={HEADER_SENSOR_TITLE}
        description={HEADER_SENSOR_DESCRIPTION}
      />
      <MapContainer />

      <div className="mt-5">
        <SensorsTable
          features={{ globalFilter: true, filtering: true, sorting: true }}
        />
      </div>
    </>
  );
};

export default SensorHome;

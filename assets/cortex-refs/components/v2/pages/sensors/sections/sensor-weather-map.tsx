import { createLocationPinSVG } from '@/components/v2/map-chart/utils/svg-utils';
import { useGetWeatherMap } from 'hooks/queries/telescopeQuery';
import { divIcon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const DEFAULT_ZOOM = 7;
const RAIN_VIEWER_LAYER_CONFIG = { opacity: 0.6, zIndex: 2 };

export default function SensorWeatherMap({
  sensorCoordinates,
}: {
  sensorCoordinates: LatLngExpression | undefined;
}) {
  const { data: mostRecentWeatherMap } = useGetWeatherMap();

  if (!mostRecentWeatherMap) return null;

  return (
    <MapContainer
      center={sensorCoordinates}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      style={{ height: '100%' }}
      attributionControl={false}
      dragging={false}
      zoomControl={false}
    >
      <TileLayer
        className="[filter:sepia(10%)_saturate(5128%)_hue-rotate(230deg)_brightness(90%)_contrast(85%)]"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <TileLayer
        attribution="RainViewer.com"
        url={`https://tilecache.rainviewer.com${mostRecentWeatherMap}/256/{z}/{x}/{y}/8/1_1.png`}
        opacity={RAIN_VIEWER_LAYER_CONFIG.opacity}
        zIndex={RAIN_VIEWER_LAYER_CONFIG.zIndex}
      />
      <Marker
        position={sensorCoordinates!}
        interactive={false}
        icon={divIcon({
          html: createLocationPinSVG(),
        })}
      />
    </MapContainer>
  );
}

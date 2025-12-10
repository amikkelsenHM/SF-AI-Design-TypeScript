import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import { ITelescope } from 'models/interfaces/v2/telescope';
import { PIN_CONFIG } from '../constants/map-constants';
import { getLocationPinDataURL } from './svg-utils';

interface FeatureProperties {
  id: string;
  name: string;
  status: string;
  roof: string;
  weather: {
    cloudCover: number;
    humidity: number;
    windSpeed: number;
  };
  telescopes: ITelescope[];
  geometry: GeoJSON.Point;
  isObserving: boolean;
}

export interface PinReference {
  id: string;
  pinIcon: am5.Picture;
  isObserving: boolean;
}

function addLocationMarkers(
  _root: am5.Root,
  pointSeries: am5map.ClusteredPointSeries,
  map: am5map.MapChart,
  setObservatoryId: (id: string) => void,
  tooltipState: { hoveredObservatoryName: string | null },
  selectedObservatoryId?: string
): PinReference[] {
  const pinReferences: PinReference[] = [];
  pointSeries.bullets.push(function (root, _, dataItem) {
    const feature = dataItem.dataContext as FeatureProperties;
    const { id, name, isObserving } = feature;
    const container = am5.Container.new(root, {
      interactive: true,
      cursorOverStyle: 'pointer',
    });

    const isSelected = id === selectedObservatoryId;
    const pinIcon = am5.Picture.new(root, {
      width: PIN_CONFIG.SIZE,
      height: PIN_CONFIG.SIZE,
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: getLocationPinDataURL({ isSelected, isObserving }),
    });

    container.children.push(pinIcon);

    const mapTooltip = map.get('tooltip');
    container.events.on('pointerover', () => {
      tooltipState.hoveredObservatoryName = name;
      mapTooltip?.show();
    });

    container.events.on('pointerout', () => {
      tooltipState.hoveredObservatoryName = null;
      mapTooltip?.hide();
      document.body.style.cursor = 'auto';
    });

    pinReferences.push({ id, pinIcon, isObserving });

    const dot = container.children.push(
      am5.Circle.new(root, {
        fillOpacity: 0,
        cursorOverStyle: 'pointer',
        fill: am5.color(0x36274a),
        interactive: true,
        toggleKey: 'active',
      })
    );

    dot.events.on('click', () => {
      setObservatoryId(id);
    });

    map.events.on('pointerdown', () => {
      document.body.style.cursor = 'auto';
    });

    return am5.Bullet.new(root, {
      sprite: container,
      dynamic: true,
    });
  });

  return pinReferences;
}

export default addLocationMarkers;

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import {
  GlobeDotReference,
  GlobePointData,
  PointGeometry,
} from 'models/interfaces/v2/am-chart';
import { Dispatch, SetStateAction } from 'react';
import {
  COLOR_GREEN,
  COLOR_WHITE,
  MEDIUM_RADIUS,
  SMALL_RADIUS,
} from '../constants/map-constants';
import { spinTo } from './spin-to';

function addGlobeLocationDots(
  root: am5.Root,
  map: am5map.MapChart,
  pointSeries: am5map.ClusteredPointSeries,
  setObservatoryId: Dispatch<SetStateAction<string | undefined>>,
  setSelectedId: (id: string) => void,
  tooltipStateRef: React.MutableRefObject<{
    hoveredObservatoryName: string | null;
  }>
): GlobeDotReference[] {
  const dotReferences: GlobeDotReference[] = [];

  pointSeries.bullets.push((rootParam, _series, dataItem) => {
    const properties = (dataItem?.dataContext as GlobePointData) || {};
    const { id, name, isObserving } = properties;

    const circle = am5.Circle.new(rootParam, {
      radius: isObserving ? MEDIUM_RADIUS : SMALL_RADIUS,
      stroke: am5.color(COLOR_WHITE),
      strokeWidth: 1,
      cursorOverStyle: 'pointer',
      fill: am5.color(isObserving ? COLOR_GREEN : COLOR_WHITE),
    });

    circle.set(
      'tooltipHTML',
      `<div class="typography-body-sm text-foreground">${name}</div>`
    );

    // Event for clicking a dot
    circle.events.on('click', () => {
      setSelectedId(id);
      setObservatoryId(id);
      const coords = (dataItem?.get('geometry') as PointGeometry)?.coordinates;
      if (coords) {
        spinTo(map, coords[1], coords[0]);
      }
    });

    circle.events.on('pointerover', () => {
      tooltipStateRef.current.hoveredObservatoryName = name;
    });

    circle.events.on('pointerout', () => {
      tooltipStateRef.current.hoveredObservatoryName = null;
    });

    dotReferences.push({ id, isObserving, circle });

    return am5.Bullet.new(rootParam, { sprite: circle });
  });

  return dotReferences;
}

export default addGlobeLocationDots;

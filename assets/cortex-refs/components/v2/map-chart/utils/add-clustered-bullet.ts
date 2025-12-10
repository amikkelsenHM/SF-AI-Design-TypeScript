import * as am5 from '@amcharts/amcharts5';
import { IClusteredDataItem } from '@amcharts/amcharts5/.internal/charts/map/ClusteredPointSeries';
import { IComponentDataItem } from '@amcharts/amcharts5/.internal/core/render/Component';
import * as am5map from '@amcharts/amcharts5/map';
import { GlobePointData } from 'models/interfaces/v2/am-chart';
import { COLOR_GREEN, COLOR_WHITE } from '../constants/map-constants';

const CIRCLE_RADIUS = 12;

const onClusterClick = (
  container: am5.Container,
  pointSeries: am5map.ClusteredPointSeries
) => {
  container.events.on('click', (e) => {
    pointSeries.zoomToCluster(
      e.target.dataItem as am5.DataItem<IComponentDataItem>
    );
  });
};

const computeClusterColor = (
  dataItem: am5.DataItem<IClusteredDataItem>,
  circle: am5.Circle,
  label: am5.Label
) => {
  dataItem.on('children', (children: any) => {
    const hasObserving = children?.some(
      (item: any) => !!(item?.dataContext as GlobePointData)?.isObserving
    );
    const color = am5.color(hasObserving ? COLOR_GREEN : COLOR_WHITE);
    circle.setAll({ stroke: color });
    label.setAll({ fill: color });
  });
};

export function attachClusteredBullet(
  root: am5.Root,
  pointSeries: am5map.ClusteredPointSeries
) {
  pointSeries.set('clusteredBullet', (_root, _series, dataItem) => {
    const container = am5.Container.new(_root, { cursorOverStyle: 'pointer' });

    const circle = container.children.push(
      am5.Circle.new(_root, {
        radius: CIRCLE_RADIUS,
        fillOpacity: 0,
        fill: am5.color(COLOR_WHITE),
        stroke: am5.color(COLOR_WHITE),
        strokeWidth: 1,
        tooltipY: 0,
      })
    );

    const label = container.children.push(
      am5.Label.new(_root, {
        centerX: am5.p50,
        centerY: am5.p50,
        populateText: true,
        fontSize: '10',
        text: '{value}',
        fill: am5.color(COLOR_WHITE),
      })
    );

    computeClusterColor(dataItem, circle, label);
    onClusterClick(container, pointSeries);

    return am5.Bullet.new(_root, { sprite: container });
  });
}

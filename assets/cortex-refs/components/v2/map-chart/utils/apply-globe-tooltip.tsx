import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';

export function applyGlobeTooltip(map: am5map.MapChart) {
  const tooltip = map.get('tooltip');
  if (!tooltip) return;

  tooltip.setAll({
    getFillFromSprite: false,
    getStrokeFromSprite: false,
  });

  tooltip.get('background')?.setAll({
    fill: am5.color(0x36274a),
    strokeOpacity: 0,
    fillOpacity: 0.95,
  });

  tooltip.label.setAll({
    fill: am5.color(0xffffff),
  });
}

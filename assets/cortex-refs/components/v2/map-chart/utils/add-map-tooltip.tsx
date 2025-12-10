import { Typography } from '@/components/components/ui/typography';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import { throttle } from 'lodash';
import ReactDOMServer from 'react-dom/server';

const COORDINATES_PRECISION = 4;
const formatCoords = (lat: number, lng: number) =>
  `${lat.toFixed(COORDINATES_PRECISION)}, ${lng.toFixed(
    COORDINATES_PRECISION
  )}`;

const TOOLTIP_TEXT_PLACEHOLDER = '#tooltipText#';
const TOOLTIP_UPDATE_DELAY_MS = 300;

export function addMapTooltip(
  map: am5map.MapChart,
  tooltipState: { hoveredObservatoryName: string | null }
) {
  const tooltip = map.get('tooltip');
  if (!tooltip) return;

  tooltip.get('background')?.setAll({
    strokeOpacity: 0,
    fill: am5.color(0x36274a),
  });

  const tooltipHTML = ReactDOMServer.renderToString(
    <Typography variant="body-sm" className="text-foreground">
      {TOOLTIP_TEXT_PLACEHOLDER}
    </Typography>
  );

  const updateTooltip = throttle((ev: { target: am5.Tooltip }) => {
    let textToShow: string | null = null;

    if (tooltipState.hoveredObservatoryName) {
      textToShow = tooltipState.hoveredObservatoryName;
    } else {
      const geoPoint = map.invert({ x: ev.target.x(), y: ev.target.y() });
      if (geoPoint) {
        textToShow = formatCoords(geoPoint.latitude, geoPoint.longitude);
      }
    }

    if (textToShow) {
      const html = tooltipHTML.replace(TOOLTIP_TEXT_PLACEHOLDER, textToShow);
      map.set('tooltipHTML', html);
    }
  }, TOOLTIP_UPDATE_DELAY_MS);

  tooltip.events.on('positionchanged', updateTooltip);

  map.chartContainer.events.on('pointerout', () => {
    tooltip.hide();
  });
}

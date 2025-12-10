import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';

const SPIN_THROTTLE_MS = 200;

export const spinTo = (chart: am5map.MapChart, lat: number, lon: number) => {
  chart.animate({
    key: 'rotationX',
    to: -lon,
    duration: 900,
    easing: am5.ease.out(am5.ease.cubic),
  });
  chart.animate({
    key: 'rotationY',
    to: -lat,
    duration: 900,
    easing: am5.ease.out(am5.ease.cubic),
  });
  chart.animate({
    key: 'zoomLevel',
    to: 2.2,
    duration: 600,
    easing: am5.ease.out(am5.ease.quad),
  });
};

export const spinToNoZoom = (
  chart: am5map.MapChart,
  lat: number,
  lon: number,
  duration = 900
) => {
  chart.animate({
    key: 'rotationX',
    to: -lon,
    duration,
    easing: am5.ease.out(am5.ease.cubic),
  });
  chart.animate({
    key: 'rotationY',
    to: -lat,
    duration,
    easing: am5.ease.out(am5.ease.cubic),
  });
};

let lastSpinTs = 0;

export function throttledSpinToNoZoom(
  chart: am5map.MapChart,
  lat: number,
  lon: number
) {
  const now = Date.now();
  if (now - lastSpinTs < SPIN_THROTTLE_MS) return;
  lastSpinTs = now;
  spinToNoZoom(chart, lat, lon);
}

import type { LatLon } from '@/utils/v2/tle-utils';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import { MAP_COLORS } from '../constants/map-constants';

function toLineSeries(
  root: am5.Root,
  map: am5map.MapChart,
  segments: LatLon[][],
  style: any
) {
  const series = map.series.push(
    am5map.MapLineSeries.new(root, {
      geoJSON: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates: segments.map((seg) =>
                seg.map(({ longitude, latitude }) => [longitude, latitude])
              ),
            },
            properties: {},
          },
        ],
      },
    })
  );
  series.mapLines.template.setAll(style);
  return series;
}

export function addOrbitLines(
  root: am5.Root,
  map: am5map.MapChart,
  pastSegments: LatLon[][],
  futureSegments: LatLon[][]
) {
  const pastSeries = toLineSeries(root, map, pastSegments, {
    stroke: MAP_COLORS.ORBIT_LINE,
    strokeWidth: 2,
    strokeOpacity: 0.8,
    strokeDasharray: [6, 6],
  });

  const futureSeries = toLineSeries(root, map, futureSegments, {
    stroke: MAP_COLORS.ORBIT_LINE,
    strokeWidth: 2,
  });

  pastSeries.toFront();
  futureSeries.toFront();

  return { pastSeries, futureSeries };
}

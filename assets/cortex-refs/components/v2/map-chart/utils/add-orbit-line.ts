import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';

export function addOrbitLine(
  root: am5.Root,
  map: am5map.MapChart,
  orbit: { latitude: number; longitude: number }[]
) {
  const orbitSeries = map.series.push(
    am5map.MapLineSeries.new(root, {
      geoJSON: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: orbit.map(({ longitude, latitude }) => [
                longitude,
                latitude,
              ]),
            },
            properties: {},
          },
        ],
      },
    })
  );

  orbitSeries.mapLines.template.setAll({
    stroke: am5.color(0xff0000),
    strokeWidth: 2,
  });

  return orbitSeries;
}

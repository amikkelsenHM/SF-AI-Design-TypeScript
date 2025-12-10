import { useAllObjects } from '@/hooks/queries/campaignQuery';
import { getNextObservationPredictions } from '@/services/next-observation-estimator';
import { useQuery } from '@tanstack/react-query';
import { StaleTime } from 'models/enums/v2/stale-time';
import { LATEST_OBSERVATIONS_PARAMS } from 'static/v2/general-constants';

const NEXT_OBSERVATIONS_PREDICTIONS = 'nextObservationPredictions';

export function useLatestObservationData() {
  const { data, isLoading: isObjectsLoading } = useAllObjects(
    LATEST_OBSERVATIONS_PARAMS
  );
  const objectsPayload = data?.payload ?? [];
  const noradIds = objectsPayload.map((item) => item.noradId);

  const query = useQuery({
    queryKey: [NEXT_OBSERVATIONS_PREDICTIONS, noradIds],
    queryFn: async () => {
      const predictionResult = await getNextObservationPredictions(noradIds);

      return objectsPayload.map((object) => ({
        ...object,
        prediction: predictionResult[object.noradId],
      }));
    },
    enabled: objectsPayload.length > 0,
    staleTime: StaleTime.MEDIUM,
  });

  return { ...query, isLoading: query.isLoading || isObjectsLoading };
}

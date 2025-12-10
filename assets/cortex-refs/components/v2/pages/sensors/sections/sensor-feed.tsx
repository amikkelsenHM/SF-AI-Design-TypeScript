import { useSkeleton } from '@/components/lib/skeleton/patterns';
import ImageFeed from '@/components/v2/images/image-feed';
import SectionTitle from '@/components/v2/section-title/section-title';
import {
  useTelescopeObservation,
  useTelescopeSnapshot,
} from 'hooks/queries/telescopeQuery';

interface SensorFeedsSectionProps {
  sensorId?: string;
  notObserving?: boolean;
}

const SensorFeedSection = ({
  sensorId,
  notObserving,
}: SensorFeedsSectionProps) => {
  const observationQuery = useTelescopeObservation(sensorId!);
  const snapshotQuery = useTelescopeSnapshot(sensorId!);

  const { presets } = useSkeleton();
  const liveFeedSkeleton = presets.liveFeedStandard().build();

  const observationImageData = observationQuery.data || null;
  const snapshotImageData = snapshotQuery.data || null;

  const isLoading = snapshotQuery.isLoading || observationQuery.isLoading;

  return (
    <section className="mb-5">
      <SectionTitle text="LIVE FEEDS" />
      {isLoading ? (
        liveFeedSkeleton
      ) : (
        <div className="flex gap-5 flex-col md:flex-row">
          <ImageFeed
            title="Recent Observation Image"
            imageData={observationImageData}
            imageAlt="Recent observation from sensor"
            onRefreshImage={() => observationQuery.refetch()}
            notObserving={notObserving}
          />

          <ImageFeed
            title="Sensor Feed"
            imageData={snapshotImageData}
            imageAlt="Live sensor feed"
            onRefreshImage={() => snapshotQuery.refetch()}
            notObserving={notObserving}
          />
        </div>
      )}
    </section>
  );
};

export default SensorFeedSection;

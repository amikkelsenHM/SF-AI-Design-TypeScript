import { Typography } from '@/components/components/ui/typography';
import { Row, SFDataTable } from '@/components/v2/table-new';
import { useRouter } from 'next/navigation';
import { latestObservationsColumns } from '../../../object-tracking/columns/object-tracking';
import { ObjectSummary } from '../../../object-tracking/types';
import { useLatestObservationData } from './hooks/useLatestObservationsData';

const SORT_OPTIONS = [{ label: 'My Tracks', value: 'createdByMe' }];

interface LatestObservationsSectionProps {
  isLoading?: boolean;
}

const LatestObservationsSection = ({
  isLoading: externalLoading = false,
}: LatestObservationsSectionProps) => {
  const { data: latestObservations = [], isLoading } =
    useLatestObservationData();
  const router = useRouter();

  // TODO: This is fo furture use

  // const {
  //   observations,
  //   isLoading: wsLoading,
  //   isConnected,
  // } = useLatestObservationsWebSocket();

  // const useWebSocketData = isConnected && observations.length > 0;
  // const isLoading = externalLoading || (wsLoading && !useWebSocketData);

  const handleRowClick = ({ original }: Row<ObjectSummary>) =>
    router.push(`/object-tracking/${original.noradId}`);

  return (
    <div className="grid gap-y-3">
      <Typography variant="overline-md" className="text-foreground">
        Latest data
      </Typography>
      {/* OUT_OF_SCOPE */}
      {/* <div className="flex gap-x-3 items-center">
        <Typography className="text-foreground">Filter:</Typography>
        <Select
          size="xs"
          options={SORT_OPTIONS}
          value={SORT_OPTIONS[0].value}
          fluid
        />
      </div> */}

      <SFDataTable
        tableKey="latestObservations"
        showRowCursor
        isLoading={isLoading}
        columns={latestObservationsColumns}
        enableSorting={true}
        data={latestObservations}
        hasRowBorder
        onRowClick={handleRowClick}
        // OUT_OF_SCOPE
        // initialState={{
        //   sorting: [{ id: 'nextObservation', desc: false }],
        // }}
      />
    </div>
  );
};

export default LatestObservationsSection;

import { SFDataTable } from '@/components/v2/table-new';
import {
  useGetAllOrganisations,
  useMyFullName,
} from 'hooks/queries/accountQuery';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { NewObjectTrackingFormData } from '../../../types';
import { getTrackSummaryData } from '../utils';
import { columns } from './columns';

const TrackSummaryTable = () => {
  const { getValues } = useFormContext<NewObjectTrackingFormData>();

  const { fullName, isLoading: isFullNameLoading } = useMyFullName();
  const { data: organisations, isLoading: isOrganisationsLoading } =
    useGetAllOrganisations();
  const isLoading = isFullNameLoading || isOrganisationsLoading;

  const tableData = useMemo(() => {
    const values = getValues();

    return getTrackSummaryData(values, organisations, fullName);
  }, [getValues, fullName, organisations]);

  return (
    <SFDataTable
      columns={columns}
      data={tableData}
      hideHeader
      hasRowBorder
      variant="rounded"
      isLoading={isLoading}
    />
  );
};

export default TrackSummaryTable;

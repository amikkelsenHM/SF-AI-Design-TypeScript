import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { columns } from '@/components/v2/pages/object-tracking/new/form-preview/sections/track-summary/columns';
import { SFDataTable } from '@/components/v2/table-new';
import { useMemo } from 'react';
import { TrackSummaryRowIds } from './track-summary/columns';

interface CoordinatesSectionProps {
  preview: string | undefined;
  fileName: string | undefined;
}

const CoordinatesSection = ({ preview, fileName }: CoordinatesSectionProps) => {
  const tableData = useMemo(
    () => [
      {
        id: TrackSummaryRowIds.FILE_UPLOADED,
        label: 'File Uploaded',
        value: fileName || '',
      },
    ],
    [fileName]
  );

  return (
    <FormSection title="Coordinate Details">
      <div className="flex flex-col gap-3 typography-body-sm text-foreground">
        <SFDataTable
          columns={columns}
          data={tableData}
          hideHeader
          hasRowBorder
        />

        <div className="px-3">Sample</div>
        <pre className="p-3 bg-foreground-subtle rounded-lg max-h-50 overflow-auto">
          {preview}
        </pre>
      </div>
    </FormSection>
  );
};

export default CoordinatesSection;

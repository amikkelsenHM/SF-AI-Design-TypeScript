'use client';

import { ChangeEvent, ReactNode, RefObject } from 'react';
import { InfoBlock } from '.';

interface BulkCsvUploadProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonVariant?: 'secondary' | 'primary' | 'tertiary';
  isPending?: boolean;
  onUploadClick: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonAdjacent?: ReactNode;
}

export const BulkCsvUpload = ({
  title = 'Bulk Upload',
  description = 'Upload a CSV file. Please ensure the format matches the table above.',
  buttonLabel = 'Upload',
  buttonVariant = 'secondary',
  isPending,
  onUploadClick,
  fileInputRef,
  onFileChange,
  buttonAdjacent,
}: BulkCsvUploadProps) => {
  return (
    <>
      <InfoBlock
        title={title}
        description={description}
        buttonLabel={isPending ? 'Uploading…' : buttonLabel}
        buttonVariant={buttonVariant}
        className="mt-15"
        onButtonClick={onUploadClick}
        buttonAdjacent={buttonAdjacent}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={onFileChange}
      />
    </>
  );
};

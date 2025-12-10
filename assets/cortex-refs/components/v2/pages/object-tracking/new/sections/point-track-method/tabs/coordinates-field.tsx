import { FileUploadButton } from '@/components/components/ui/file-upload-button';
import { Typography } from '@/components/components/ui/typography';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';
import { ObjectTrackingTargetMode } from '../../../../enums';
import { NewObjectTrackingFormData } from '../../../types';

const CoordinatesField = () => {
  const {
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useFormContext<NewObjectTrackingFormData>();
  const trackMethod = watch('trackMethod');
  const preview = trackMethod?.meta?.jsonPreview;

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;

    try {
      const jsonString = await file.text();
      const parsed = JSON.parse(jsonString);
      setValue('trackMethod', {
        mode: ObjectTrackingTargetMode.Coordinates,
        value: jsonString,
        meta: {
          fileName: file.name,
          jsonPreview: JSON.stringify(parsed, null, 2),
        },
      });
    } catch (error) {
      setError('trackMethod.value', {
        message: 'There was an error uploading the file',
      });
    }
  };

  return (
    <div className="flex flex-col gap-4.5">
      <Typography className="text-foreground">
        Please upload ephemeris data via a JSON file.{' '}
        {/* TODO: handle downloadTemplate */}
        <Link
          href="#"
          className="typography-body-sm text-medium-orchid hover:underline"
        >
          Download the template
        </Link>{' '}
        for guidance.
      </Typography>

      {/* TODO: currently there is no way to remove the uploaded file, clarify if we should support file removing */}
      <FileUploadButton
        variant="secondary"
        size="lg"
        className="w-fit"
        accept="application/json"
        error={errors.trackMethod?.value?.message}
        onChange={handleUpload}
      >
        Upload
      </FileUploadButton>

      {/* TODO: update when there is according design for the JSON preview */}
      {preview && (
        <pre className="typography-body-sm text-foreground p-3">{preview}</pre>
      )}
    </div>
  );
};

export default CoordinatesField;

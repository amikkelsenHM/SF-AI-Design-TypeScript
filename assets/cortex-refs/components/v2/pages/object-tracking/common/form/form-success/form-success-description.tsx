import { Typography } from '@/components/components/ui/typography';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

interface FormSuccessDescriptionProps {
  taskId: string;
  noradId?: number;
}

const FormSuccessDescription = ({
  taskId,
  noradId,
}: FormSuccessDescriptionProps) => {
  const { getValues } = useFormContext<{ name: string }>();
  const name = getValues('name');

  return (
    <Typography>
      You will be notified when the first object is tracked. You can also view
      the track details via{' '}
      <Link
        href={`/object-tracking/${noradId}?taskId=${taskId}`}
        className="text-medium-orchid hover:underline w-fit"
      >
        {name}
      </Link>
    </Typography>
  );
};

export default FormSuccessDescription;

import { Button } from '@/components/components/ui/button';

interface FormActionsProps {
  submitButtonType: 'button' | 'submit';
  isSubmitting?: boolean;
  submitText?: string;
  onCancel: () => void;
  onSubmit?: () => void;
  submitDisabled?: boolean;
}

const FormActions = ({
  submitButtonType,
  isSubmitting = false,
  submitText = 'Submit',
  onCancel,
  onSubmit,
  submitDisabled = false,
}: FormActionsProps) => {
  return (
    <div className="flex gap-3 ml-auto">
      <Button
        type="button"
        variant="tertiary"
        size="lg"
        disabled={isSubmitting}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type={submitButtonType}
        size="lg"
        isLoading={isSubmitting}
        onClick={onSubmit}
        disabled={submitDisabled}
      >
        {submitText}
      </Button>
    </div>
  );
};

export default FormActions;

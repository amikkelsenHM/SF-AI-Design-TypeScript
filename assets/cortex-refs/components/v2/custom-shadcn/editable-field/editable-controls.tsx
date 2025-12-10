'use client';

import { Button } from '@/components/components/ui/button';
import { CheckIcon, CloseIcon, EditIcon } from '@/components/v2/icons';

export function EditableControls({
  isEditing,
  isLoading,
  size = 'icon-sm',
  onStartEdit,
  onCancel,
  onConfirm,
}: {
  isEditing: boolean;
  isLoading?: boolean;
  size?: 'icon' | 'icon-sm';
  onStartEdit?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}) {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size={size}
          variant="secondary"
          isLoading={isLoading}
          onClick={onCancel}
        >
          <CloseIcon />
        </Button>
        <Button
          type="button"
          size={size}
          variant="secondary"
          isLoading={isLoading}
          onClick={onConfirm}
        >
          <CheckIcon />
        </Button>
      </div>
    );
  }
  return (
    <Button
      type="button"
      variant="secondary"
      size={size}
      isLoading={isLoading}
      onClick={onStartEdit}
    >
      <EditIcon />
    </Button>
  );
}

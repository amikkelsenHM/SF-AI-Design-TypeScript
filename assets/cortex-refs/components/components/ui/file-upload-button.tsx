import { ChangeEvent, useRef } from 'react';
import { Button, ButtonProps } from './button';
import { Input } from './input';
import { Typography } from './typography';

interface FileUploadButtonProps
  extends Omit<ButtonProps, 'type' | 'onChange' | 'onClick'> {
  accept: string;
  error?: string;
  onChange: (file: File | undefined) => void;
}

function FileUploadButton({
  accept,
  error,
  onChange,
  ...props
}: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <div className="flex flex-col gap-1">
      <Button type="button" onClick={handleClick} {...props} />
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleAvatarChange}
      />
      {error && (
        <Typography variant="label" className="text-foreground-error">
          {error}
        </Typography>
      )}
    </div>
  );
}

export { FileUploadButton };

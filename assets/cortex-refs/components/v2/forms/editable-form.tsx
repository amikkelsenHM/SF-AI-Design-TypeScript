'use client';

import { Button } from '@/components/components/ui/button';
import { Checkbox } from '@/components/components/ui/checkbox';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import { Separator } from '@/components/components/ui/separator';
import { cn } from '@/components/lib/utils';
import {
  AberrationOptions,
  TdmFormats,
} from 'models/interfaces/v2/organisations';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ControlledSelectField } from '../select/controlled-select-field';

const FIELD_CLASSNAMES = {
  CONTAINER: 'gap-y-1 mb-4',
  LABEL: 'text-xs font-normal mb-1',
};

interface CheckboxItem {
  id: string;
  name: string;
}

interface EditableFormProps<TForm extends FieldValues> {
  title: string;
  inputLabel: string;
  inputName: Path<TForm>;
  checkboxLabel: string;
  checkboxName: Path<TForm>;
  checkboxItems: CheckboxItem[];
  form: UseFormReturn<TForm>;
  onSave: (values: TForm) => Promise<void>;
  submitLabel?: string;
  isLoading?: boolean;
  tdmFormatOptions?: { label: string; value: TdmFormats }[];
  availableTdmFormatOptions?: { label: string; value: TdmFormats }[];
  aberrationOptions?: { label: string; value: AberrationOptions }[];
}

const EditableForm = <TForm extends FieldValues>({
  title,
  inputLabel,
  inputName,
  checkboxLabel,
  checkboxName,
  checkboxItems,
  form,
  onSave,
  submitLabel = 'Save',
  isLoading = false,
  tdmFormatOptions,
  availableTdmFormatOptions,
  aberrationOptions,
}: EditableFormProps<TForm>) => {
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { isValid },
  } = form;

  const [isSaved, setIsSaved] = useState(false);

  const watchedInput = watch(inputName);
  const watchedCheckboxes: string[] = watch(checkboxName) || [];

  const canSubmit =
    isValid &&
    watchedInput?.trim().length > 0 &&
    Array.isArray(watchedCheckboxes) &&
    watchedCheckboxes.length > 0;

  const handleFormSubmit = async (values: TForm) => {
    try {
      await onSave(values);
      setIsSaved(true);
    } catch (err) {
      setIsSaved(false);
    }
  };

  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => setIsSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaved]);

  return (
    <div>
      <Separator className="mb-9 bg-border-progress max-w-[600px]" />
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="text-foreground"
      >
        <Label htmlFor={inputName}>{inputLabel}</Label>
        <Input
          id={inputName}
          type="text"
          {...register(inputName, { required: true })}
          className="mb-4 mt-1 max-w-[410px]"
          disabled={isLoading}
        />

        <div
          className={cn('max-w-[410px] space-y-4', FIELD_CLASSNAMES.CONTAINER)}
        >
          {tdmFormatOptions && (
            <ControlledSelectField<TForm, Path<TForm>>
              name={'defaultTdmFormat' as Path<TForm>}
              control={control}
              label="Default TDM Format"
              placeholder="Select default format"
              options={tdmFormatOptions}
              labelClassName={FIELD_CLASSNAMES.LABEL}
              required
            />
          )}

          {availableTdmFormatOptions && (
            <ControlledSelectField<TForm, Path<TForm>>
              name={'availableTdmFormats' as Path<TForm>}
              control={control}
              label="Available TDM Formats"
              placeholder="Select available format"
              options={availableTdmFormatOptions}
              labelClassName={FIELD_CLASSNAMES.LABEL}
              isMulti
              required
            />
          )}

          {aberrationOptions && (
            <ControlledSelectField<TForm, Path<TForm>>
              name={'aberrationCorrectionPreference' as Path<TForm>}
              control={control}
              label="Aberration Correction"
              placeholder="Select aberration preference"
              options={aberrationOptions}
              labelClassName={FIELD_CLASSNAMES.LABEL}
              required
            />
          )}
        </div>

        <Label className="block text-foreground">{checkboxLabel}</Label>
        <div className="flex flex-col gap-2 mb-6">
          <Controller
            control={control}
            name={checkboxName}
            render={({ field }) => (
              <>
                {checkboxItems.map(({ id, name }) => {
                  const isChecked = field.value?.includes(id);

                  return (
                    <div key={id} className="flex items-center gap-2">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), id]
                            : (field.value || []).filter((val) => val !== id);
                          field.onChange(newValue);
                        }}
                        id={id}
                        disabled={isLoading}
                      />
                      <Label
                        htmlFor={id}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {name}
                      </Label>
                    </div>
                  );
                })}
              </>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={!canSubmit || isLoading}
            isLoading={isLoading}
          >
            {submitLabel}
          </Button>
          {isSaved && (
            <span className="text-sm text-green-500 mr-1">
              Saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditableForm;

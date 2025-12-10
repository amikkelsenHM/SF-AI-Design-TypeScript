'use client';

import EditableField from '@/components/v2/custom-shadcn/editable-field';
import { InfoBlock } from '@/components/v2/info-block';
import { AccountFormKeys } from 'models/enums/v2/account';
import {
  AberrationOptions,
  TdmFormats,
} from 'models/interfaces/v2/organisations';
import { Option } from 'models/types/common';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export type PreferencesFormValues = {
  preferredTdmFormat: TdmFormats;
  aberrationCorrectionPreference: AberrationOptions;
};

const FIELD_CLASSNAMES = {
  CONTAINER: 'gap-y-1',
  LABEL: 'text-xs text-white font-normal pb-2',
};

const DESCRIPTION_TEXT =
  'Default values set by your organisation. If you change these settings it will only impact data preferences for this account';

type PreferencesFormProps = {
  title?: string;
  isLoading?: boolean;
  initialValues: PreferencesFormValues;
  tdmOptions?: Option[];
  aberrationOptions?: Option[];
  onUpdate?: (p: { key: AccountFormKeys; value: string }) => Promise<void>;
  readOnly?: boolean;
};

export default function PreferencesForm({
  title = 'User Data Preferences',
  isLoading,
  initialValues,
  tdmOptions = [],
  aberrationOptions = [],
  onUpdate,
  readOnly,
}: PreferencesFormProps) {
  const form = useForm<PreferencesFormValues>({
    values: initialValues,
    mode: 'onChange',
    resetOptions: { keepDirtyValues: true },
  });

  const { handleSubmit } = form;

  const submitTdm = useMemo(
    () =>
      handleSubmit(async ({ preferredTdmFormat }) => {
        onUpdate &&
          (await onUpdate({
            key: AccountFormKeys.PreferredTdmFormat,
            value: preferredTdmFormat || '',
          }));
      }),
    [handleSubmit, onUpdate]
  );

  const submitAberration = useMemo(
    () =>
      handleSubmit(async ({ aberrationCorrectionPreference }) => {
        onUpdate &&
          (await onUpdate({
            key: AccountFormKeys.AberrationCorrectionPreference,
            value: aberrationCorrectionPreference || '',
          }));
      }),
    [handleSubmit, onUpdate]
  );

  return (
    <div className="w-2/3">
      <InfoBlock
        title={title}
        description={!readOnly ? DESCRIPTION_TEXT : ''}
        className={!readOnly ? 'mb-5' : ''}
      />

      <FormProvider {...form}>
        <div className="space-y-4">
          <EditableField<PreferencesFormValues>
            label="TDM format"
            name="preferredTdmFormat"
            labelClassName={FIELD_CLASSNAMES.LABEL}
            className={FIELD_CLASSNAMES.CONTAINER}
            editor="select"
            selectOptions={tdmOptions}
            isLoading={isLoading}
            onEditEnd={submitTdm}
            readOnly={readOnly}
          />

          <EditableField<PreferencesFormValues>
            label="Aberration Correction"
            name="aberrationCorrectionPreference"
            labelClassName={FIELD_CLASSNAMES.LABEL}
            className={FIELD_CLASSNAMES.CONTAINER}
            editor="select"
            selectOptions={aberrationOptions}
            isLoading={isLoading}
            onEditEnd={submitAberration}
            readOnly={readOnly}
          />
        </div>
      </FormProvider>
    </div>
  );
}

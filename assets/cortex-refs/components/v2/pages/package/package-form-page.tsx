'use client';

import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';
import BackButton from '@/components/v2/buttons/back-button';
import Header from '@/components/v2/header';
import Calendar from '@/components/v2/icons/calendar';
import { InfoBlock } from '@/components/v2/info-block';
import { ControlledDatePickerField } from '@/components/v2/inputs/controlled-date-picker';
import { ControlledSelectField } from '@/components/v2/select/controlled-select-field';
import { formatDateInputValue } from '@/utils/v2/dates';
import { Subscription } from 'models/interfaces/v2/subscriptions';
import { PickerDateRange } from 'models/types/common';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SETTINGS_COMMON_BREADCRUMBS } from '../settings/sub-pages/constants';

export interface SubscriptionFormData {
  limitType: string;
  subscriptionTier: string;
  organisation: string;
  startEndDates: PickerDateRange;
}

const COMMON_SELECT_RULES = {
  deps: 'startEndDates',
} as const;

const validateSubscriptionPeriod =
  (activeSubscriptions: Subscription[]) =>
  (
    value: PickerDateRange,
    { organisation, limitType }: SubscriptionFormData
  ) => {
    const start = value?.from;
    const end = value?.to;
    if (!start || !end) return true;

    const hasOverlappingSubscription = activeSubscriptions.some((sub) => {
      if (sub.organization.id !== organisation) return false;
      if (sub.tier.limitType !== limitType) return false;

      const subStart = new Date(sub.start);
      const subEnd = new Date(sub.end);

      return start <= subEnd && end >= subStart;
    });

    return hasOverlappingSubscription
      ? `There's already an active package of type ${limitType} for this organisation`
      : true;
  };

const labelMap: Record<string, string> = {
  Object: 'Object Monitoring',
  Time: 'Custom Tasking',
};

type SelectOption = { label: string; value: string };

interface SubscriptionFormPageProps {
  title: string;
  description: string;
  submitLabel: string;
  backTo: string;
  onSubmit: (values: SubscriptionFormData) => Promise<void>;
  tiers: { id: string; name: string; limitType: string }[];
  organisations: { id: string; name: string }[];
  activeSubscriptions: Subscription[];
  initialValues?: Partial<SubscriptionFormData>;
  shouldResetOnSubmit?: boolean;
  showCreatedMessage?: boolean;
  showEditSuccessMessage?: boolean;
}

export const SubscriptionFormPage = ({
  title,
  description,
  submitLabel,
  backTo,
  onSubmit,
  tiers,
  organisations,
  activeSubscriptions,
  initialValues,
  shouldResetOnSubmit = false,
  showCreatedMessage = false,
  showEditSuccessMessage = false,
}: SubscriptionFormPageProps) => {
  const [created, setCreated] = useState(false);
  const [edited, setEdited] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { isValid },
  } = useForm<SubscriptionFormData>({
    defaultValues: {
      limitType: '',
      subscriptionTier: '',
      organisation: '',
      startEndDates: undefined,
      ...initialValues,
    },
    mode: 'onChange',
  });

  const selectedLimitType = watch('limitType');

  const subscriptionTypeOptions: SelectOption[] = useMemo(() => {
    const uniqueTypes = Array.from(new Set(tiers.map((t) => t.limitType)));
    return uniqueTypes.map((type) => ({
      label: labelMap[type] ?? type,
      value: type,
    }));
  }, [tiers]);

  const subscriptionTierOptions: SelectOption[] = useMemo(() => {
    return tiers
      .filter((t) => t.limitType === selectedLimitType)
      .map(({ name, id }) => ({
        label: name,
        value: id,
      }));
  }, [tiers, selectedLimitType]);

  const organisationOptions: SelectOption[] = useMemo(
    () =>
      organisations.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [organisations]
  );

  const handleFormSubmit = async (data: SubscriptionFormData) => {
    await onSubmit(data);

    if (showCreatedMessage) setCreated(true);
    if (showEditSuccessMessage) setEdited(true);

    if (shouldResetOnSubmit) reset();
  };

  const disableSaveButton = !isValid;

  return (
    <>
      <Header
        title={title}
        description={description}
        standardActions={{ logout: true }}
        customBreadcrumbs={SETTINGS_COMMON_BREADCRUMBS}
      />

      <div className="bg-foreground-subtle p-6">
        <InfoBlock
          title={title}
          description={description}
          rightSlot={
            <BackButton label="Back to Packages" fallbackTo={backTo} />
          }
          showSeparator
        />

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6 mt-6 flex flex-col sm:w-full lg:w-1/2 xl:w-1/3 max-w-[410px]"
        >
          <div className="flex flex-col gap-6">
            <ControlledSelectField
              name="limitType"
              control={control}
              label="Package Type"
              placeholder="Select Package Type"
              options={subscriptionTypeOptions}
              required
              rules={{
                ...COMMON_SELECT_RULES,
                onChange: () => resetField('subscriptionTier'),
              }}
              disabled={!!initialValues}
            />

            <ControlledSelectField
              name="subscriptionTier"
              control={control}
              label="Package Tier"
              placeholder={
                selectedLimitType ? 'Select Package Tier' : 'Select Type first'
              }
              options={subscriptionTierOptions}
              required
              rules={COMMON_SELECT_RULES}
              fluid
              disabled={!selectedLimitType || !!initialValues}
            />

            <ControlledSelectField
              name="organisation"
              control={control}
              label="Organisation"
              placeholder="Select Organisation"
              options={organisationOptions}
              required
              rules={COMMON_SELECT_RULES}
              disabled={!!initialValues}
            />

            <ControlledDatePickerField
              mode="range"
              control={control}
              name="startEndDates"
              label="Package duration"
              labelClassName="typography-body-sm text-foreground"
              lockStart
              rules={{
                validate: validateSubscriptionPeriod(activeSubscriptions),
              }}
              renderTrigger={({ value }, { error }) => (
                <Input
                  id="startEndDates"
                  value={formatDateInputValue(value, false)}
                  placeholder="Start Date – End Date"
                  iconPosition="right"
                  state={error ? 'error' : 'default'}
                  icon={<Calendar />}
                />
              )}
              required
            />
          </div>

          <div className="mt-2 flex items-center gap-3">
            <Button type="submit" disabled={disableSaveButton}>
              {submitLabel}
            </Button>

            {showCreatedMessage && created && (
              <p className="text-sm">
                <span className="text-green-500 mr-1">Package created</span>
                <button
                  type="button"
                  onClick={() => {
                    setCreated(false);
                    reset();
                  }}
                  className="underline underline-offset-2 transition text-white cursor-pointer"
                >
                  Create another package
                </button>
              </p>
            )}

            {showEditSuccessMessage && edited && (
              <p className="text-sm text-green-500">Package updated</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

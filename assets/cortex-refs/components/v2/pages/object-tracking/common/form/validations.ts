import { tleFormatError } from 'helpers/tle-validations';
import { ERROR_MESSAGES } from 'helpers/v2/validations/error-messages';
import { yup } from 'helpers/v2/validations/yup-extensions';
import { Subscription } from 'models/interfaces/v2/subscriptions';
import { ObjectTrackingTargetMode } from '../../enums';
import { NewObjectTrackingFormData } from '../../new/types';

const VALIDATION_LIMITS = {
  TLE: {
    MIN: 2,
    MAX: 255,
    LINES: 2,
  },
};

const FIELD_NAMES = {
  ORGANISATION: 'Organisation',
  SUBSCRIPTION: 'Package',
  TRACK_METHOD_MODE: 'Track method mode',
  TLE: 'TLE',
  JSON_PREVIEW: 'JSON preview',
  FILE_NAME: 'File name',
  START_DATE: 'Start date',
  END_DATE: 'End date',
};

export const isWithinSubscriptionPeriod = (
  { from, to }: NewObjectTrackingFormData['startEndDates'],
  subscription: Subscription | null
) => {
  if (!subscription || !subscription?.start || !subscription?.end) return true;

  const subStart = new Date(subscription.start);
  const subEnd = new Date(subscription.end);

  return from >= subStart && to <= subEnd;
};

export const startEndDateSchema = yup
  .object({
    from: yup.date().required(ERROR_MESSAGES.required(FIELD_NAMES.START_DATE)),
    to: yup
      .date()
      .required(ERROR_MESSAGES.required(FIELD_NAMES.END_DATE))
      .min(
        yup.ref('from'),
        ERROR_MESSAGES.before(FIELD_NAMES.END_DATE, FIELD_NAMES.START_DATE)
      ),
  })
  .when(['subscription'], ([subscription], schema) => {
    if (!subscription || !subscription?.start || !subscription?.end)
      return schema;

    return schema.test(
      'within-subscription-period',
      'Task duration must be within your package period',
      (value) => isWithinSubscriptionPeriod(value, subscription)
    );
  });

export const createTaskSchema = yup.object({
  organizationID: yup
    .string()
    .required(ERROR_MESSAGES.required(FIELD_NAMES.ORGANISATION)),
  subscriptionId: yup
    .string()
    .required(ERROR_MESSAGES.required(FIELD_NAMES.SUBSCRIPTION))
    .when('$isPackageTaskEnabled', ([isPackageTaskEnabled], schema) =>
      isPackageTaskEnabled ? schema : yup.string().optional()
    ),

  trackMethod: yup
    .object({
      mode: yup
        .mixed<ObjectTrackingTargetMode>()
        .oneOf(Object.values(ObjectTrackingTargetMode))
        .required(ERROR_MESSAGES.required(FIELD_NAMES.TRACK_METHOD_MODE)),
      value: yup
        .mixed<number | string>()
        .test(
          'is-valid',
          ERROR_MESSAGES.required(),
          (value) => value !== undefined && value !== null && value !== ''
        )
        .when('mode', ([mode], schema) => {
          if (mode !== ObjectTrackingTargetMode.TLE) return schema;

          return yup
            .string()
            .requiredLength(
              FIELD_NAMES.TLE,
              VALIDATION_LIMITS.TLE.MIN,
              VALIDATION_LIMITS.TLE.MAX
            )
            .exactLines(FIELD_NAMES.TLE, VALIDATION_LIMITS.TLE.LINES)
            .test('tle-format', (value, ctx) => {
              const error = tleFormatError(value);

              return !error || ctx.createError({ message: error });
            });
        }),
      meta: yup
        .object({
          jsonPreview: yup
            .string()
            .required(ERROR_MESSAGES.required(FIELD_NAMES.JSON_PREVIEW)),
          fileName: yup
            .string()
            .required(ERROR_MESSAGES.required(FIELD_NAMES.FILE_NAME)),
        })
        .optional()
        .default(undefined),
    })
    .when(
      ['orbitalRegime', '$hasActiveTasks'],
      ([orbitalRegime, hasActiveTasks], schema) => {
        if (!orbitalRegime)
          return schema.test(
            'has-valid-regime',
            'We could not find a valid target',
            () => false
          );

        if (!hasActiveTasks) return schema;

        return schema.test(
          'task-exist',
          'An active observation task already exists for this object under the package',
          () => false
        );
      }
    ),
  startEndDates: startEndDateSchema,

  firstObservationNotification: yup.boolean().required(),
});

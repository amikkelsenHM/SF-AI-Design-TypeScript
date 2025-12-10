import { ERROR_MESSAGES } from 'helpers/v2/validations/error-messages';
import { yup } from 'helpers/v2/validations/yup-extensions';
import {
  createTaskSchema,
  startEndDateSchema,
} from '../../common/form/validations';
import {
  ObjectTrackingObservationMode,
  ObjectTrackingOrbitalRegime,
} from '../../enums';
import { NewObjectTrackingFormData } from '../types';

const transformTrackLength = (value: unknown) =>
  value == null || Number.isNaN(value) ? undefined : value;

const MS_TO_MIN = 1000 * 60;

const VALIDATION_LIMITS = {
  NAME: {
    MIN: 2,
    MAX: 255,
  },
  NETWORK_IDS: {
    MIN: 1,
  },
  /**
   * Track length limits in seconds
   */
  TRACK_LENGTH: {
    FAINT_DETECTION: {
      MIN: 45,
      MAX: 600,
      ADDITIONAL_MESSAGE: 'if using faint object detection',
    },
    STARE_MODE: {
      MIN: 16,
      MAX: 120,
      ADDITIONAL_MESSAGE: 'if using stare mode',
    },
    DEFAULT: {
      MIN: 16,
      MAX: 600,
      ADDITIONAL_MESSAGE: '',
    },
  },
  /**
   * Min track separation limits in hours
   */
  MIN_TRACK_SEPARATION: {
    NON_LEO: {
      MIN: 1,
      MAX: 168,
      ADDITIONAL_MESSAGE: 'for non-LEO targets',
    },
  },
  /**
   * Track duration limits in minutes
   */
  TRACK_DURATION: {
    STARE: {
      MIN: 10,
      MAX: 300,
    },
  },
};

const FIELD_NAMES = {
  NAME: 'Name',
  NETWORK: 'Network',
  ORBITAL_REGIME: 'Orbital regime',
  OBSERVATION_MODE: 'Mode',
  TRACK_LENGTH: 'Track length',
  MIN_TRACK_SEPARATION: 'Minimum track separation',
  DURATION: 'Duration',
  IS_DATA_EXCLUSIVE: 'Exclusive data',
  DELIVER_ALL_IN_FOV: 'All in view measurements',
  FAINT_OBJECT_DETECTION: 'Faint detection',
};

const isLeoRegime = (regime: ObjectTrackingOrbitalRegime) =>
  regime === ObjectTrackingOrbitalRegime.LEO;

const isStareMode = (mode: ObjectTrackingObservationMode) =>
  mode === ObjectTrackingObservationMode.Stare;

const createModeError = (
  mode: ObjectTrackingObservationMode,
  message: string
) => `For ${mode}, ${message}`;

const MODE_COMPATIBLE_REGIMES_MAP: Partial<
  Record<ObjectTrackingObservationMode, ObjectTrackingOrbitalRegime[]>
> = {
  [ObjectTrackingObservationMode.Stare]: [
    ObjectTrackingOrbitalRegime.GEO,
    ObjectTrackingOrbitalRegime.HEO,
    ObjectTrackingOrbitalRegime.GTO,
  ],
  [ObjectTrackingObservationMode.Search]: [
    ObjectTrackingOrbitalRegime.MEO,
    ObjectTrackingOrbitalRegime.GEO,
    ObjectTrackingOrbitalRegime.HEO,
    ObjectTrackingOrbitalRegime.GTO,
  ],
};

const regimeCompatibilityError = (
  orbitalRegime: ObjectTrackingOrbitalRegime,
  mode: ObjectTrackingObservationMode
) => {
  const compatibleRegimes = MODE_COMPATIBLE_REGIMES_MAP[mode];

  if (!compatibleRegimes) return null;

  if (compatibleRegimes.includes(orbitalRegime)) return null;

  return createModeError(
    mode,
    `the selected target must be any of ${compatibleRegimes.toString()}, the current target is ${orbitalRegime}`
  );
};

export const stareModeDurationError = (
  mode: ObjectTrackingObservationMode,
  value: NewObjectTrackingFormData['startEndDates']
) => {
  if (!isStareMode(mode) || !value.from || !value.to) return null;

  const durationMinutes = Math.floor(
    (value.to.getTime() - value.from.getTime()) / MS_TO_MIN
  );

  const isValid =
    durationMinutes >= VALIDATION_LIMITS.TRACK_DURATION.STARE.MIN &&
    durationMinutes <= VALIDATION_LIMITS.TRACK_DURATION.STARE.MAX;

  if (isValid) return null;

  return createModeError(
    ObjectTrackingObservationMode.Stare,
    `${FIELD_NAMES.DURATION} must be between ${
      VALIDATION_LIMITS.TRACK_DURATION.STARE.MIN
    } minutes and ${VALIDATION_LIMITS.TRACK_DURATION.STARE.MAX / 60} hours`
  );
};

export const objectTrackingSchema = createTaskSchema.shape({
  name: yup
    .string()
    .requiredLength(
      FIELD_NAMES.NAME,
      VALIDATION_LIMITS.NAME.MIN,
      VALIDATION_LIMITS.NAME.MAX
    ),
  networkIds: yup
    .array()
    .of(yup.string().required())
    .min(
      VALIDATION_LIMITS.NETWORK_IDS.MIN,
      ERROR_MESSAGES.minItems(
        FIELD_NAMES.NETWORK,
        VALIDATION_LIMITS.NETWORK_IDS.MIN
      )
    )
    .required(),

  observationMode: yup
    .mixed<ObjectTrackingObservationMode>()
    .oneOf(Object.values(ObjectTrackingObservationMode))
    .required(ERROR_MESSAGES.required(FIELD_NAMES.OBSERVATION_MODE))
    .when('orbitalRegime', ([orbitalRegime], schema) => {
      if (!orbitalRegime) return schema;

      return schema.test('mode-compatible-regime', (value, ctx) => {
        const error = regimeCompatibilityError(orbitalRegime, value);

        return !error || ctx.createError({ message: error });
      });
    }),

  trackLength: yup
    .number()
    .when(
      ['faintObjectDetection', 'observationMode', 'orbitalRegime', '$isAdmin'],
      ([faintObjectDetection, observationMode, orbitalRegime, isAdmin]) => {
        const isLeo = isLeoRegime(orbitalRegime);
        if (isLeo) {
          return isAdmin
            ? yup
                .number()
                .transform(transformTrackLength)
                .min(
                  0,
                  `${FIELD_NAMES.TRACK_LENGTH} cannot be a negative number`
                )
            : yup
                .mixed()
                .transform(transformTrackLength)
                .test(
                  'leo-not-supported',
                  `${FIELD_NAMES.TRACK_LENGTH} is not supported in LEO regime`,
                  (value) => value === undefined
                );
        }

        const limits = faintObjectDetection
          ? VALIDATION_LIMITS.TRACK_LENGTH.FAINT_DETECTION
          : observationMode === ObjectTrackingObservationMode.Stare
          ? VALIDATION_LIMITS.TRACK_LENGTH.STARE_MODE
          : VALIDATION_LIMITS.TRACK_LENGTH.DEFAULT;

        return yup
          .number()
          .transform(transformTrackLength)
          .requiredRange(
            FIELD_NAMES.TRACK_LENGTH,
            limits.MIN,
            limits.MAX,
            limits.ADDITIONAL_MESSAGE
          );
      }
    ),
  minTrackSeparation: yup
    .number()
    .when(
      ['orbitalRegime', 'observationMode', '$isAdmin'],
      ([orbitalRegime, observationMode, isAdmin]) => {
        if (
          (isLeoRegime(orbitalRegime) && !isAdmin) ||
          isStareMode(observationMode)
        )
          return yup.number().transform(() => undefined);

        return yup
          .number()
          .requiredRange(
            FIELD_NAMES.MIN_TRACK_SEPARATION,
            VALIDATION_LIMITS.MIN_TRACK_SEPARATION.NON_LEO.MIN,
            VALIDATION_LIMITS.MIN_TRACK_SEPARATION.NON_LEO.MAX,
            VALIDATION_LIMITS.MIN_TRACK_SEPARATION.NON_LEO.ADDITIONAL_MESSAGE
          );
      }
    ),

  startEndDates: startEndDateSchema.test(
    'stare-mode-duration',
    (value, { parent, createError }) => {
      const { observationMode } = parent;
      const error = stareModeDurationError(observationMode, value);

      return !error || createError({ message: error });
    }
  ),

  isDataExclusive: yup.boolean().required(),
  deliverAllInFOV: yup.boolean().required(),
  faintObjectDetection: yup.boolean().required(),
  isSearchMode: yup
    .boolean()
    .when('orbitalRegime', ([orbitalRegime], schema) => {
      if (!orbitalRegime) return schema;

      return schema.test('search-compatible-regime', (value, ctx) => {
        const error = value
          ? regimeCompatibilityError(
              orbitalRegime,
              ObjectTrackingObservationMode.Search
            )
          : null;

        return !error || ctx.createError({ message: error });
      });
    }),
});

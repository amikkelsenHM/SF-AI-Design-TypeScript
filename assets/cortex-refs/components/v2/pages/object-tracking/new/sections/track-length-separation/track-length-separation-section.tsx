import { ControlledInputField } from '@/components/v2/inputs/controlled-input-field';
import { NUMBER_TRANSFORMER } from '@/components/v2/inputs/transformers/common-transformers';
import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  ObjectTrackingObservationMode,
  ObjectTrackingOrbitalRegime,
} from '../../../enums';
import { useOrbitalRegime } from '../../hooks/useOrbitalRegime';
import { NewObjectTrackingFormData } from '../../types';

const COMMON_INPUT_PROPS = {
  placeholder: 'Input a time',
  inputSize: 'l',
  type: 'number',
  labelClassName: 'typography-body-sm text-foreground',
  transform: NUMBER_TRANSFORMER,
} as const;

const COLS_COUNT = 2;

const DEFAULT_VALUES = { TRACK_LENGTH: 16, MIN_TRACK_SEPARATION: 3 };

const getCommonProps = (isAutomatic: boolean) =>
  isAutomatic
    ? {
        ...COMMON_INPUT_PROPS,
        placeholder: 'Automatic',
        readOnly: true,
      }
    : COMMON_INPUT_PROPS;

const TrackLengthSeparationSection = () => {
  const { control } = useFormContext<NewObjectTrackingFormData>();
  const { isAdmin } = control._options.context;
  const orbitalRegime = useOrbitalRegime();
  const observationMode = useWatch({ control, name: 'observationMode' });
  const notAdjustableFields = useWatch({
    control,
    name: 'meta.notAdjustableFields',
  });
  const isLeo = orbitalRegime === ObjectTrackingOrbitalRegime.LEO;
  const isStareMode = observationMode === ObjectTrackingObservationMode.Stare;
  const isTrackLengthAutomatic = isLeo && !isAdmin;
  const isMinTrackSeparationAutomatic = isTrackLengthAutomatic || isStareMode;
  const shouldHideMinTrackSeparation = (isLeo && !isAdmin) || isStareMode;

  if (!orbitalRegime) return null;

  return (
    <FormSection title="Track Length & Separation" gridCols={COLS_COUNT}>
      <ControlledInputField
        control={control}
        name="trackLength"
        label="Track length (sec)"
        required
        defaultValue={DEFAULT_VALUES.TRACK_LENGTH}
        readOnly={notAdjustableFields?.includes('trackLength')}
        {...getCommonProps(isTrackLengthAutomatic)}
      />

      {!shouldHideMinTrackSeparation && (
        <ControlledInputField
          control={control}
          name="minTrackSeparation"
          label="Minimum track separation (hours)"
          defaultValue={DEFAULT_VALUES.MIN_TRACK_SEPARATION}
          readOnly={notAdjustableFields?.includes('minTrackSeparation')}
          {...getCommonProps(isMinTrackSeparationAutomatic)}
        />
      )}
    </FormSection>
  );
};

export default TrackLengthSeparationSection;

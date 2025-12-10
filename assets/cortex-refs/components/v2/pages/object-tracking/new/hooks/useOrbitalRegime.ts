import { useObjectDetails } from '@/hooks/queries/campaignQuery';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  ObjectTrackingOrbitalRegime,
  ObjectTrackingTargetMode,
} from '../../enums';
import { getNoradIdFromTrackMethod } from '../form-preview/sections/utils';
import { NewObjectTrackingFormData } from '../types';

const DEFAULT_DELAY = 300;
const VALID_REGIMES = Object.values(ObjectTrackingOrbitalRegime);

const LABELS: Record<ObjectTrackingTargetMode, string> = {
  [ObjectTrackingTargetMode.NoradID]: 'Norad ID',
  [ObjectTrackingTargetMode.TLE]: 'TLE',
  [ObjectTrackingTargetMode.Coordinates]: 'Coordinates',
};

const isValidRegime = (
  orbitalRegime: string | undefined | null
): orbitalRegime is ObjectTrackingOrbitalRegime =>
  orbitalRegime != null &&
  VALID_REGIMES.includes(orbitalRegime as ObjectTrackingOrbitalRegime);

export const useOrbitalRegime = () => {
  const { control, setValue, trigger } =
    useFormContext<NewObjectTrackingFormData>();
  const isAdmin = control._options.context?.isAdmin ?? false;

  const trackMethod = useWatch({ control, name: 'trackMethod' });
  const [noradId, setNoradId] = useState('');
  const { data } = useObjectDetails(noradId);

  const orbitalRegime = useMemo(() => {
    const regime = data?.payload?.target?.orbitalRegime;

    if (!isValidRegime(regime)) return null;

    return regime;
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const noradId = getNoradIdFromTrackMethod(trackMethod);
      setNoradId(noradId);
    }, DEFAULT_DELAY);

    return () => clearTimeout(timer);
  }, [trackMethod]);

  useEffect(() => {
    setValue('orbitalRegime', orbitalRegime);
    if (orbitalRegime === ObjectTrackingOrbitalRegime.LEO && !isAdmin) {
      setValue('trackLength', null, { shouldValidate: true });
      setValue('minTrackSeparation', null, { shouldValidate: true });
    }

    if (trackMethod?.value) trigger('trackMethod');
  }, [orbitalRegime, trackMethod?.value, isAdmin]);

  return orbitalRegime;
};

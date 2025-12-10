'use client';

import { useNavigation } from 'hooks/useNavigation';
import FormActions from '../../common/form/form-actions';
import { useOrbitalRegime } from '../../new/hooks/useOrbitalRegime';
import NetworkOrganisationSection from '../../new/sections/network-organisation/network-organisation-section';
import NotificationsSection from '../../new/sections/notifications/notifications-section';
import PointTrackMethodSection, {
  MethodTabNames,
} from '../../new/sections/point-track-method/point-track-method-section';

const METHOD_TAB_NAMES = [MethodTabNames.OBJECT];

interface FormSectionsProps {
  onShowPreview: () => void;
}

const FormSections = ({ onShowPreview }: FormSectionsProps) => {
  const { navigate } = useNavigation({ linkTo: '/object-tracking' });
  useOrbitalRegime();

  return (
    <>
      <PointTrackMethodSection
        title="Method"
        visibleTabNames={METHOD_TAB_NAMES}
      />
      <NetworkOrganisationSection />
      <NotificationsSection />
      <FormActions
        submitButtonType="button"
        onCancel={navigate}
        onSubmit={onShowPreview}
      />
    </>
  );
};

export default FormSections;

'use client';

import { useNavigation } from 'hooks/useNavigation';
import FormActions from '../../common/form/form-actions';
import AdditionalServicesSection from '../sections/additional-services/additional-services-section';
import CampaignDurationSection from '../sections/campaign-duration/campaign-duration-section';
import NameSection from '../sections/name/name-section';
import NetworkOrganisationSection from '../sections/network-organisation/network-organisation-section';
import NotificationsSection from '../sections/notifications/notifications-section';
import ObservationModeSection from '../sections/observation-mode/observation-mode-section';
import PointTrackMethodSection from '../sections/point-track-method/point-track-method-section';
import TrackLengthSeparationSection from '../sections/track-length-separation/track-length-separation-section';

interface FormSectionsProps {
  onShowPreview: () => void;
}

const FormSections = ({ onShowPreview }: FormSectionsProps) => {
  const { navigate } = useNavigation({ linkTo: '/object-tracking' });

  return (
    <>
      <NameSection />
      <NetworkOrganisationSection />
      <PointTrackMethodSection title="Point & Track Method" />
      <ObservationModeSection />
      <TrackLengthSeparationSection />
      <CampaignDurationSection />
      <AdditionalServicesSection />
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

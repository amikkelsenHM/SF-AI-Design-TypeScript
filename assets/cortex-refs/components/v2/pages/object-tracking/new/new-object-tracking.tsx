import Header from '@/components/v2/header';
import { HEADER_NEW_OBJECT_TRACKING_TITLE } from '../constants/header';
import NewObjectTrackingForm from './form/new-object-tracking-form';

const NewObjectTracking = () => {
  return (
    <>
      <Header
        title={HEADER_NEW_OBJECT_TRACKING_TITLE}
        standardActions={{ back: true }}
      />

      <NewObjectTrackingForm />
    </>
  );
};

export default NewObjectTracking;

import Header from '@/components/v2/header';
import { HEADER_NEW_SUBSCRIPTION_TASK_TITLE } from '../constants/header';
import SubscriptionTaskForm from './form/subscription-task-form';

const NewSubscriptionTask = () => {
  return (
    <>
      <Header
        title={HEADER_NEW_SUBSCRIPTION_TASK_TITLE}
        standardActions={{ back: true }}
      />

      <SubscriptionTaskForm />
    </>
  );
};

export default NewSubscriptionTask;

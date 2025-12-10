import { ButtonProps } from '@/components/components/ui/button';
import { LinkButton } from '@/components/components/ui/link-button';
import SfTooltip from '@/components/v2/tooltip/sf-tooltip';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { ClientFeatureFlags } from 'lib/config/feature-flag-config';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { CREATE_TASK_ROLE_PERMISSION_OPTIONS } from 'providers/configs/permissions-config';
import { usePermission } from 'providers/permission-provider';
import { ObjectTrackingType } from '../../enums';

const TYPE_BASED_PROPS = {
  [SubscriptionType.Object]: {
    href: '/object-tracking/package',
    type: ObjectTrackingType.SUBSCRIPTION,
  },
  [SubscriptionType.Time]: {
    href: '/object-tracking/new',
    type: ObjectTrackingType.CUSTOM,
  },
};

interface CreateTaskButtonProps extends Omit<ButtonProps, 'type' | 'disabled'> {
  subscriptionType: SubscriptionType;
}

export default function CreateTaskButton({
  subscriptionType,
  ...props
}: CreateTaskButtonProps) {
  const { has } = usePermission();

  const isVisible = has(CREATE_TASK_ROLE_PERMISSION_OPTIONS);
  const isPackageTaskEnabled = useFeatureFlag(
    ClientFeatureFlags.PACKAGE_TASK,
    true
  );

  const disabled = !has({ subscriptionType }) && isPackageTaskEnabled;

  const { href, type } = TYPE_BASED_PROPS[subscriptionType];

  if (
    !isVisible ||
    (subscriptionType === SubscriptionType.Object && !isPackageTaskEnabled)
  )
    return null;

  const content = (
    <LinkButton href={href} disabled={disabled} {...props}>
      {type} Task
    </LinkButton>
  );

  if (!disabled) return content;

  return (
    <SfTooltip
      text={`You don’t have active ${type} package. Activate a package to create a ${type} task.`}
      trigger={<div>{content}</div>}
    />
  );
}

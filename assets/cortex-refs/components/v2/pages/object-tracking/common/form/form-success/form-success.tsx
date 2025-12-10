'use client';

import { LinkButton } from '@/components/components/ui/link-button';

const FormSuccess = () => {
  return (
    <div className="flex gap-3">
      <LinkButton variant="secondary" href="/object-tracking/manage">
        Manage List
      </LinkButton>
      <LinkButton variant="primary" href="/object-tracking">
        View Objects
      </LinkButton>
    </div>
  );
};

export default FormSuccess;

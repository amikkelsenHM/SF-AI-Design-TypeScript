import { useAuthSession } from 'hooks/useAuthSession';
import jwtDecode from 'jwt-decode';
import { IUserInfo } from 'models/interfaces/v2/auth';
import { OrganisationRole, SpacefluxRole } from 'models/types/v2/auth';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';
import {
  getOrgRoles,
  hasAccessToAllOrgs,
  hasAccessToAnyOrg,
  isAdmin,
} from 'utils/v2/auth/permissions';

interface PermissionGuardProps {
  children: ReactNode;
  requiredSpacefluxRoles?: SpacefluxRole[];
  requiredOrgRoles?: OrganisationRole[];
  orgIds?: string | string[];
  requireAccessToAll?: boolean;
  fallback?: ReactNode;
}

const PermissionGuard: FC<PermissionGuardProps> = ({
  children,
  requiredSpacefluxRoles = [],
  requiredOrgRoles = [],
  orgIds,
  requireAccessToAll = false,
  fallback,
}) => {
  const { data: session, status } = useAuthSession();
  const router = useRouter();

  const decisionFallback =
    typeof fallback === 'object' ? <>{fallback}</> : null;

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/signin');
    return null;
  }

  if (!session) {
    return decisionFallback;
  }

  if (isAdmin(session)) {
    return <>{children}</>;
  }

  let userInfo: IUserInfo | null = null;
  try {
    userInfo = jwtDecode<IUserInfo>(session.token);
  } catch (error) {
    return decisionFallback;
  }

  const hasSpacefluxRole =
    requiredSpacefluxRoles.length === 0 ||
    requiredSpacefluxRoles.includes(userInfo?.spaceflux_role);

  if (!hasSpacefluxRole) {
    return decisionFallback;
  }

  if (requiredOrgRoles.length > 0) {
    const orgIdsArray = orgIds
      ? Array.isArray(orgIds)
        ? orgIds
        : [orgIds]
      : [];

    if (orgIdsArray.length > 0) {
      const hasAccess = requireAccessToAll
        ? hasAccessToAllOrgs(session, orgIdsArray, requiredOrgRoles)
        : hasAccessToAnyOrg(session, orgIdsArray, requiredOrgRoles);

      if (!hasAccess) {
        return decisionFallback;
      }
    } else {
      const userOrgRoles = getOrgRoles(session);
      const hasAnyRequiredRole = Object.values(userOrgRoles).some((userRole) =>
        requiredOrgRoles.includes(userRole)
      );

      if (!hasAnyRequiredRole) {
        return decisionFallback;
      }
    }
  }

  return <>{children}</>;
};

export default PermissionGuard;

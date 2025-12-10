import { getRawOrganisationUsers } from '@/api/account';
import { normalizeRoleToKey } from '@/utils/v2/roles';
import { IMembership } from 'models/interfaces/IMembership';
import { IUserData } from 'models/interfaces/v2/auth';
import { RoleKey } from 'models/interfaces/v2/users';
import { UserRoleFormValues } from './user-role-action-form';

export const DEFAULT_MANAGER_ROLE_NAME = 'Manager';

export const buildManagerRoleKey = (
  managerRoleName: string = DEFAULT_MANAGER_ROLE_NAME
): RoleKey => normalizeRoleToKey(managerRoleName) as RoleKey;

export const findOrgWhereUserIsLastManager = async (
  memberships: IMembership[],
  values: UserRoleFormValues,
  managerRoleKey: RoleKey
): Promise<{ orgId: string; orgName: string } | null> => {
  const affectedOrgs =
    memberships
      ?.filter(({ role }) => normalizeRoleToKey(role?.name) === managerRoleKey)
      .map(({ organization }) => {
        if (!organization?.id) return null;

        const next = values.organisations.find(
          (o) => o.organizationID === organization.id
        );

        if (!next) {
          return {
            orgId: organization.id,
            orgName: organization.name,
          };
        }

        const stillManager = next.role === managerRoleKey;
        if (stillManager) return null;

        return {
          orgId: organization.id,
          orgName: organization.name,
        };
      })
      .filter(Boolean) ?? [];

  for (const org of affectedOrgs as { orgId: string; orgName: string }[]) {
    try {
      const orgUsers = await getRawOrganisationUsers(org.orgId);

      const managers =
        orgUsers?.filter((u: IUserData) =>
          u.memberships?.some(
            (m) =>
              m.organizationId === org.orgId &&
              normalizeRoleToKey(m.role) === managerRoleKey
          )
        ) ?? [];

      if (managers.length <= 1) {
        return org;
      }
    } catch (error) {
      return null;
    }
  }

  return null;
};

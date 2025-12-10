import { OrganizationRole, SpacefluxRole } from 'models/enums/v2/roles';
import { INavigationItem } from 'models/interfaces/v2/navigation';
import { DashboardIcon, SensorIcon, TargetIcon } from '../../icons';

export const NAVIGATION: INavigationItem[] = [
  {
    name: 'Dashboard',
    icon: DashboardIcon,
    path: '/',
    requiredSpacefluxRoles: [SpacefluxRole.Admin, SpacefluxRole.Client],
    requiredOrgRoles: [
      OrganizationRole.Manager,
      OrganizationRole.Member,
      OrganizationRole._DataViewer,
    ],
    exact: true,
  },
  {
    name: 'Object Tracking',
    icon: TargetIcon,
    path: '/object-tracking',
    requiredSpacefluxRoles: [SpacefluxRole.Admin, SpacefluxRole.Client],
    requiredOrgRoles: [
      OrganizationRole.Manager,
      OrganizationRole.Member,
      OrganizationRole._DataViewer,
    ],
    // TODO: OUT_OF_SCOPE
    // children: [
    //   // TODO: clarify what should be the path for Observations Grid item
    //   { name: 'Observations Grid', path: '/object-tracking', exact: true },
    //   { name: 'Manage Tasks', path: '/object-tracking/manage', exact: true },
    // ],
  },
  {
    name: 'Sensor Network',
    icon: SensorIcon,
    path: '/sensors',
    requiredSpacefluxRoles: [SpacefluxRole.Admin, SpacefluxRole.Client],
    requiredOrgRoles: [
      OrganizationRole.Manager,
      OrganizationRole.Member,
      OrganizationRole._DataViewer,
    ],
  },
];

export enum UserRoleDialogType {
  None = 'NONE',
  Edit = 'EDIT',
  Delete = 'DELETE',
  Lockout = 'LOCKOUT',
}

export type UserRoleDialogVariant = 'default' | 'warning';

export interface UserRoleDialogButtonConfig {
  primaryButtonText: string;
  secondaryButtonText: string;
  variant: UserRoleDialogVariant;
}

export const USER_ROLE_DIALOG_BUTTON_CONFIG: Record<
  UserRoleDialogType,
  UserRoleDialogButtonConfig
> = {
  [UserRoleDialogType.None]: {
    primaryButtonText: '',
    secondaryButtonText: '',
    variant: 'default',
  },
  [UserRoleDialogType.Edit]: {
    primaryButtonText: 'Cancel',
    secondaryButtonText: 'Approve',
    variant: 'default',
  },
  [UserRoleDialogType.Delete]: {
    primaryButtonText: 'Cancel',
    secondaryButtonText: 'Remove',
    variant: 'warning',
  },
  [UserRoleDialogType.Lockout]: {
    primaryButtonText: 'No - Cancel',
    secondaryButtonText: 'Yes - Approve',
    variant: 'warning',
  },
};

export const USER_ROLE_DIALOG_TITLES: Record<UserRoleDialogType, string> = {
  [UserRoleDialogType.None]: '',
  [UserRoleDialogType.Edit]: 'Edit Role',
  [UserRoleDialogType.Delete]: 'Remove Role',
  [UserRoleDialogType.Lockout]: 'Lockout Warning',
};

export const USER_ROLE_FALLBACK_USER_NAME = 'This user';

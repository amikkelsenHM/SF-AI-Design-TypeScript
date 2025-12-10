import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface ActionConfig {
  key: string;
  label: string;
  variant: 'primary' | 'secondary';
  actionType: 'back' | 'internal' | 'external';
  href?: string;
  show?: boolean;
}

export interface Action extends ActionConfig {
  onClick: () => void;
}

export interface ErrorConfig {
  title: string;
  subtitle?: string;
  message: string;
  helpText: string;
  actions: ActionConfig[];
  hideBack?: boolean;
}

export interface ErrorConfigs {
  [key: string]: ErrorConfig;
}

export interface ErrorConfigParams {
  router: AppRouterInstance;
  customActions?: ActionConfig[];
}

const commonActionConfig: ActionConfig[] = [
  {
    key: 'home',
    label: 'Home',
    variant: 'primary',
    actionType: 'internal',
    href: '/',
  },
  {
    key: 'back',
    label: 'Back To Previous Page',
    variant: 'secondary',
    actionType: 'back',
  },
  {
    key: 'support',
    label: 'Customer Support',
    variant: 'secondary',
    actionType: 'external',
    // TODO: Add support link
    href: '',
  },
];

const navigate = {
  back: (router: AppRouterInstance) => router.back(),
  external: (href: string) => window.open(href, '_blank'),
  internal: (href: string, router: AppRouterInstance) => router.push(href),
};

export const createActions = (
  actionConfigs: ActionConfig[],
  router: AppRouterInstance
): Action[] => {
  return actionConfigs.map((config) => ({
    ...config,
    onClick: () => {
      const { href, actionType } = config;

      const actions = {
        back: () => navigate.back(router),
        external: () => navigate.external(href!),
        internal: () => navigate.internal(href!, router),
      };

      actions[actionType]();
    },
  }));
};

export const getErrorConfig = (
  errorType: string,
  params: ErrorConfigParams
): ErrorConfig & { actions: Action[] } => {
  const config = errorConfigs[errorType] || errorConfigs.default;
  const actions = params.customActions || config.actions;

  const filteredActions = actions.map((action) =>
    action.actionType === 'back'
      ? {
          ...action,
          show: config.hideBack,
        }
      : action
  );

  return {
    ...config,
    actions: createActions(filteredActions, params.router),
  };
};

const defaultErrorConfig: ErrorConfig = {
  title: 'ERROR 404 – Page Not Found',
  subtitle: '(But we can find the object!)',
  message: 'Oops, We can’t Find the Page you’re looking for.',
  helpText:
    'Please go to our homepage, try again or contact our support team for help.',
  actions: commonActionConfig,
  hideBack: true,
};

export const errorConfigs: ErrorConfigs = {
  '404': defaultErrorConfig,
  '403': {
    title: 'ERROR 403 – FORBIDDEN',
    subtitle: '(But you do have access to a sovereign sensor network)',
    message: 'Dreadfully Sorry. I’m afraid you don’t Have access to this page',
    helpText:
      'If you think this is a mistake, please contact your manager or our support team.',
    actions: commonActionConfig,
    hideBack: true,
  },
  '500': {
    title: 'ERROR 500 – Internal Server Error',
    subtitle: '(But our sensors are still tracking!)',
    message: 'Oops, We’ve had a problem with our Server',
    helpText:
      'Please try the operation again! If it continues to fail contact our support team for help.',
    actions: commonActionConfig,
  },
  default: defaultErrorConfig,
};

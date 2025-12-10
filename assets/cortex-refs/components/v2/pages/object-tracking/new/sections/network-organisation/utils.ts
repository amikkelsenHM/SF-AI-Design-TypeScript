export const AUTO_SELECT_NETWORKS_COUNT = 1;

export const parseSelectOptions = (items?: Record<'id' | 'name', string>[]) =>
  items?.map(({ id, name }) => ({ label: name, value: id })) || [];

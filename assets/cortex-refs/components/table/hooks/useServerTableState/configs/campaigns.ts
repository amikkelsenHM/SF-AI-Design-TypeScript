import { ObjectTrackingStatus } from '@/components/v2/pages/object-tracking/enums';
import {
  FilterLogicalOperator,
  FilterOperator,
} from '@/components/v2/table/filters/custom-filter';
import { FILTER_SEPARATORS } from '@/components/v2/table/filters/filter-util';
import { TableState } from '@tanstack/react-table';
import { GetCampaignFilterKeys } from 'api/campaigns';

export enum ObjectTrackingColumnIds {
  DOWNLOAD = 'download',
  NAME = 'name',
  NORAD_ID = 'noradId',
  STATUS = 'isTracked',
  LAST_OBSERVATION = 'lastObservation',
  LAST_UPDATED = 'lastUpdated',
  WARNINGS = 'warnings', // NOT_SUPPORTED
  TRACK_DURATION = 'trackDuration', // NOT_SUPPORTED
  ORBITAL_REGIME = 'orbitalRegime',
}

export const OBJECT_TRACKING_INITIAL_STATE: Partial<TableState> = {
  sorting: [{ id: ObjectTrackingColumnIds.LAST_OBSERVATION, desc: true }],
  pagination: {
    pageSize: 20,
    pageIndex: 0,
  },
};

// TODO: this will need to be updated when BE filerKeys are clarified
export const GET_CAMPAIGN_FIELDS_MAP: Record<string, GetCampaignFilterKeys> = {
  'startEndDates[0].start': 'startTime',
  'startEndDates[0].end': 'endTime',
};

export const MANAGE_TASKS_INITIAL_STATE: Partial<TableState> = {
  sorting: [{ id: 'createdAt', desc: true }],
  pagination: {
    pageSize: 25,
    pageIndex: 0,
  },
  columnFilters: [
    {
      id: 'status',
      value: `${FilterOperator.EQUALS}${FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR}${ObjectTrackingStatus.ACTIVE}`,
    },
    {
      id: 'status',
      value: `${FilterOperator.EQUALS}${FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR}${ObjectTrackingStatus.ACCEPTED}`,
    },
  ],
  logicalOperator: FilterLogicalOperator.OR,
};

import { NextObservationResult } from '@/services/next-observation-estimator';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { PaginatedApiResponse } from 'models/types/common';
import { DateRange } from 'react-day-picker';
import {
  ObjectTrackingObservationMode,
  ObjectTrackingOrbitalRegime,
  ObjectTrackingStatus,
  ObjectTrackingTargetMode,
} from './enums';

interface CampaignBase {
  id: string;
  organizationId: string;
  organizationName: string;
  createdAt: string;
  updatedAt: string;
  isCalibration: boolean;
  name: string;
  targetMode: ObjectTrackingTargetMode;
  noradId: number;
  tle?: string;
  targetName?: string;
  orbitalRegime: ObjectTrackingOrbitalRegime;
  observationMode: ObjectTrackingObservationMode;
  isDataExclusive: boolean;
  status: ObjectTrackingStatus;
  deliverAllInFoV: boolean;
  faintObjectDetection: boolean;
  dataContainer: string;
  trackLength: number;
  minTrackSeparation?: number;
  networks: { id: string; name: string }[];
  taskingSubscriptionID?: string;
  taskingSubscriptionType?: SubscriptionType | null;
  createdBy?: string;
}

interface TrackBase {
  id: string;
  telescopeID: string;
  noradId: number;
}

export interface TrackResponse extends TrackBase {
  startTime: string;
}

export interface CampaignResponse extends CampaignBase {
  startEndDates: { start: string; end: string }[];
  target?: CampaignTarget;
  targetRsoLatestTrack?: TrackResponse;
  latestTrack?: TrackResponse;
}

export type GetAllCampaignsResponse = PaginatedApiResponse<CampaignResponse[]>;

export interface Track extends TrackBase {
  startTime: Date;
}

export interface ObjectTrackingView extends CampaignBase {
  startEndDates?: DateRange;
  // TODO: extract only needed fields from target
  target?: CampaignTarget;
  targetRsoLatestTrack?: Track;
  latestTrack?: Track;
}

export interface LatestObservationDTO {
  id: string;
  name: string;
  noradId: number;
  warnings: number;
  observedAt: string;
  // TODO: BE doesn't return updatedAt
  updatedAt: string;
  taskDuration: { start: string; end: string };
}

export interface KpiItem {
  title: string;
  content: string;
  footnote: string;
  isLoading?: boolean;
}

export enum CatalogRecordType {
  UNKNOWN = 'UNKNOWN',
  PAYLOAD = 'PAYLOAD',
  ROCKET_BODY = 'ROCKET BODY',
  DEBRIS = 'DEBRIS',
  TBA = 'TBA',
}

export enum RCSType {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export interface CampaignTarget {
  objectName?: string;
  name?: string;
  noradId?: number;
  tle?: string;
  tleEpoch?: string;
  type: CatalogRecordType;
  satName?: string | null;
  objectID?: string | null;
  period?: number | null;
  inclination?: number | null;
  apogee?: number | null;
  perigee?: number | null;
  rcs: RCSType;
  country?: string | null;
  launchYear?: number | null;
  launchDate?: string;
  decay?: string | null;
  updatedAt: string;
  orbitalElementsGeneratedAt?: string | null;
  orbitalRegime?: string | null;
}

interface CampaignPayload {
  startEndDates?: Array<{ start: string; end: string }>;
  orbitalRegime?: string;
  targetMode?: string;
  target?: CampaignTarget;
  latestTrack?: Track;
}

export interface Campaign {
  payload?: CampaignPayload;
}

export interface Session {
  id: string;
  startTime: string | null;
  result: string;
  telescopeID: string;
  rsoDetected: number;
  rsoIdentified: number;
  rsoTargetIdentified: boolean;
  failureReason: string;
  isSideObserved: boolean;
  sideObservedCampaignID: string | null;
  objectTrackingId: string;
}

export enum TaskDetailsRowIds {
  TaskId = 'task-id',
  ObjectName = 'object-name',
  TargetingType = 'targeting-type',
  TleValue = 'tle-value',
  TrackLength = 'track-length',
  TrackDuration = 'track-duration',
  LastObservation = 'last-observation',
  Features = 'features',
  Network = 'network',
  Organization = 'organization',
}

interface BaseObjectDetails<TCampaign> {
  target: CampaignTarget;
  tasks: PaginatedApiResponse<TCampaign[]>;
  duration: { start: string; end: string };
  targetRsoLatestTrack?: Track;
}

export type ObjectDetailsResponse = BaseObjectDetails<CampaignResponse>;

export type ObjectDetailsView = BaseObjectDetails<ObjectTrackingView>;

export interface TaskCountByStatus {
  accepted?: number;
  active?: number;
  completed?: number;
  cancelled?: number;
}

export interface ObjectSummary {
  id: string;
  noradId: number;
  name?: string;
  isTracked: boolean;
  campaignIds: string[];
  lastObservation?: {
    startTime: string;
    sessionId: string;
    campaignId: string;
  };
  lastUpdated: string;
  warnings?: number;
  orbitalRegime: ObjectTrackingOrbitalRegime;
  duration: {
    start: string;
    end: string;
  };
  prediction?: NextObservationResult;
  taskCounts?: TaskCountByStatus;
}

export type GetAllObjectsResponse = PaginatedApiResponse<ObjectSummary[]>;

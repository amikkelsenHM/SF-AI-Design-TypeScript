import { ObjectTrackingStatus } from '../enums';

// Data interfaces for object tracking detail tables
export interface TrackDetailItem {
  id: string;
  label: string;
  value: string;
  meta?: { noradId?: number; status?: ObjectTrackingStatus };
}

export interface ObjectDetailItem {
  id: string;
  label: string;
  value: string;
  hasFlag?: boolean;
  flagCode?: string;
}

export interface ObjectDetailSessionItem {
  utcTime: Date;
  sensor: string;
  status: string;
  detected: string | null;
  inFOV: number | null;
  associated: number | null;
}

export interface ObjectDetailTaskItem {
  id: string;
  createdAt: string;
  createdBy: string;
  type: string;
  status: string;
}

const generateUTCTime = () => {
  const options = [
    new Date('07/01/2025, 10:15:23'),
    new Date('07/02/2025, 13:45:01'),
    new Date('07/03/2025, 09:12:47'),
    new Date('07/04/2025, 17:33:10'),
    new Date('07/05/2025, 22:08:56'),
  ];
  return options[Math.floor(Math.random() * options.length)];
};

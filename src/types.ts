export type HazardType =
  | 'Pothole'
  | 'Open manhole'
  | 'Exposed electrical wire'
  | 'Waterlogging'
  | 'Broken footpath'
  | 'Broken streetlight'
  | 'Other';

export type SeverityLevel = 'High' | 'Medium' | 'Low';

export type ReportStatus = 'Open' | 'In progress' | 'Resolved';

export type LanguageCode = 'en' | 'hi' | 'kn' | 'ta' | 'te';

export interface HazardReport {
  id: string;
  type: HazardType;
  severity: SeverityLevel;
  location: string;
  description: string;
  coords: string;
  photo?: string;
  repairPhoto?: string;
  status: ReportStatus;
  created: number;
  reportedBy: string;
  isDemoData?: boolean;
}

export interface DemoUser {
  name: string;
  email: string;
}

export interface UserAccount {
  name: string;
  password: string;
}

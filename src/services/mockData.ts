import { Incident } from "@/components/dashboard/IncidentCard";

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  trafficLevel: 'low' | 'medium' | 'high' | 'severe';
  lastUpdated: string;
  // For uploaded files
  isUpload?: boolean;
  file?: File;
  // For streaming URLs
  isStream?: boolean; 
  streamUrl?: string;
}

export const mockCameras: Camera[] = [
  {
    id: 'CAM-001',
    name: 'Main Street & 5th Ave',
    location: 'Downtown',
    status: 'online',
    trafficLevel: 'high',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'CAM-002',
    name: 'Highway 101 North',
    location: 'Northern Exit',
    status: 'online',
    trafficLevel: 'medium',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'CAM-003',
    name: 'Central Park West',
    location: 'Midtown',
    status: 'offline',
    trafficLevel: 'low',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'CAM-004',
    name: 'Riverside & Oak',
    location: 'Western District',
    status: 'online',
    trafficLevel: 'severe',
    lastUpdated: new Date().toISOString(),
  },
  // Example of a public traffic camera stream
  {
    id: 'STREAM-001',
    name: 'NYC Times Square',
    location: 'New York City',
    status: 'online',
    trafficLevel: 'high',
    lastUpdated: new Date().toISOString(),
    isStream: true,
    streamUrl: 'https://www.youtube.com/embed/AdUw5RdyZxI'
  },
];

export const mockIncidents: Incident[] = [
  {
    id: 'INC-001',
    type: 'accident',
    location: 'Main Street & 5th Ave',
    timestamp: '10:24 AM',
    status: 'active',
    severity: 'high',
    description: 'Two-vehicle collision blocking right lane. Emergency services on the way.',
    cameraId: 'CAM-001'
  },
  {
    id: 'INC-002',
    type: 'congestion',
    location: 'Highway 101 North',
    timestamp: '9:47 AM',
    status: 'active',
    severity: 'medium',
    description: 'Heavy traffic buildup causing delays of approximately 15 minutes.',
    cameraId: 'CAM-002'
  },
  {
    id: 'INC-003',
    type: 'debris',
    location: 'Riverside & Oak',
    timestamp: '8:15 AM',
    status: 'active',
    severity: 'low',
    description: 'Road debris in center lane causing minor slowdowns.',
    cameraId: 'CAM-004'
  },
  {
    id: 'INC-004',
    type: 'violation',
    location: 'Central Park West',
    timestamp: '7:30 AM',
    status: 'resolved',
    severity: 'medium',
    description: 'Multiple vehicles detected running red light. Data forwarded to traffic enforcement.',
    cameraId: 'CAM-003'
  }
];

export const getTrafficStats = () => {
  return {
    activeIncidents: mockIncidents.filter(inc => inc.status === 'active').length,
    activeCameras: mockCameras.filter(cam => cam.status === 'online').length,
    vehiclesTracked: 1482,
    avgSpeed: 32,
    congestionLevel: 'Medium',
    alertsToday: 7
  };
};


import React from 'react';
import { Camera, AlertTriangle, Car, Gauge, Clock, LineChart } from 'lucide-react';

import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import IncidentCard from '@/components/dashboard/IncidentCard';
import VehicleTypeChart from '@/components/dashboard/VehicleTypeChart';
import TrafficFlowChart from '@/components/dashboard/TrafficFlowChart';
import CameraFeed from '@/components/dashboard/CameraFeed';
import HeatmapView from '@/components/dashboard/HeatmapView';

import { mockCameras, mockIncidents, getTrafficStats } from '@/services/mockData';

const Dashboard = () => {
  const stats = getTrafficStats();
  const primaryCamera = mockCameras[0]; // Main camera for display
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Live traffic monitoring and analytics system
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Active Cameras"
          value={stats.activeCameras}
          icon={<Camera className="h-6 w-6" />}
          trend={{ value: 100, isPositive: true }}
        />
        
        <StatCard
          title="Active Incidents"
          value={stats.activeIncidents}
          icon={<AlertTriangle className="h-6 w-6" />}
          trend={{ value: 20, isPositive: false }}
        />
        
        <StatCard
          title="Vehicles Tracked"
          value={stats.vehiclesTracked}
          icon={<Car className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatCard
          title="Avg Speed (mph)"
          value={stats.avgSpeed}
          icon={<Gauge className="h-6 w-6" />}
          trend={{ value: 5, isPositive: false }}
        />
        
        <StatCard
          title="Congestion"
          value={stats.congestionLevel}
          icon={<Clock className="h-6 w-6" />}
        />
        
        <StatCard
          title="Alerts Today"
          value={stats.alertsToday}
          icon={<LineChart className="h-6 w-6" />}
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Camera and traffic flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CameraFeed camera={primaryCamera} />
            <TrafficFlowChart />
          </div>
          
          {/* Heatmap */}
          <HeatmapView />
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* Vehicle classification chart */}
          <VehicleTypeChart />
          
          {/* Recent incidents */}
          <div>
            <h2 className="text-lg font-medium mb-3">Recent Incidents</h2>
            <div className="space-y-3">
              {mockIncidents.map(incident => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { PerformanceCharts } from '@/components/dashboard/PerformanceCharts';
import { RealtimeAlerts } from '@/components/dashboard/RealtimeAlerts';
import { ThreatMonitor } from '@/components/dashboard/ThreatMonitor';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <DashboardMetrics />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <PerformanceCharts />
          </div>
          <div>
            <RealtimeAlerts />
          </div>
        </div>
        
        <ThreatMonitor />
      </div>
    </Layout>
  );
};

export default Index;

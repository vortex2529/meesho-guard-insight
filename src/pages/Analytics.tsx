import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PerformanceCharts } from '@/components/dashboard/PerformanceCharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Clock, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Analytics = () => {
  const performanceData = [
    { month: 'Jan', processing: 1200, savings: 45000, efficiency: 92 },
    { month: 'Feb', processing: 1450, savings: 52000, efficiency: 94 },
    { month: 'Mar', processing: 1680, savings: 58000, efficiency: 96 },
    { month: 'Apr', processing: 1520, savings: 61000, efficiency: 95 },
    { month: 'May', processing: 1780, savings: 67000, efficiency: 97 },
    { month: 'Jun', processing: 1950, savings: 72000, efficiency: 98 },
  ];

  const usageMetrics = [
    { day: 'Mon', uploads: 45, processed: 42 },
    { day: 'Tue', uploads: 52, processed: 48 },
    { day: 'Wed', uploads: 38, processed: 36 },
    { day: 'Thu', uploads: 67, processed: 63 },
    { day: 'Fri', uploads: 71, processed: 68 },
    { day: 'Sat', uploads: 28, processed: 26 },
    { day: 'Sun', uploads: 19, processed: 18 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Performance Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into system performance and usage metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9,580</div>
              <p className="text-xs text-muted-foreground">
                Labels this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3s</div>
              <p className="text-xs text-muted-foreground">
                Per label
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847</div>
              <p className="text-xs text-muted-foreground">
                Sellers using platform
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="processing" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="efficiency" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Usage Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={usageMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="uploads" fill="#3b82f6" />
                  <Bar dataKey="processed" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <PerformanceCharts />
      </div>
    </Layout>
  );
};

export default Analytics;
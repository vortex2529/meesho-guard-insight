import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const fraudPreventionData = [
  { month: 'Jan', prevented: 45, attempted: 67 },
  { month: 'Feb', prevented: 52, attempted: 73 },
  { month: 'Mar', prevented: 49, attempted: 71 },
  { month: 'Apr', prevented: 58, attempted: 82 },
  { month: 'May', prevented: 61, attempted: 89 },
  { month: 'Jun', prevented: 55, attempted: 76 },
];

const processingTimeData = [
  { time: '00:00', avgTime: 2.1 },
  { time: '04:00', avgTime: 1.8 },
  { time: '08:00', avgTime: 3.2 },
  { time: '12:00', avgTime: 4.1 },
  { time: '16:00', avgTime: 3.8 },
  { time: '20:00', avgTime: 2.9 },
];

const labelTypesData = [
  { name: 'Courier Labels', value: 45, color: '#3b82f6' },
  { name: 'Return Labels', value: 25, color: '#10b981' },
  { name: 'Custom Labels', value: 20, color: '#f59e0b' },
  { name: 'Bulk Labels', value: 10, color: '#ef4444' },
];

const savingsData = [
  { day: 'Mon', savings: 2400 },
  { day: 'Tue', savings: 1398 },
  { day: 'Wed', savings: 9800 },
  { day: 'Thu', savings: 3908 },
  { day: 'Fri', savings: 4800 },
  { day: 'Sat', savings: 3800 },
  { day: 'Sun', savings: 4300 },
];

export const PerformanceCharts: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="fraud" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fraud">Fraud Prevention</TabsTrigger>
          <TabsTrigger value="processing">Processing Time</TabsTrigger>
          <TabsTrigger value="labels">Label Types</TabsTrigger>
          <TabsTrigger value="savings">Cost Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="fraud" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Fraud Prevention Trends
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-danger rounded-full"></div>
                      Attempted
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      Prevented
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={fraudPreventionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="attempted"
                      stackId="1"
                      stroke="hsl(var(--danger))"
                      fill="hsl(var(--danger) / 0.1)"
                    />
                    <Area
                      type="monotone"
                      dataKey="prevented"
                      stackId="1"
                      stroke="hsl(var(--success))"
                      fill="hsl(var(--success) / 0.3)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Average Processing Time (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={processingTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}s`, 'Avg Time']} />
                    <Line
                      type="monotone"
                      dataKey="avgTime"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="labels" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Label Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={labelTypesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {labelTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Weekly Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={savingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Savings']} />
                    <Bar
                      dataKey="savings"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
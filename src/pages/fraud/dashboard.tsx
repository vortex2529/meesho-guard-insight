import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, TrendingDown, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const FraudDashboard = () => {
  const fraudTrends = [
    { month: 'Jan', prevented: 45, detected: 52 },
    { month: 'Feb', prevented: 52, detected: 48 },
    { month: 'Mar', prevented: 38, detected: 41 },
    { month: 'Apr', prevented: 67, detected: 59 },
    { month: 'May', prevented: 71, detected: 62 },
    { month: 'Jun', prevented: 58, detected: 55 },
  ];

  const threatTypes = [
    { name: 'Fake Reviews', value: 35, color: '#ef4444' },
    { name: 'Price Manipulation', value: 28, color: '#f97316' },
    { name: 'Account Takeover', value: 22, color: '#eab308' },
    { name: 'Payment Fraud', value: 15, color: '#06b6d4' },
  ];

  const riskMetrics = [
    {
      title: 'High Risk Orders',
      count: 12,
      percentage: 3.2,
      trend: 'down',
      color: 'text-destructive'
    },
    {
      title: 'Suspicious Accounts',
      count: 8,
      percentage: 1.8,
      trend: 'down',
      color: 'text-orange-500'
    },
    {
      title: 'Blocked Transactions',
      count: 47,
      percentage: 12.5,
      trend: 'up',
      color: 'text-green-600'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fraud Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor fraud detection and prevention metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">Low</div>
                <Progress value={25} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Overall system risk
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">
                Detection accuracy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Monitors</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                ML models running
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Fraud Prevention Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fraudTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="prevented" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="detected" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Threat Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={threatTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {threatTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {threatTypes.map((type) => (
                  <div key={type.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: type.color }}
                      />
                      <span>{type.name}</span>
                    </div>
                    <span className="font-medium">{type.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {riskMetrics.map((metric) => (
                <div key={metric.title} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{metric.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-2xl font-bold ${metric.color}`}>
                          {metric.count}
                        </span>
                        <Badge variant={metric.trend === 'up' ? 'destructive' : 'secondary'}>
                          {metric.trend === 'up' ? '↑' : '↓'} {metric.percentage}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FraudDashboard;
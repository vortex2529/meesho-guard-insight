import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Brain, Target, Shield, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const InsightsPage = () => {
  const fraudTrends = [
    { month: 'Jan', amount: 12400, incidents: 32 },
    { month: 'Feb', amount: 8900, incidents: 28 },
    { month: 'Mar', amount: 15600, incidents: 41 },
    { month: 'Apr', amount: 7200, incidents: 19 },
    { month: 'May', amount: 9800, incidents: 25 },
    { month: 'Jun', amount: 6500, incidents: 17 },
  ];

  const riskFactors = [
    { factor: 'New Account Activity', score: 85, trend: 'up' },
    { factor: 'Payment Failures', score: 72, trend: 'down' },
    { factor: 'Velocity Patterns', score: 68, trend: 'up' },
    { factor: 'Geographic Anomalies', score: 45, trend: 'down' },
    { factor: 'Review Manipulation', score: 38, trend: 'stable' },
  ];

  const insights = [
    {
      title: 'Peak Fraud Hours',
      description: 'Fraud attempts spike between 2-4 AM IST',
      impact: 'High',
      recommendation: 'Increase monitoring during these hours',
      icon: <AlertCircle className="h-5 w-5 text-orange-500" />
    },
    {
      title: 'Payment Pattern Analysis',
      description: 'UPI fraud attempts decreased by 23% this month',
      impact: 'Medium',
      recommendation: 'Continue enhanced UPI monitoring',
      icon: <TrendingDown className="h-5 w-5 text-green-500" />
    },
    {
      title: 'Account Age Correlation',
      description: 'Accounts < 30 days old show 40% higher fraud risk',
      impact: 'High',
      recommendation: 'Implement enhanced verification for new accounts',
      icon: <Shield className="h-5 w-5 text-red-500" />
    },
    {
      title: 'ML Model Performance',
      description: 'Fraud detection accuracy improved to 98.7%',
      impact: 'High',
      recommendation: 'Deploy updated model to production',
      icon: <Brain className="h-5 w-5 text-blue-500" />
    }
  ];

  const getImpactVariant = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <Target className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fraud Insights</h1>
          <p className="text-muted-foreground">
            AI-powered insights and trends from fraud detection data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fraud Reduction</CardTitle>
              <TrendingDown className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">47%</div>
              <p className="text-xs text-muted-foreground">
                vs last quarter
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2.4L</div>
              <p className="text-xs text-muted-foreground">
                Prevented losses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">
                Detection rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">False Positives</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.8%</div>
              <p className="text-xs text-muted-foreground">
                Industry leading
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Loss Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fraudTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="amount" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Factor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((factor) => (
                  <div key={factor.factor} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getTrendIcon(factor.trend)}
                      <span className="text-sm font-medium">{factor.factor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${factor.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{factor.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Key Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    {insight.icon}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{insight.title}</h3>
                        <Badge variant={getImpactVariant(insight.impact)}>
                          {insight.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {insight.description}
                      </p>
                      <div className="bg-muted/50 rounded p-3">
                        <p className="text-sm font-medium text-primary">
                          💡 Recommendation: {insight.recommendation}
                        </p>
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

export default InsightsPage;
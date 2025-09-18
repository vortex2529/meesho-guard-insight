import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Clock, CheckCircle, X } from 'lucide-react';

const AlertsPage = () => {
  const alerts = [
    {
      id: 'alert-001',
      type: 'critical',
      title: 'Suspicious Payment Pattern Detected',
      description: 'Multiple failed payment attempts from same IP address',
      timestamp: '2 minutes ago',
      account: 'seller_12345',
      action: 'Block account temporarily',
      status: 'active'
    },
    {
      id: 'alert-002',
      type: 'high',
      title: 'Unusual Order Velocity',
      description: 'Account placed 50+ orders in last hour',
      timestamp: '15 minutes ago',
      account: 'buyer_67890',
      action: 'Verify account',
      status: 'investigating'
    },
    {
      id: 'alert-003',
      type: 'medium',
      title: 'Price Manipulation Detected',
      description: 'Product price changed 5 times in 10 minutes',
      timestamp: '1 hour ago',
      account: 'seller_54321',
      action: 'Review pricing history',
      status: 'resolved'
    },
    {
      id: 'alert-004',
      type: 'low',
      title: 'Review Pattern Anomaly',
      description: 'Cluster of 5-star reviews from new accounts',
      timestamp: '2 hours ago',
      account: 'seller_98765',
      action: 'Monitor reviews',
      status: 'monitoring'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'high':
        return <Shield className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'destructive';
      case 'investigating':
        return 'default';
      case 'resolved':
        return 'secondary';
      case 'monitoring':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const alertStats = {
    critical: alerts.filter(a => a.type === 'critical').length,
    high: alerts.filter(a => a.type === 'high').length,
    medium: alerts.filter(a => a.type === 'medium').length,
    low: alerts.filter(a => a.type === 'low').length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Active Alerts</h1>
          <p className="text-muted-foreground">
            Monitor and respond to security alerts and threats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{alertStats.critical}</div>
              <p className="text-xs text-muted-foreground">
                Immediate attention required
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <Shield className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{alertStats.high}</div>
              <p className="text-xs text-muted-foreground">
                Action needed soon
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medium</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{alertStats.medium}</div>
              <p className="text-xs text-muted-foreground">
                Monitor closely
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Priority</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{alertStats.low}</div>
              <p className="text-xs text-muted-foreground">
                Informational
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{alert.title}</h3>
                          <Badge variant={getAlertVariant(alert.type)}>
                            {alert.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {alert.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{alert.timestamp}</span>
                          <span>•</span>
                          <span>Account: {alert.account}</span>
                          <span>•</span>
                          <span>{alert.action}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusVariant(alert.status)}>
                        {alert.status}
                      </Badge>
                      {alert.status === 'active' && (
                        <>
                          <Button variant="outline" size="sm">
                            Investigate
                          </Button>
                          <Button variant="outline" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
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

export default AlertsPage;
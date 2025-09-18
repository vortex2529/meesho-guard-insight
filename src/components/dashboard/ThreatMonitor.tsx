import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Globe,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ThreatMetric {
  label: string;
  value: number;
  status: 'safe' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface SystemStatus {
  service: string;
  status: 'online' | 'warning' | 'offline';
  uptime: string;
  lastCheck: string;
}

export const ThreatMonitor: React.FC = () => {
  const threatMetrics: ThreatMetric[] = [
    { label: 'Fraud Detection', value: 98, status: 'safe', trend: 'up' },
    { label: 'Label Validation', value: 95, status: 'safe', trend: 'stable' },
    { label: 'Transaction Security', value: 87, status: 'warning', trend: 'down' },
    { label: 'System Health', value: 99, status: 'safe', trend: 'up' },
  ];

  const systemStatus: SystemStatus[] = [
    { service: 'AI Fraud Engine', status: 'online', uptime: '99.9%', lastCheck: '2 mins ago' },
    { service: 'Label Processor', status: 'online', uptime: '99.7%', lastCheck: '1 min ago' },
    { service: 'Real-time Monitor', status: 'online', uptime: '100%', lastCheck: 'Just now' },
    { service: 'API Gateway', status: 'warning', uptime: '98.2%', lastCheck: '5 mins ago' },
  ];

  const getStatusColor = (status: 'safe' | 'warning' | 'critical' | 'online' | 'offline') => {
    switch (status) {
      case 'safe':
      case 'online':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
      case 'offline':
        return 'text-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: 'online' | 'warning' | 'offline') => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'offline':
        return <AlertTriangle className="h-4 w-4 text-danger" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Threat Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Security Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {threatMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${getStatusColor(metric.status)}`}>
                      {metric.value}%
                    </span>
                    <TrendingUp 
                      className={`h-3 w-3 ${
                        metric.trend === 'up' ? 'text-success' : 
                        metric.trend === 'down' ? 'text-danger' : 'text-muted-foreground'
                      }`} 
                    />
                  </div>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2"
                  style={{
                    background: metric.status === 'safe' ? 'hsl(var(--success) / 0.2)' :
                               metric.status === 'warning' ? 'hsl(var(--warning) / 0.2)' :
                               'hsl(var(--danger) / 0.2)'
                  }}
                />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary animate-pulse" />
              System Status
              <Badge variant="outline" className="ml-auto">
                <Globe className="h-3 w-3 mr-1" />
                Global
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStatus.map((service, index) => (
              <motion.div
                key={service.service}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <p className="font-medium text-sm">{service.service}</p>
                    <p className="text-xs text-muted-foreground">
                      Uptime: {service.uptime}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={service.status === 'online' ? 'default' : 'destructive'}
                    className="mb-1"
                  >
                    {service.status.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {service.lastCheck}
                  </p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Live Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-2"
      >
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Live Security Feed
              <div className="flex items-center gap-1 ml-auto">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {[
                { time: '14:32:15', event: 'Fraud pattern detected and blocked', type: 'success' },
                { time: '14:31:42', event: 'Label validation completed - 247 processed', type: 'info' },
                { time: '14:30:18', event: 'Suspicious IP address flagged', type: 'warning' },
                { time: '14:29:55', event: 'System health check passed', type: 'success' },
                { time: '14:28:33', event: 'New security rules deployed', type: 'info' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-2 rounded bg-muted/20"
                >
                  <span className="text-xs text-muted-foreground font-mono w-16">
                    {activity.time}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-success' :
                    activity.type === 'warning' ? 'bg-warning' : 'bg-primary'
                  }`}></div>
                  <span className="text-sm flex-1">{activity.event}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};


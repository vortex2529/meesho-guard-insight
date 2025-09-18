import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  X, 
  CheckCircle, 
  Info,
  AlertCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  actionRequired?: boolean;
}

const alertIcons = {
  critical: AlertTriangle,
  warning: AlertCircle,
  info: Info,
  success: CheckCircle,
};

const alertStyles = {
  critical: 'border-danger bg-danger-light text-danger-foreground',
  warning: 'border-warning bg-warning-light text-warning-foreground',
  info: 'border-primary bg-primary/5 text-primary',
  success: 'border-success bg-success-light text-success-foreground',
};

export const RealtimeAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Suspicious Transaction Detected',
      message: 'High-risk pattern detected in order #ORD-123456. Immediate review required.',
      timestamp: new Date(),
      actionRequired: true,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Unusual Processing Delay',
      message: 'Label processing taking longer than usual. Queue backlog detected.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      actionRequired: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'Fraud Attempt Blocked',
      message: 'Successfully prevented fraudulent transaction worth ₹15,000.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      actionRequired: false,
    },
    {
      id: '4',
      type: 'info',
      title: 'System Update Complete',
      message: 'AI model updated with latest fraud patterns. Enhanced protection active.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      actionRequired: false,
    },
  ]);

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: ['info', 'warning', 'success'][Math.floor(Math.random() * 3)] as Alert['type'],
          title: 'New Activity Detected',
          message: 'System monitoring detected new activity patterns.',
          timestamp: new Date(),
          actionRequired: Math.random() > 0.8,
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 latest
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="dashboard-card h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary animate-pulse" />
          Real-time Security Alerts
          <Badge variant="destructive" className="ml-auto">
            {alerts.filter(a => a.actionRequired).length} Action Required
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-6">
          <AnimatePresence>
            {alerts.map((alert, index) => {
              const Icon = alertIcons[alert.type];
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    mb-4 p-4 rounded-lg border-l-4 relative group
                    ${alertStyles[alert.type]}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          {alert.actionRequired && (
                            <Badge variant="outline" className="text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm opacity-90">{alert.message}</p>
                        <div className="flex items-center gap-2 text-xs opacity-75">
                          <Clock className="h-3 w-3" />
                          {formatTime(alert.timestamp)}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {alert.actionRequired && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Review
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Dismiss
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {alerts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No active alerts</p>
              <p className="text-sm">Your system is secure</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
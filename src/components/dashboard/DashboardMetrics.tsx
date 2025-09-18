import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Shield, 
  Clock, 
  TrendingUp, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon, index }) => {
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted-foreground';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="metrics-card hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className={`text-sm flex items-center gap-1 ${trendColor}`}>
              <TrendingUp className="h-3 w-3" />
              {change}
            </p>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const DashboardMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Total Savings',
      value: '₹2,34,567',
      change: '+12.5% this month',
      trend: 'up' as const,
      icon: <DollarSign className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Fraud Prevented',
      value: '47',
      change: '+23% vs last week',
      trend: 'up' as const,
      icon: <Shield className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Avg Processing Time',
      value: '2.3s',
      change: '-45% improvement',
      trend: 'up' as const,
      icon: <Clock className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Labels Processed',
      value: '1,247',
      change: '+18% this week',
      trend: 'up' as const,
      icon: <Package className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Active Alerts',
      value: '3',
      change: '-2 from yesterday',
      trend: 'up' as const,
      icon: <AlertTriangle className="h-5 w-5 text-warning" />,
    },
    {
      title: 'Success Rate',
      value: '99.2%',
      change: '+0.8% improvement',
      trend: 'up' as const,
      icon: <CheckCircle className="h-5 w-5 text-success" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
          <p className="text-muted-foreground">Real-time metrics for your MeeshoGuard protection</p>
        </div>
        <div className="flex items-center gap-2 text-success">
          <Activity className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-medium">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
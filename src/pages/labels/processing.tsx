import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Package, CheckCircle, AlertCircle } from 'lucide-react';

const ProcessingPage = () => {
  const processingJobs = [
    {
      id: 'job-001',
      filename: 'batch_labels_morning.pdf',
      status: 'processing',
      progress: 65,
      courier: 'BlueDart',
      itemCount: 24,
      startTime: '10:30 AM',
    },
    {
      id: 'job-002',
      filename: 'urgent_shipments.pdf',
      status: 'completed',
      progress: 100,
      courier: 'FedEx',
      itemCount: 8,
      startTime: '09:45 AM',
    },
    {
      id: 'job-003',
      filename: 'bulk_orders_evening.pdf',
      status: 'queued',
      progress: 0,
      courier: 'DTDC',
      itemCount: 156,
      startTime: 'Pending',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'queued':
        return <Package className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'processing':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'queued':
        return 'outline';
      default:
        return 'destructive';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Processing Queue</h1>
          <p className="text-muted-foreground">
            Monitor the status of your label processing jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Currently processing
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                188 labels processed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Queue Length</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Jobs waiting
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Processing Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processingJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(job.status)}
                      <div>
                        <h3 className="font-medium">{job.filename}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.itemCount} labels • {job.courier} • Started {job.startTime}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                  
                  {job.status === 'processing' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProcessingPage;
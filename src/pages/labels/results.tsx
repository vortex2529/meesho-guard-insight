import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye, Package, Calendar } from 'lucide-react';

const ResultsPage = () => {
  const processedBatches = [
    {
      id: 'batch-001',
      filename: 'morning_shipments.pdf',
      processedAt: '2024-01-15 11:45 AM',
      courier: 'BlueDart',
      itemCount: 24,
      savings: 1420,
      status: 'completed',
    },
    {
      id: 'batch-002',
      filename: 'urgent_orders.pdf',
      processedAt: '2024-01-15 09:30 AM',
      courier: 'FedEx',
      itemCount: 8,
      savings: 560,
      status: 'completed',
    },
    {
      id: 'batch-003',
      filename: 'bulk_delivery.pdf',
      processedAt: '2024-01-14 04:20 PM',
      courier: 'DTDC',
      itemCount: 156,
      savings: 8740,
      status: 'completed',
    },
    {
      id: 'batch-004',
      filename: 'evening_batch.pdf',
      processedAt: '2024-01-14 02:15 PM',
      courier: 'Delhivery',
      itemCount: 43,
      savings: 2580,
      status: 'completed',
    },
  ];

  const totalSavings = processedBatches.reduce((sum, batch) => sum + batch.savings, 0);
  const totalItems = processedBatches.reduce((sum, batch) => sum + batch.itemCount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Processing Results</h1>
          <p className="text-muted-foreground">
            View and download your processed label batches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground">
                Labels this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalSavings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Saved this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Batches</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processedBatches.length}</div>
              <p className="text-xs text-muted-foreground">
                Completed batches
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Processed Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processedBatches.map((batch) => (
                <div key={batch.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{batch.filename}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{batch.processedAt}</span>
                        <span>•</span>
                        <span>{batch.courier}</span>
                        <span>•</span>
                        <span>{batch.itemCount} labels</span>
                        <span>•</span>
                        <span className="text-green-600 font-medium">₹{batch.savings} saved</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">
                        {batch.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
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

export default ResultsPage;
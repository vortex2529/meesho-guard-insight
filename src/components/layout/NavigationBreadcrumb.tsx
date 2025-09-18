import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const routeLabels: Record<string, string> = {
  '': 'Dashboard',
  'monitor': 'Real-time Monitor',
  'labels': 'Label Processing',
  'upload': 'Upload Labels',
  'processing': 'Processing Queue',
  'results': 'Results',
  'fraud': 'Fraud Protection',
  'dashboard': 'Dashboard',
  'alerts': 'Active Alerts',
  'insights': 'Insights',
  'analytics': 'Analytics',
  'settings': 'Settings',
};

export const NavigationBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    return { path, label, isLast: index === pathSegments.length - 1 };
  });

  if (pathSegments.length === 0) {
    return null; // Don't show breadcrumbs on home page
  }

  return (
    <div className="px-6 py-3 bg-muted/30 border-b border-border">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.path}>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {breadcrumb.isLast ? (
                  <BreadcrumbPage className="font-medium">
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Shield,
  AlertTriangle,
  Upload,
  BarChart3,
  Settings,
  FileText,
  Activity,
  TrendingUp
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';

const navigationItems = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        url: '/',
        icon: LayoutDashboard,
        badge: null,
      },
      {
        title: 'Real-time Monitor',
        url: '/monitor',
        icon: Activity,
        badge: 'LIVE',
      },
    ],
  },
  {
    title: 'Label Processing',
    items: [
      {
        title: 'Upload Labels',
        url: '/labels/upload',
        icon: Upload,
        badge: null,
      },
      {
        title: 'Processing Queue',
        url: '/labels/processing',
        icon: Package,
        badge: '12',
      },
      {
        title: 'Results',
        url: '/labels/results',
        icon: FileText,
        badge: null,
      },
    ],
  },
  {
    title: 'Fraud Protection',
    items: [
      {
        title: 'Fraud Dashboard',
        url: '/fraud/dashboard',
        icon: Shield,
        badge: null,
      },
      {
        title: 'Active Alerts',
        url: '/fraud/alerts',
        icon: AlertTriangle,
        badge: '3',
      },
      {
        title: 'Insights',
        url: '/fraud/insights',
        icon: TrendingUp,
        badge: null,
      },
    ],
  },
  {
    title: 'Analytics',
    items: [
      {
        title: 'Performance',
        url: '/analytics',
        icon: BarChart3,
        badge: null,
      },
      {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
        badge: null,
      },
    ],
  },
];

export const AppSidebar: React.FC = () => {
  const location = useLocation();
  const { state } = useSidebar();

  const isActive = (url: string) => {
    return location.pathname === url || (url !== '/' && location.pathname.startsWith(url));
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-card border-r border-border">
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-muted-foreground text-xs font-medium">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      className={`
                        relative transition-all duration-200 
                        ${isActive(item.url) 
                          ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                          : 'hover:bg-accent/50 text-foreground'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && (
                          <>
                            <span className="flex-1">{item.title}</span>
                            {item.badge && (
                              <Badge 
                                variant={item.badge === 'LIVE' ? 'destructive' : 'secondary'} 
                                className="h-5 text-xs"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
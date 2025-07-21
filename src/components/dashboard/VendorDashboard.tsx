import { MetricCard } from '@/components/ui/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Grid } from '@/components/ui/Grid';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { DonutChart } from '@/components/charts/DonutChart';
import {
  Heart,
  Store,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Clock,
  DollarSign,
  Package,
  Bell,
} from 'lucide-react';
import Link from 'next/link';

// Sample data
const stats = [
  {
    title: 'Meals Saved',
    value: '2,543',
    change: { value: 12, type: 'increase' as const },
    icon: <Heart className="h-6 w-6" />,
    description: 'This month'
  },
  {
    title: 'Active Listings',
    value: '12',
    icon: <Store className="h-6 w-6" />,
    description: 'Currently available'
  },
  {
    title: 'Total Revenue',
    value: '$3,247',
    change: { value: 8, type: 'increase' as const },
    icon: <DollarSign className="h-6 w-6" />,
    description: 'This month'
  },
  {
    title: 'Impact Score',
    value: '92',
    change: { value: 3, type: 'increase' as const },
    icon: <TrendingUp className="h-6 w-6" />,
    description: 'Sustainability rating'
  },
];

const revenueData = [
  { month: 'Jan', revenue: 2400 },
  { month: 'Feb', revenue: 1398 },
  { month: 'Mar', revenue: 9800 },
  { month: 'Apr', revenue: 3908 },
  { month: 'May', revenue: 4800 },
  { month: 'Jun', revenue: 3800 },
];

const categoryData = [
  { name: 'Bakery', value: 45, color: '#22c55e' },
  { name: 'Produce', value: 30, color: '#eab308' },
  { name: 'Prepared Foods', value: 15, color: '#f97316' },
  { name: 'Dairy', value: 10, color: '#ef4444' },
];

const recentListings = [
  {
    id: '1',
    name: 'Fresh Croissants',
    category: 'Bakery',
    quantity: 24,
    status: 'active',
    expiresAt: '2024-01-15T18:00:00Z',
    views: 45,
    reserved: 8
  },
  {
    id: '2', 
    name: 'Organic Salad Mix',
    category: 'Produce',
    quantity: 15,
    status: 'active',
    expiresAt: '2024-01-16T20:00:00Z',
    views: 32,
    reserved: 12
  },
  {
    id: '3',
    name: 'Artisan Bread',
    category: 'Bakery',
    quantity: 8,
    status: 'low_stock',
    expiresAt: '2024-01-15T16:00:00Z',
    views: 67,
    reserved: 6
  }
];

const notifications = [
  {
    id: '1',
    type: 'order',
    message: 'New order for Fresh Croissants',
    time: '5 minutes ago',
    unread: true
  },
  {
    id: '2',
    type: 'expiry',
    message: 'Artisan Bread expires in 2 hours',
    time: '1 hour ago',
    unread: true
  },
  {
    id: '3',
    type: 'review',
    message: 'New 5-star review received',
    time: '3 hours ago',
    unread: false
  }
];

export function VendorDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'low_stock':
        return <Badge variant="warning">Low Stock</Badge>;
      case 'expired':
        return <Badge variant="error">Expired</Badge>;
      default:
        return <Badge variant="gray">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">Vendor Dashboard</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Manage your listings and track your impact on food waste reduction.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 flex-shrink-0">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </Button>
          <Link href="/dashboard/listings/new" className="flex-1 sm:flex-none">
            <Button size="sm" fullWidth className="sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Listing</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <Grid cols={4} gap="md">
        {stats.map((stat, index) => (
          <MetricCard key={index} {...stat} />
        ))}
      </Grid>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Grid cols={2} gap="lg">
            <AreaChart
              title="Revenue Trend"
              data={revenueData}
              dataKey="revenue"
              xAxisKey="month"
              color="#22c55e"
            />
            <DonutChart
              title="Listings by Category"
              data={categoryData}
            />
          </Grid>
        </TabsContent>

        <TabsContent value="listings" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Active Listings</CardTitle>
                <Link href="/dashboard/listings/new">
                  <Button size="sm" fullWidth className="sm:w-auto">
                    <Plus className="h-4 w-4" />
                    Add New
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border border-gray-200 p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h3 className="font-semibold text-gray-900 truncate">{listing.name}</h3>
                        {getStatusBadge(listing.status)}
                      </div>
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Package className="h-4 w-4 flex-shrink-0" />
                          {listing.quantity} available
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4 flex-shrink-0" />
                          {listing.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">Expires {new Date(listing.expiresAt).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Edit</Button>
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Grid cols={2} gap="lg">
            <BarChart
              title="Monthly Meals Saved"
              data={[
                { month: 'Jan', meals: 240 },
                { month: 'Feb', meals: 198 },
                { month: 'Mar', meals: 380 },
                { month: 'Apr', meals: 290 },
                { month: 'May', meals: 480 },
                { month: 'Jun', meals: 380 },
              ]}
              dataKey="meals"
              xAxisKey="month"
              color="#22c55e"
            />
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="font-semibold">24.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Time to Sell</span>
                  <span className="font-semibold">2.3 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Customer Rating</span>
                  <span className="font-semibold">4.8/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Repeat Customers</span>
                  <span className="font-semibold">68%</span>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`flex items-start gap-3 rounded-lg p-3 ${
                    notification.unread ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'
                  }`}>
                    <div className={`mt-1 h-2 w-2 rounded-full ${
                      notification.unread ? 'bg-primary-600' : 'bg-gray-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
import AdminLayout from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/admin/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { 
  Users, 
  ShoppingBasket, 
  BarChart3, 
  HandHeart, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Settings,
  Download
} from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    change: '+5.4%',
    changeType: 'increase' as const,
    icon: <Users className="h-6 w-6" />
  },
  {
    title: 'Active Listings',
    value: '5,678',
    change: '+12.1%',
    changeType: 'increase' as const,
    icon: <ShoppingBasket className="h-6 w-6" />
  },
  {
    title: 'Meals Saved',
    value: '12,345',
    change: '+8.2%',
    changeType: 'increase' as const,
    icon: <HandHeart className="h-6 w-6" />
  },
  {
    title: 'Revenue',
    value: '$45,678',
    change: '+15.3%',
    changeType: 'increase' as const,
    icon: <DollarSign className="h-6 w-6" />
  }
];

const revenueData = [
  { month: 'Jan', revenue: 12400, commission: 1240 },
  { month: 'Feb', revenue: 15600, commission: 1560 },
  { month: 'Mar', revenue: 18900, commission: 1890 },
  { month: 'Apr', revenue: 22100, commission: 2210 },
  { month: 'May', revenue: 25800, commission: 2580 },
  { month: 'Jun', revenue: 28400, commission: 2840 },
];

const userGrowthData = [
  { month: 'Jan', vendors: 45, consumers: 234, ngos: 12 },
  { month: 'Feb', vendors: 52, consumers: 289, ngos: 15 },
  { month: 'Mar', vendors: 61, consumers: 356, ngos: 18 },
  { month: 'Apr', vendors: 68, consumers: 423, ngos: 22 },
  { month: 'May', vendors: 75, consumers: 498, ngos: 25 },
  { month: 'Jun', vendors: 83, consumers: 567, ngos: 28 },
];

const categoryData = [
  { name: 'Bakery', value: 245, color: '#22c55e' },
  { name: 'Produce', value: 189, color: '#eab308' },
  { name: 'Prepared Foods', value: 156, color: '#f97316' },
  { name: 'Dairy', value: 98, color: '#ef4444' },
  { name: 'Other', value: 67, color: '#8b5cf6' },
];

const pendingApprovals = [
  {
    id: '1',
    type: 'vendor',
    name: 'Green Valley Bakery',
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'pending'
  },
  {
    id: '2',
    type: 'listing',
    name: 'Fresh Organic Vegetables',
    vendor: 'Farm Fresh Market',
    submittedAt: '2024-01-15T14:20:00Z',
    status: 'pending'
  },
  {
    id: '3',
    type: 'vendor',
    name: 'Downtown Deli',
    submittedAt: '2024-01-14T16:45:00Z',
    status: 'under_review'
  }
];

const recentTransactions = [
  {
    id: '1',
    vendor: 'Green Leaf Bakery',
    consumer: 'John Doe',
    amount: '$24.50',
    commission: '$2.45',
    status: 'completed',
    date: '2024-01-15T18:30:00Z'
  },
  {
    id: '2',
    vendor: 'Farm Fresh Market',
    consumer: 'Jane Smith',
    amount: '$18.75',
    commission: '$1.88',
    status: 'completed',
    date: '2024-01-15T17:15:00Z'
  },
  {
    id: '3',
    vendor: 'Corner Deli',
    consumer: 'Mike Johnson',
    amount: '$32.00',
    commission: '$3.20',
    status: 'pending',
    date: '2024-01-15T16:45:00Z'
  }
];

export default function AdminDashboardPage() {
  const getApprovalBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'under_review':
        return <Badge variant="default">Under Review</Badge>;
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="error">Rejected</Badge>;
      default:
        return <Badge variant="gray">Unknown</Badge>;
    }
  };

  const getTransactionBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="error">Failed</Badge>;
      default:
        return <Badge variant="gray">Unknown</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Monitor platform activity and manage operations.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <AreaChart
                title="Revenue & Commission Trends"
                data={revenueData}
                dataKey="revenue"
                xAxisKey="month"
                color="#22c55e"
              />
              <DonutChart
                title="Listings by Category"
                data={categoryData}
              />
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <BarChart
              title="User Growth by Type"
              data={userGrowthData}
              dataKey="consumers"
              xAxisKey="month"
              color="#22c55e"
            />
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-gray-500">
                    Listing management interface would go here
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Transactions</CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-gray-900">{transaction.vendor}</h3>
                          {getTransactionBadge(transaction.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Customer: {transaction.consumer}</p>
                        <div className="mt-2 flex items-center gap-6 text-sm text-gray-600">
                          <span>Amount: {transaction.amount}</span>
                          <span>Commission: {transaction.commission}</span>
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pending Approvals</CardTitle>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning-600" />
                    <span className="text-sm text-warning-600">{pendingApprovals.length} pending</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          {getApprovalBadge(item.status)}
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        {'vendor' in item && (
                          <p className="text-sm text-gray-600 mt-1">Vendor: {item.vendor}</p>
                        )}
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          Submitted: {new Date(item.submittedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Review</Button>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

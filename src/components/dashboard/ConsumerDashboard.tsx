import { MetricCard } from '@/components/ui/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Progress } from '@/components/ui/Progress';
import { Grid } from '@/components/ui/Grid';
import { AreaChart } from '@/components/charts/AreaChart';
import { DonutChart } from '@/components/charts/DonutChart';
import {
  Heart,
  ShoppingCart,
  Star,
  MapPin,
  Clock,
  Leaf,
  Award,
  Search,
  Calendar,
  DollarSign,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

// Sample data
const stats = [
  {
    title: 'Meals Rescued',
    value: '42',
    change: { value: 8, type: 'increase' as const },
    icon: <Heart className="h-6 w-6" />,
    description: 'This month'
  },
  {
    title: 'Money Saved',
    value: '$127',
    change: { value: 15, type: 'increase' as const },
    icon: <DollarSign className="h-6 w-6" />,
    description: 'Total savings'
  },
  {
    title: 'Active Reservations',
    value: '3',
    icon: <ShoppingCart className="h-6 w-6" />,
    description: 'Pending pickup'
  },
  {
    title: 'Impact Score',
    value: '85',
    change: { value: 5, type: 'increase' as const },
    icon: <Leaf className="h-6 w-6" />,
    description: 'Environmental impact'
  },
];

const impactData = [
  { month: 'Jan', meals: 12 },
  { month: 'Feb', meals: 8 },
  { month: 'Mar', meals: 15 },
  { month: 'Apr', meals: 18 },
  { month: 'May', meals: 22 },
  { month: 'Jun', meals: 25 },
];

const categoryData = [
  { name: 'Bakery', value: 18, color: '#22c55e' },
  { name: 'Produce', value: 12, color: '#eab308' },
  { name: 'Prepared Foods', value: 8, color: '#f97316' },
  { name: 'Dairy', value: 4, color: '#ef4444' },
];

const activeReservations = [
  {
    id: '1',
    vendorName: 'Green Leaf Bakery',
    itemName: 'Fresh Croissants',
    quantity: 6,
    pickupTime: '2024-01-15T18:00:00Z',
    status: 'confirmed',
    location: '123 Main St'
  },
  {
    id: '2',
    vendorName: 'Farm Fresh Market',
    itemName: 'Organic Vegetables',
    quantity: 3,
    pickupTime: '2024-01-16T17:30:00Z',
    status: 'pending',
    location: '456 Oak Ave'
  },
  {
    id: '3',
    vendorName: 'Corner Deli',
    itemName: 'Sandwich Combo',
    quantity: 2,
    pickupTime: '2024-01-15T19:00:00Z',
    status: 'ready',
    location: '789 Pine St'
  }
];

const favoriteVendors = [
  {
    id: '1',
    name: 'Green Leaf Bakery',
    rating: 4.8,
    totalOrders: 12,
    lastOrder: '2024-01-10',
    category: 'Bakery'
  },
  {
    id: '2',
    name: 'Farm Fresh Market',
    rating: 4.9,
    totalOrders: 8,
    lastOrder: '2024-01-12',
    category: 'Produce'
  },
  {
    id: '3',
    name: 'Corner Deli',
    rating: 4.6,
    totalOrders: 15,
    lastOrder: '2024-01-14',
    category: 'Prepared Foods'
  }
];

const achievements = [
  {
    id: '1',
    title: 'First Rescue',
    description: 'Rescued your first meal',
    earned: true,
    icon: '🎉'
  },
  {
    id: '2',
    title: 'Eco Warrior',
    description: 'Rescued 25+ meals',
    earned: true,
    icon: '🌱'
  },
  {
    id: '3',
    title: 'Local Hero',
    description: 'Support 10+ local vendors',
    earned: false,
    icon: '🏆'
  },
  {
    id: '4',
    title: 'Waste Reducer',
    description: 'Prevented 50+ meals from waste',
    earned: false,
    icon: '♻️'
  }
];

export function ConsumerDashboard() {
  const getReservationStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="success">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'ready':
        return <Badge variant="default">Ready for Pickup</Badge>;
      default:
        return <Badge variant="gray">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track your food rescue journey and discover new opportunities to reduce waste.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/map">
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4" />
              Find Food
            </Button>
          </Link>
          <Link href="/dashboard/reservations">
            <Button size="sm">
              <Search className="h-4 w-4" />
              Browse Listings
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
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Grid cols={2} gap="lg">
            <AreaChart
              title="Your Rescue Journey"
              data={impactData}
              dataKey="meals"
              xAxisKey="month"
              color="#22c55e"
            />
            <DonutChart
              title="Meals by Category"
              data={categoryData}
            />
          </Grid>
          
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <Grid cols={4} gap="md">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`rounded-lg border p-4 text-center ${
                    achievement.earned ? 'border-primary-200 bg-primary-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <h3 className={`font-semibold ${
                      achievement.earned ? 'text-primary-900' : 'text-gray-500'
                    }`}>{achievement.title}</h3>
                    <p className={`text-xs mt-1 ${
                      achievement.earned ? 'text-primary-700' : 'text-gray-400'
                    }`}>{achievement.description}</p>
                  </div>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reservations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Reservations</CardTitle>
                <Link href="/map">
                  <Button size="sm">
                    <Plus className="h-4 w-4" />
                    Find More
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeReservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{reservation.itemName}</h3>
                        {getReservationStatusBadge(reservation.status)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{reservation.vendorName}</p>
                      <div className="mt-2 flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <ShoppingCart className="h-4 w-4" />
                          Qty: {reservation.quantity}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Pickup: {new Date(reservation.pickupTime).toLocaleTimeString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {reservation.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Cancel</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                        <Badge variant="outline">{vendor.category}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {vendor.rating}
                        </span>
                        <span>{vendor.totalOrders} orders</span>
                        <span>Last order: {new Date(vendor.lastOrder).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Menu</Button>
                      <Button size="sm">Order Again</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Grid cols={2} gap="lg">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CO2 Saved</span>
                    <span className="font-semibold">42.5 kg</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">75% towards next milestone</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Water Saved</span>
                    <span className="font-semibold">1,250 L</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">60% towards next milestone</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Waste Prevented</span>
                    <span className="font-semibold">18.2 kg</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">85% towards next milestone</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Meals to Rescue</span>
                  <span className="font-semibold">8 / 10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">New Vendors to Try</span>
                  <span className="font-semibold">2 / 3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reviews to Leave</span>
                  <span className="font-semibold">1 / 5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Friends to Invite</span>
                  <span className="font-semibold">0 / 2</span>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </TabsContent>
      </Tabs>
    </div>
  );
}

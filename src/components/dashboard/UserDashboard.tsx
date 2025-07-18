'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PostgrestError } from '@supabase/supabase-js'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Leaf, UtensilsCrossed } from 'lucide-react'

type Reservation = {
  id: string;
  listings: {
    name: string;
    pickup_window_start: string;
    pickup_window_end: string;
    profiles: {
      name: string;
    } | null;
  } | null;
  status: string;
}

type Profile = {
  meals_saved: number;
}

export default function UserDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: reservationsData, error: reservationsError } = await supabase
          .from('reservations')
          .select(`
            id,
            status,
            listings (
              name,
              pickup_window_start,
              pickup_window_end,
              profiles ( name )
            )
          `)
          .eq('consumer_id', user.id)
          .order('created_at', { ascending: false })

        if (reservationsError) {
          setError(reservationsError)
        } else {
          setReservations(reservationsData)
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('meals_saved')
          .eq('id', user.id)
          .single()

        if (profileError) {
          setError(profileError)
        } else {
          setProfile(profileData)
        }
      }
    }
    fetchData()
  }, [supabase])

  if (error) {
    return <Card><CardContent><p className="py-4 text-destructive">Error loading your data: {error.message}</p></CardContent></Card>
  }

  const mealsSaved = profile?.meals_saved ?? 0
  const co2Diverted = (mealsSaved * 2.5).toFixed(1)
  const nextBadgeLevel = 15
  const mealsToNextBadge = Math.max(0, nextBadgeLevel - mealsSaved)

  return (
    <div className="space-y-8">
      {/* Impact Stats Section */}
      <section>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meals Saved</CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mealsSaved}</div>
              <p className="text-xs text-muted-foreground">You're a hunger hero!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Diverted</CardTitle>
              <Leaf className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{co2Diverted} kg</div>
              <p className="text-xs text-muted-foreground">Saving the planet, one meal at a time.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Badge</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Community Champion</div>
              <p className="text-xs text-muted-foreground">
                {mealsToNextBadge > 0 ? `${mealsToNextBadge} more meals to unlock!` : "You've earned this badge!"}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reserved Items Section */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Your Reservations</CardTitle>
            <CardDescription>A list of your recent food reservations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="hidden sm:table-cell">Vendor</TableHead>
                    <TableHead className="hidden md:table-cell">Pickup Time</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.length > 0 ? (
                    reservations.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.listings?.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.listings?.profiles?.name}</TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                          {new Date(item.listings?.pickup_window_start || '').toLocaleDateString()}
                          {' '}-{' '}
                          {new Date(item.listings?.pickup_window_end || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.status === 'active' ? 'default' : 'secondary'
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        You have no reservations.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

'use client'

import { Button } from "@/components/ui/Button"
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
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { PostgrestError } from "@supabase/supabase-js"
import AddListingForm from "./AddListingForm"
import EditListingForm from "./EditListingForm"
import { PlusCircle, Package, PackageCheck, Trash2, FilePenLine } from "lucide-react"

type Listing = {
  id: string;
  name: string;
  quantity: number;
  status: 'available' | 'reserved' | 'collected';
}

const dummyListings = [
  { id: '1', name: 'Fresh Bread', quantity: 10, status: 'available' },
  { id: '2', name: 'Vegetable Soup', quantity: 5, status: 'reserved' },
];

export default function VendorDashboard() {
  const [listings, setListings] = useState<Listing[]>([])
  const [error, setError] = useState<PostgrestError | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingListing, setEditingListing] = useState<Listing | null>(null)
  const supabase = createClient()

  const fetchListings = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data, error } = await supabase
        .from('listings')
        .select('id, name, quantity, status')
        .eq('vendor_id', user.id)
        .order('created_at', { ascending: false })
      
      if (error) {
        setError(error)
      } else {
        setListings(data as Listing[])
      }
    }
  }

  useEffect(() => {
    fetchListings()
    // If no listings after fetch, show dummy data for demo
    setTimeout(() => {
      setListings((prev) => (prev.length === 0 ? dummyListings : prev))
    }, 1000)
  }, [])

  const handleSuccess = () => {
    setShowAddForm(false)
    setEditingListing(null)
    fetchListings()
  }

  const handleDelete = async (listingId: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      const { error } = await supabase.from('listings').delete().eq('id', listingId)
      if (error) {
        alert('Failed to delete item: ' + error.message)
      } else {
        fetchListings()
      }
    }
  }

  if (error) {
    return <Card><CardContent><p className="py-4 text-destructive">Error loading listings: {error.message}</p></CardContent></Card>
  }

  const availableCount = listings.filter(l => l.status === 'available').length;
  const reservedCount = listings.filter(l => l.status === 'reserved').length;

  return (
    <div className="space-y-8">
      {showAddForm && <AddListingForm onSuccess={handleSuccess} onCancel={() => setShowAddForm(false)} />}
      {editingListing && <EditListingForm listing={editingListing} onSuccess={handleSuccess} onCancel={() => setEditingListing(null)} />}

      {/* Stats Section */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{listings.length}</div>
            <p className="text-xs text-muted-foreground">Total items you've listed.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{availableCount}</div>
            <p className="text-xs text-muted-foreground">Items currently available for reservation.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved</CardTitle>
            <PackageCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{reservedCount}</div>
            <p className="text-xs text-muted-foreground">Items reserved for pickup.</p>
          </CardContent>
        </Card>
      </section>

      {/* Listings Table Section */}
      <section>
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Your Listings</CardTitle>
              <CardDescription>Manage your surplus food items here.</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Listing
            </Button>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Quantity</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.length > 0 ? (
                    listings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">{listing.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">{listing.quantity}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant={
                              listing.status === 'available' ? 'default' :
                              listing.status === 'reserved' ? 'secondary' :
                              'destructive'
                            }
                          >
                            {listing.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingListing(listing)}>
                              <FilePenLine className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(listing.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        No listings found. Add your first surplus item!
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

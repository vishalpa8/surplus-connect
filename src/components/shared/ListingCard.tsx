'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface ListingCardProps {
  title: string
  quantity: number
  status: 'available' | 'reserved' | 'collected'
  onReserve?: () => void
}

export default function ListingCard({ title, quantity, status, onReserve }: ListingCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Quantity: {quantity}</p>
        <Badge variant={status === 'available' ? 'default' : status === 'reserved' ? 'secondary' : 'outline'}>
          {status}
        </Badge>
        {status === 'available' && onReserve && (
          <button onClick={onReserve} className="w-full mt-4 bg-primary text-primary-foreground py-1 rounded">
            Reserve
          </button>
        )}
      </CardContent>
    </Card>
  )
}

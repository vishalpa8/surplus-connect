'use client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

const MapPage = () => {
  const Map = useMemo(() => dynamic(() => import('@/components/shared/Map'), { ssr: false }), [])

  return (
    // The parent container needs a defined height for the map to render.
    // vh-minus-nav = 100vh - height of navbar (approx 4rem or 64px)
    <div className="h-[calc(100vh-4rem)] w-full">
      <Map />
    </div>
  )
}

export default MapPage


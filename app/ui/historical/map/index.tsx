'use client';
import dynamic from "next/dynamic";


const Map = dynamic(
    () => import('@/app/ui/historical/map/map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
)

export default Map;

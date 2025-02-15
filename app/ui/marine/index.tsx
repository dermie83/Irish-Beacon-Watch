'use client';
import dynamic from "next/dynamic";


const LineGraph = dynamic(
    () => import('@/app/ui/marine/lineChart'),
    { 
      loading: () => <p>A chart is loading</p>,
      ssr: false
    }
)

  export default LineGraph;
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Page() {
  const Map = useMemo(() => dynamic(
    () => import('@/app/ui/home/map'),
    {
        loading: () => <p>A map is loading</p>
    }
), [])
    return (
        <>
            <div className="bg-white-700 mx-auto my-5 w-[70%] h-[70%]">
                <Map />
            </div>
        </>
    )
}
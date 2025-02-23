import { GiLighthouse } from "react-icons/gi";
import { lusitana } from '@/app/ui/fonts';

export default function BeaconLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-black`}
    >
      <p className="text-[40px]">Irish Beacon Watch <GiLighthouse className="h-16 w-16" /> </p>
      
    </div>
  );
}

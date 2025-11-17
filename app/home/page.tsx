import { fetchAllLighthouses } from "../lib/data";
import HomeClient from "@/app/home/HomeClient";

export default async function Page() {
  const lighthouses = await fetchAllLighthouses();

  return <HomeClient lighthouses={lighthouses} />;
}

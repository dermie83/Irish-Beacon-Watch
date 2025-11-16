import { db } from "@vercel/postgres";

const client = await db.connect();

async function listLighthousesWithCountries() {
  const data = await client.sql`
    SELECT 
      l.id,
      l.name,
      l.latitude,
      l.longitude,
      l.abovewater,
      l.towerheight,
      l.range_w,
      l.range_r,
      l.coast,
      l.constructed,
      l.currentdate,
      l.image_url,
      l.country_id,
      c.name AS country_name,
      c.latitude AS country_latitude,
      c.longitude AS country_longitude
    FROM lighthouse l
    LEFT JOIN country c ON l.country_id = c.id;
  `;

  return data.rows;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await listLighthousesWithCountries());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}

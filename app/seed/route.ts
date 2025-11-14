import { db } from '@vercel/postgres';
import { lighthouses } from '../lib/lighthouse-placeholder-data';
import { countries } from '../lib/countries-placeholder-data';

const client = await db.connect();

async function seedCountries(): Promise<{ id: string; name: string }[]> {
  await client.sql`DROP TABLE IF EXISTS country CASCADE`;

  await client.sql`
    CREATE TABLE country (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      latitude DOUBLE PRECISION NOT NULL,
      longitude DOUBLE PRECISION NOT NULL
    );
  `;

  const rows: { id: string; name: string }[] = [];

  for (const country of countries) {
    const result = await client.sql`
      INSERT INTO country (name, latitude, longitude)
      VALUES (${country.name}, ${country.latitude}, ${country.longitude})
      RETURNING id, name;
    `;
    rows.push(result.rows[0] as { id: string; name: string });
  }

  return rows;

}

async function seedLighthouses(countryRows: { id: string; name: string }[]) {
  await client.sql`DROP TABLE IF EXISTS lighthouse`;

  await client.sql`
    CREATE TABLE lighthouse (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      latitude DOUBLE PRECISION NOT NULL,
      longitude DOUBLE PRECISION NOT NULL,
      abovewater DOUBLE PRECISION NOT NULL,
      towerheight DOUBLE PRECISION NOT NULL,
      range_w DOUBLE PRECISION NOT NULL,
      range_r DOUBLE PRECISION NOT NULL,
      coast VARCHAR(255) NOT NULL,
      constructed DATE NOT NULL,
      currentdate DATE NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      country_id UUID REFERENCES country(id)
    );
  `;

  for (const lighthouse of lighthouses) {
    const country = countryRows.find(
      (row) => row.name === lighthouse.country
    );

    if (!country) {
      throw new Error(
        `Country '${lighthouse.country}' not found in countries seed`
      );
    }

    await client.sql`
      INSERT INTO lighthouse (
        name, latitude, longitude, abovewater, towerheight,
        range_w, range_r, coast, constructed, currentdate,
        image_url, country_id
      )
      VALUES (
        ${lighthouse.name},
        ${lighthouse.latitude},
        ${lighthouse.longitude},
        ${lighthouse.abovewater},
        ${lighthouse.towerheight},
        ${lighthouse.range_w},
        ${lighthouse.range_r},
        ${lighthouse.coast},
        ${lighthouse.constructed},
        ${lighthouse.currentdate},
        ${lighthouse.image_url},
        ${country.id}
      );
    `;
  }
}

export async function GET() {
  try {
    await client.sql`BEGIN`;

    const countryRows = await seedCountries();  // 1) insert countries
    await seedLighthouses(countryRows);         // 2) insert lighthouses with correct FK

    await client.sql`COMMIT`;

    return Response.json({ message: "Seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    const message = error instanceof Error ? error.message : String(error);
    return Response.json({ error: message }, { status: 500 });
  }
}




// async function seedLighthouse() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`DROP TABLE lighthouse`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS lighthouse (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       latitude float(10) NOT NULL,
//       longitude float(10) NOT NULL,
//       abovewater float(10) NOT NULL,
//       towerheight float(10) NOT NULL,
//       range_w float(10) NOT NULL,
//       range_r float(10) NOT NULL,
//       coast VARCHAR(255) NOT NULL,
//       constructed DATE NOT NULL,
//       currentdate DATE NOT NULL,
//       image_url VARCHAR(255) NOT NULL,
//       country_id UUID REFERENCES country(id)
//     );
//   `;

//   const insertedLighthouses = await Promise.all(
//     lighthouses.map(
//       (lighthouse) => client.sql`
//         INSERT INTO lighthouse (name, latitude, longitude, 
//                                 abovewater, towerheight, range_w, range_r, coast, 
//                                 constructed, currentdate, image_url)
//         VALUES (${lighthouse.name}, ${lighthouse.latitude}, ${lighthouse.longitude},
//                 ${lighthouse.abovewater}, ${lighthouse.towerheight}, ${lighthouse.range_w}, 
//                 ${lighthouse.range_r}, ${lighthouse.coast}, ${lighthouse.constructed}, 
//                 ${lighthouse.currentdate},${lighthouse.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedLighthouses;
// }

// async function seedCountries() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`DROP TABLE country`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS country (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       latitude float(10) NOT NULL,
//       longitude float(10) NOT NULL
//     );
//   `;

//   const insertedCountires = await Promise.all(
//     countries.map(
//       (countries) => client.sql`
//         INSERT INTO country (name, latitude, longitude)
//         VALUES ( ${countries.name}, ${countries.latitude}, ${countries.longitude} )
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCountires;
// }

// export async function GET() {
//   try {
//     await client.sql`BEGIN`;
//     await seedCountries();
//     await seedLighthouse();
//     await client.sql`COMMIT`;

//     return Response.json({ message: 'Database seeded successfully' });
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     return Response.json({ error }, { status: 500 });
//   }
// }

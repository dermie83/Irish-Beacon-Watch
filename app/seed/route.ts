import { db } from '@vercel/postgres';
import { lighthouses } from '../lib/placeholder-data';

const client = await db.connect();

async function seedLighthouse() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`DROP TABLE lighthouse`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS lighthouse (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      latitude float(10) NOT NULL,
      longitude float(10) NOT NULL,
      abovewater float(10) NOT NULL,
      towerheight float(10) NOT NULL,
      range_w float(10) NOT NULL,
      range_r float(10) NOT NULL,
      coast VARCHAR(255) NOT NULL,
      constructed DATE NOT NULL,
      currentdate DATE NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedLighthouses = await Promise.all(
    lighthouses.map(
      (lighthouse) => client.sql`
        INSERT INTO lighthouse (id, name, latitude, longitude, 
        abovewater, towerheight, range_w, range_r, coast, constructed, currentdate, image_url)
        VALUES (${lighthouse.id}, ${lighthouse.name}, ${lighthouse.latitude}, ${lighthouse.longitude},
                ${lighthouse.abovewater}, ${lighthouse.towerheight}, ${lighthouse.range_w}, 
                ${lighthouse.range_r}, ${lighthouse.coast}, ${lighthouse.constructed}, ${lighthouse.currentdate},${lighthouse.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedLighthouses;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedLighthouse();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}

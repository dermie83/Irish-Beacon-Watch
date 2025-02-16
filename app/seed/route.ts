import { db } from '@vercel/postgres';
import { lighthouses } from '../lib/placeholder-data';

const client = await db.connect();

async function seedLighthouse() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // await client.sql`DROP TABLE lighthouse`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS lighthouse (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      latitude float(10) NOT NULL,
      longitude float(10) NOT NULL,
      towerHeight float(10) NOT NULL,
      lightHeight float(10) NOT NULL,
      range float(10) NOT NULL,
      greatLighthouse boolean
    );
  `;
  // await client.sql`
  //   ALTER TABLE lighthouse
  //     ADD towerHeight float(10) NOT NULL,
  //     ADD lightHeight float(10) NOT NULL,
  //     ADD range float(10) NOT NULL,
  //     ADD greatLighthouse boolean`
  // ;

  const insertedLighthouses = await Promise.all(
    lighthouses.map(
      (lighthouse) => client.sql`
        INSERT INTO lighthouse (id, name, latitude, longitude, 
        towerHeight, lightHeight, range, greatLighthouse)
        VALUES (${lighthouse.id}, ${lighthouse.name}, ${lighthouse.latitude}, ${lighthouse.longitude},
                ${lighthouse.towerHeight}, ${lighthouse.lightHeight}, ${lighthouse.range}, ${lighthouse.greatLighthouse})
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

import { db } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
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
      abovewater float(10) NOT NULL,
      towerheight float(10) NOT NULL,
      range float(10) NOT NULL,
      greatlighthouse boolean,
      constructed DATE NOT NULL,
      currentdate DATE NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;
  
//   const insertedLighthouses = await Promise.all(
//     lighthouses.map(async (lighthouse) => {
//       try{
//         const imagePath = path.join(process.cwd(), lighthouse.image_url);
//         console.log("imagePath....",imagePath);
//         const imageBuffer = fs.readFileSync(imagePath);
//         console.log("imageBuffer....",imageBuffer);
//         const imageData = Buffer.from(imageBuffer);
//         console.log("imageData....",imageData);
//         return client.sql`
//           INSERT INTO lighthouse (id, name, latitude, longitude, 
//                                   abovewater, towerheight, range, 
//                                   greatlighthouse, constructed, 
//                                   currentdate, image_url)
//           VALUES (${lighthouse.id}, ${lighthouse.name}, ${lighthouse.latitude}, ${lighthouse.longitude},
//             ${lighthouse.abovewater}, ${lighthouse.towerheight}, ${lighthouse.range}, 
//             ${lighthouse.greatlighthouse}, ${lighthouse.constructed}, ${lighthouse.currentdate}, ${lighthouse.image_url})
//           ON CONFLICT (id) DO NOTHING;
//         `;
//       } catch (error) {
//         console.error("Error fetching or inserting image:", error);
//         return client.sql`
//           INSERT INTO lighthouse (id, name, latitude, longitude, 
//                                    abovewater, towerheight, range, 
//                                    greatlighthouse, constructed, 
//                                    currentdate, image_url)
//           VALUES (${lighthouse.id}, ${lighthouse.name}, ${lighthouse.latitude}, ${lighthouse.longitude},
//             ${lighthouse.abovewater}, ${lighthouse.towerheight}, ${lighthouse.range}, 
//             ${lighthouse.greatlighthouse}, ${lighthouse.constructed}, ${lighthouse.currentdate}, null)
//           ON CONFLICT (id) DO NOTHING;
//         `;

//       }
//     }),
//   );

//   return insertedLighthouses;
// }

  const insertedLighthouses = await Promise.all(
    lighthouses.map(
      (lighthouse) => client.sql`
        INSERT INTO lighthouse (id, name, latitude, longitude, 
        abovewater, towerheight, range, greatlighthouse, constructed, currentdate, image_url)
        VALUES (${lighthouse.id}, ${lighthouse.name}, ${lighthouse.latitude}, ${lighthouse.longitude},
                ${lighthouse.abovewater}, ${lighthouse.towerheight}, ${lighthouse.range}, 
                ${lighthouse.greatlighthouse}, ${lighthouse.constructed}, ${lighthouse.currentdate},${lighthouse.image_url})
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

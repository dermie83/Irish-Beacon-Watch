import { db } from "@vercel/postgres";

const client = await db.connect();

async function listLighthouses() {
	const data = await client.sql`
    SELECT *
    FROM lighthouse;
  `;

	return data.rows;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await listLighthouses());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}

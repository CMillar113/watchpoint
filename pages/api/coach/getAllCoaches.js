/**
 * All Coaches for selecting- active coaches
 *
 */ import executeQuery from "../../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await getCoaches();
    res.status(200).json(response);
  } else {
    console.log(error);
  }
}

async function getCoaches(c) {
  const sql = `
      SELECT coach.coach_id, coach.is_active, coach.brand_name, coach.coach_img_url, coach.first_name, coach.surname, coach.email_address
      FROM coach WHERE coach.is_active = 1 ORDER By coach.brand_name ASC
      `;
  const coachInfo = await executeQuery({
    query: sql,
  });
  console.log(coachInfo);
  return coachInfo;
}

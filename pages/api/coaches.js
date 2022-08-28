/**
 * Calls coach information - not relationships between coach and athlete,
 * only the coach display information, so only active coaches
 */

import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method === "GET") {
    const queryParams = req.query;
    const { coachId } = queryParams;
    const metrics = await getCoaches(coachId);
    console.log(metrics);
    res.status(200).json(metrics);
  } else {
    console.log(error);
  }
}

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getCoaches(coachId) {
  const sql = `
SELECT coach.is_active, coach.brand_name, coach.coach_img_url, coach.first_name, coach.surname, coach.email_address
FROM coach WHERE coach.coach_id = ?; 
`;
  const coaches = await executeQuery({ query: sql, values: coachId });
  console.log(coaches);
  return coaches[0];
}

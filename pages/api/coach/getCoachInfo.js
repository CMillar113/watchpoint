/**
 * get specific coach info for connect user - used on mycoach
 *
 */ import executeQuery from "../../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  const queryParams = req.query;
  const { coachId } = queryParams;
  console.log("recieved", coachId);

  if (req.method === "GET") {
    const response = await getCoachInfo(coachId);
    res.status(200).json(response);
  } else {
    console.log(error);
  }
}

async function getCoachInfo(coachId) {
  const sql = `
    SELECT coach.is_active, coach.brand_name, coach.coach_img_url, coach.first_name, coach.surname, coach.email_address
    FROM coach WHERE coach.coach_id = ?; 
    `;

  const coachInfo = await executeQuery({
    query: sql,
    values: coachId,
  });
  console.log(coachInfo);
  return coachInfo[0];
}

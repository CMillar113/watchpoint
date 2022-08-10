import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method === "GET") {
    const metrics = await getAthleteToCoach();
    res.status(200).json(metrics);
  } else {
    console.log(error);
  }
}

const sql = `
SELECT coach_athlete.athlete_id, coach_athlete.coach_id, coach_athlete.checked_in,coach_athlete.coach_notes 
FROM coach_athlete
  
`;

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getAthleteToCoach() {
  const relationship = await executeQuery({ query: sql });
  console.log(relationship);
  return relationship;
}
// , values: [1] WHERE athlete_id = ?;

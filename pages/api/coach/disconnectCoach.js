/**
 * Disconnect coach from specified user
 *
 */

import executeQuery from "../../../lib/db";
import { getUserDetails } from "./userDetails";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }
  console.log({ req });

  const queryParams = req.query;
  const { athlete0Id, coachId } = queryParams;
  console.log("recieved", athlete0Id, coachId);

  const athlete = await getUserDetails(athlete0Id);

  if (!athlete) {
    res.status(401).json({ message: "Unauthorised" });
  }
  const athleteId = athlete[0].athlete_id; // auth0Id to sql ID

  const log = await removeCoach(athleteId, coachId);
  res.status(202).json(log);
}

async function removeCoach(coachId, athleteId) {
  const sql = `
     DELETE FROM coach_athlete WHERE coach_athlete.coach_id IS ?
      AND coach_athlete.athlete_id= ?
       `;
  const result = await executeQuery({
    query: sql,
    values: [coachId, athleteId],
  });
  return result;
}

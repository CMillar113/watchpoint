/**
 * calls for information between coach and athlete - if they are connected  or not
 *
 */

import executeQuery from "../../lib/db";
import { getUserDetails } from "./userDetails";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const queryParams = req.query;
    const { athlete0Id } = queryParams;

    const athlete = await getUserDetails(athlete0Id);

    if (!athlete) {
      res.status(401).json({ message: "Unauthorised" });
    }
    const athleteId = athlete[0].athlete_id;

    const metrics = await getAthleteToCoach(athleteId);
    res.status(200).json(metrics);
  } else {
    console.log(error);
  }
}

async function getAthleteToCoach(athleteId) {
  const sql = `
  SELECT coach_id, checked_in, coach_notes 
  FROM coach_athlete WHERE athlete_id = ?
  `;

  const relationship = await executeQuery({ query: sql, values: athleteId });

  return relationship;
}

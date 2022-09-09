/**
 * connect client to coach if code is correct used from coachprofile page
 * `/api/coach/createCoachConnection?coachId=${coachId}&connectionCode=${connectionCode}&athlete0Id=${user.sub}`
 */

import executeQuery from "../../../lib/db";
import { getUserDetails } from "../userDetails";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }
  console.log({ req });

  const queryParams = req.query;
  const { athlete0Id, coachId, connectionCode } = queryParams;
  console.log("recieved", athlete0Id, coachId, connectionCode);

  const athlete = await getUserDetails(athlete0Id);

  if (!athlete) {
    res.status(401).json({ message: "Unauthorised" });
  }
  const athleteId = athlete[0].athlete_id; // auth0Id to sql ID

  if (await checkCode(coachId, connectionCode)) {
    const log = await createLink(athleteId, coachId);
    res.status(202).json(log);
  } else {
    console.log("Incorrect Code");
  }
}

async function checkCode(coachId, connectionCode) {
  const sql = `
   SELECT COUNT(*) FROM coach
   WHERE coach_id = ? AND connection_Code = ?
        `;
  const result = await executeQuery({
    query: sql,
    values: [coachId, connectionCode],
  });
  console.log({ result });
  console.log({ count: result[0]["COUNT(*)"] });

  if (result[0]["COUNT(*)"] === 0) {
    return false;
  } else {
    return true;
  }
}

async function createLink(athleteId, coachId) {
  const sql = `
    INSERT INTO coach_athlete (coach_athlete_id, coach_id, athlete_id, checked_in, coach_notes) 
    VALUES (NULL, ?, ?, '0', NULL);
          `;
  const result = await executeQuery({
    query: sql,
    values: [coachId, athleteId],
  });
  console.log({ result });
  return result;
}

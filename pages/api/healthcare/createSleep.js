/**
 * check, create or update log for steps
 */

import executeQuery from "../../../lib/db";
import { getUserDetails } from "../userDetails";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }

  console.log({ req });

  const queryParams = req.query;
  const { id, sleep, date } = queryParams;

  const athlete = await getUserDetails(id); //retrieve sql base ID from auth0 base ID

  if (!athlete) {
    res.status(401).json({ message: "Unauthorised" });
  }

  const athleteId = athlete[0].athlete_id; // athleteId is now sql based

  //    Get log by date and log_group
  if (await checkIfLogAlreadyExist(athleteId, 9, date)) {
    // if log for the log group (ie steps) already exists for the given date, update
    const log = await updateLog(athleteId, date, sleep, 9);
    res.status(202).json(log);
  } else {
    // insert
    const log = await createLog(athleteId, 9, date, sleep);
    res.status(201).json(log);
  }
}

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function createLog(athleteId, elementId, date, log) {
  const sql = `
  INSERT INTO healthcare_log (healtchcare_log_id, athlete_id, element_id, date, log_value) 
  VALUES (NULL, ?, '?', ?, ?);
  `;

  const result = await executeQuery({
    query: sql,
    values: [athleteId, elementId, date, log],
  });
  // talk to database get metrics for a given userID
  return result;
}

async function updateLog(athleteId, date, log, elementId) {
  const sql = `
  UPDATE healthcare_log SET log_value = ? WHERE athlete_id = ?  AND date =? AND element_id = ?
  `;

  const result = await executeQuery({
    query: sql,
    values: [log, athleteId, date, elementId],
  });
  // talk to database get metrics for a given userID
  return result;
}

async function checkIfLogAlreadyExist(athleteId, elementId, date) {
  const sql = `
     SELECT COUNT(*) FROM healthcare_log
     WHERE healthcare_log.athlete_ID = ?
     AND healthcare_log.element_id = ?
     AND healthcare_log.date = ?
  `;
  const result = await executeQuery({
    query: sql,
    values: [athleteId, elementId, date],
    ///// TODO - fill in these values depending on hte structure of the query
  });

  if (result[0]["COUNT(*)"] === 0) {
    return false;
  } else {
    return true;
  }
}

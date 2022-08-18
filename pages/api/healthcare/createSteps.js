/**
 * Creates user using auth0 info in sql
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
  const { id, steps, date } = queryParams;

  const athlete = await getUserDetails(id);

  if (!athlete) {
    res.status(401).json({ message: "Unauthorised" });
  }

  const athleteId = athlete[0].athlete_id;

  //    Get log by date and log_group
  if (await checkIfLogAlreadyExist(athleteId, date, steps)) {
    // if log for the log group (ie steps) already exists for the given date, update
    const log = await updateLog(athleteId, date, steps, 8);
    res.status(202).json(log);
  } else {
    // insert
    const log = await createLog(athleteId, date, steps, 8);
    res.status(201).json(log);
  }
}

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function createLog(athleteId, date, log, elementId) {
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
     UPDATE STATEMENT
  `;

  const result = await executeQuery({
    query: sql,
    values: [athleteId, date, log],
  });
  // talk to database get metrics for a given userID
  return result;
}

async function checkIfLogAlreadyExist(athleteId, date, elementId) {
  return false;

  const sql = `
     SELECT COUNT(*) FROM TABLE
     WHERE athlete.athlete_ID = ?
     AND element_id = ?
     AND date = ?
  `;

  // TODO - fix query

  const result = await executeQuery({
    query: sql,
    values: [],
    // TODO - fill in these values depending on hte structure of the query
  });
  // talk to database get metrics for a given userID

  // look at the result object to see if the count is greater than 0
  // if it's greater than zero, isAlreadyThere should be true
}

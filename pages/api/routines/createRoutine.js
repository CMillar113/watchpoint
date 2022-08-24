/**
 * create routine in routine table
 * create new record in athlete_element_routine table (links routine to element to athlete)
 *
 */

import executeQuery from "../../../lib/db";
import { getUserDetails } from "../userDetails";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }
  console.log({ req });

  const queryParams = req.query;
  const { id, routineName, routineNote, elementid } = queryParams;
  console.log("recieved", id, routineName, routineNote);

  //get athlete_id(sql base) fron auth0id (received id)
  const athlete = await getUserDetails(id);

  if (!athlete) {
    res.status(401).json({ message: "Unauthorised" });
  }

  const athleteId = athlete[0].athlete_id; // athleteId is now sql based

  console.log(athleteId);
  const log = await createRoutine(routineName, routineNote); //populate routine table
  const logID = await getLastEntery(); // get routine_id
  const log2 = await createRoutineAthleteElementConnection(
    athleteId,
    elementid,
    logID
  ); // populate athlete_element_routine tbale
  const log3 = await createRoutineExerciseConnection(logID); // populate
  res.status(202).json(log);
  res.status(202).json(logID);
  res.status(202).json(log2);
  res.status(202).json(log3);
}

async function createRoutine(routineName, routineNote) {
  const sql = `
  INSERT INTO routine(routine_id, routine_name, routine_note) 
  VALUES (NULL, ?, ?);
    `;
  const result = await executeQuery({
    query: sql,
    values: [routineName, routineNote],
  });
  return result;
}

async function getLastEntery() {
  const sql = `
    SELECT routine_id FROM routine
  ORDER BY routine_id DESC
  LIMIT 1;
     `;
  const result = await executeQuery({
    query: sql,
  });
  console.log("last entery", result[0].routine_id);
  const logID = result[0].routine_id;
  return logID;
}

async function createRoutineAthleteElementConnection(
  athleteId,
  elementid,
  logID
) {
  const sql = `
  INSERT INTO athlete_element_routine (athlete_element_routine_id, athlete_id, element_id, routine_id) 
  VALUES (NULL, ?, ?, ?);
      `;

  const result = await executeQuery({
    query: sql,
    values: [athleteId, elementid, logID],
  });
  return result;
}

async function createRoutineExerciseConnection(logID) {
  const sql = `
  INSERT INTO routine_exercise (routine_exercise_id, routine_id, exercise_id, planned_sets, planned_reps) 
  VALUES (NULL, ?, NULL, '0', '0');
        `;

  const result = await executeQuery({
    query: sql,
    values: [logID],
  });
  return result;
}

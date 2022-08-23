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
  const { id, elementID, goalValue } = queryParams;
  console.log("element", elementID);

  const athlete = await getUserDetails(id); //retrieve sql base ID from auth0 base ID
  console.log(athlete);

  if (!athlete) {
    res.status(401).json({ message: "Unauthorised" });
  }

  const athlete_id = athlete[0].athlete_id; // athleteId is now sql based

  //check if record exists  for athlete_id element_id and exist or update correct element goal inr espect

  if (await checkIfLogAlreadyExist(athlete_id, elementID)) {
    //Exists therefore update
    const log = await updateWorkout(athlete_id, elementID, goalValue);
    res.status(202).json(log);
  } else {
    // dosnt exist therefore INSERT
    const log = await insertWorkout(athlete_id, elementID, goalValue);
    res.status(202).json(log);
  }
}

async function updateWorkout(athlete_id, elementID, goalValue) {
  const sql = `
    UPDATE athlete_workout_goals SET workouts_per_week = ? WHERE athlete_id = ? AND element_id = ?,
    `;
  const result = await executeQuery({
    query: sql,
    values: [goalValue, athlete_id, elementID],
  });
  return result;
}

async function insertWorkout(athlete_id, elementID, goalValue) {
  const sql = `
  INSERT INTO athlete_workout_goals (athlete_workout_goals_id, athlete_id, element_id, workouts_per_week) 
  VALUES (NULL, ?, ?, ?);
      `;

  const result = await executeQuery({
    query: sql,
    values: [athlete_id, elementID, goalValue],
  });

  return result;
}

async function checkIfLogAlreadyExist(athleteId, elementId) {
  const sql = `
       SELECT COUNT(*) FROM athlete_workout_goals
       WHERE athlete_workout_goals.athlete_ID = ?
       AND athlete_workout_goals.element_id = ?
    `;
  const result = await executeQuery({
    query: sql,
    values: [athleteId, elementId],
    ///// TODO - fill in these values depending on hte structure of the query
  });
  if (result[0]["COUNT(*)"] === 0) {
    return false;
  } else {
    return true;
  }
}

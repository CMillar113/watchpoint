/**
 * create exercise in exercise table
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
  const { exerciseCategoryid, exerciseName, athlete0Id } = queryParams;
  console.log("recieved", exerciseCategoryid, exerciseName, athlete0Id);

  const athlete = await getUserDetails(athlete0Id); //retrieve sql base ID from auth0 base ID
  console.log(athlete);

  if (!athlete) {
    res.status(401).json({ message: "Unauthorised" });
  }

  const athleteId = athlete[0].athlete_id; // athleteId is now sql based

  const log = await createExercise(exerciseCategoryid, exerciseName, athleteId); //populate routine table
  res.status(202).json(log);
}

async function createExercise(exerciseCategoryid, exerciseName, athleteId) {
  const sql = `
   INSERT INTO exercise(exercise_id, exercise_name, exercise_category_id, athlete_id) 
   VALUES (NULL, ?, ?, ?);
     `;
  const result = await executeQuery({
    query: sql,
    values: [exerciseName, exerciseCategoryid, athleteId],
  });
  return result;
}

/**
 * update routine_exercise table to assign sets and reps to that exercise
 * as routine_id and exercise_id are not primary keys it allows for
 * exercise 1 in routine A - 3 sets of 4 reps
 * exercise 1 in routine A - 1 set of 30 reps
 *
 */

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }
  console.log({ req });

  const queryParams = req.query;
  console.log(queryParams);
  const { routineExerciseId, sets, reps } = queryParams;
  console.log("recieved", routineExerciseId);

  const log = await updateSetsReps(routineExerciseId, sets, reps); //exercise and routine will already exist

  res.status(202).json(log);
}

async function updateSetsReps(routineExerciseId, sets, reps) {
  const sql = `
   UPDATE routine_exercise SET planned_sets = ?, planned_reps = ? WHERE routine_exercise.routine_exercise_id = ?;
     `;
  const result = await executeQuery({
    query: sql,
    values: [sets, reps, routineExerciseId],
  });
  return result;
}

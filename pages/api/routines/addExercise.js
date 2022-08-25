/**
 * add exercise to routine
 *
 */

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }
  console.log({ req });

  const queryParams = req.query;
  const { routineId, exerciseId } = queryParams;
  console.log("recieved", routineId, exerciseId);

  const clear = await clearNullExercises(routineId);
  const log = await addExerciseToRoutine(exerciseId, routineId); //populate routine table
  res.status(202).json(clear);
  res.status(202).json(log);
}

async function clearNullExercises(routineId) {
  const sql = `
    DELETE FROM routine_exercise WHERE routine_exercise.exercise_id IS null
     AND routine_exercise.routine_id = ?
      `;
  const result = await executeQuery({
    query: sql,
    values: [routineId],
  });
  return result;
}
async function addExerciseToRoutine(exerciseId, routineId) {
  const sql = `
   INSERT INTO routine_exercise (routine_exercise_id, routine_id, exercise_id, planned_sets, planned_reps)
    VALUES (NULL, ?, ?, '0', '0');
      `;
  const result = await executeQuery({
    query: sql,
    values: [routineId, exerciseId],
  });
  return result;
}

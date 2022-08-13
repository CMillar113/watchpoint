/**
 * Get the exercises associated with a routine and their sets
 *
 */

import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method === "GET") {
    const metrics = await getRoutinesExercises();
    res.status(200).json(metrics);
  } else {
    console.log(error);
  }
}

const sql = `SELECT routine_exercise.routine_exercise_id, routine_exercise.routine_id, routine_exercise.exercise_id, exercise.exercise_name, routine.routine_name, routine.routine_note, athlete_routine_exercise.sets
FROM routine_exercise 
INNER JOIN exercise on routine_exercise.exercise_id = exercise.exercise_id
INNER JOIN routine on routine_exercise.routine_id = routine.routine_id
INNER JOIN athlete_routine_exercise on athlete_routine_exercise.routine_id = routine.routine_id `;

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getRoutinesExercises() {
  const exercises = await executeQuery({ query: sql });
  console.log("hello");
  console.log(exercises);
  return exercises;
}

/**
 * Get the exercises associated with a routine and their sets
 *
 */

import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const routineId = req.query.routine_id;

      const log = await checkExercisesExist(routineId);
      console.log("check", log);
      if (log === true) {
        const exercises = await getRoutinesExercises(routineId);

        const name = exercises[0].routine_name;
        const notes = exercises[0].routine_note;

        res.status(200).json({
          exercises,
          name,
          notes,
        });
      } else if (log !== true) {
        const routineInfo = await getRoutinesEmpty(routineId);

        const name = routineInfo[0].routine_name;
        const notes = routineInfo[0].routine_note;

        res.status(200).json({
          name,
          notes,
        });
      }
    } else {
      console.log(error);
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Couldn't find routine",
    });
  }
}

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getRoutinesExercises(routineId) {
  const sql = `SELECT routine_exercise.routine_exercise_id, routine_exercise.planned_sets, routine_exercise.planned_reps, routine_exercise.routine_id, routine_exercise.exercise_id, exercise.exercise_name, routine.routine_name, routine.routine_note
FROM routine_exercise 
INNER JOIN exercise on routine_exercise.exercise_id = exercise.exercise_id
INNER JOIN routine on routine_exercise.routine_id = routine.routine_id
WHERE routine.routine_id = ?;
`;
  const exercises = await executeQuery({ query: sql, values: [routineId] });
  console.log(exercises);
  return exercises;
}

async function checkExercisesExist(routineId) {
  //Check if routine has any exercises currently in it
  const sql = `SELECT COUNT(*) FROM routine_exercise
  WHERE routine_exercise.routine_id = ? AND routine_exercise.exercise_id 
`;
  const result = await executeQuery({
    query: sql,
    values: [routineId],
    ///// TODO - fill in these values depending on hte structure of the query
  });
  console.log({ result });
  console.log({ count: result[0]["COUNT(*)"] });

  if (result[0]["COUNT(*)"] === 0) {
    return false;
  } else {
    return true;
  }
}

async function getRoutinesEmpty(routineId) {
  const sql = `SELECT routine_exercise.routine_exercise_id, routine_exercise.routine_id,  routine.routine_name, routine.routine_note
FROM routine_exercise 
INNER JOIN routine on routine_exercise.routine_id = routine.routine_id
WHERE routine.routine_id = ?;
`;
  const routine = await executeQuery({ query: sql, values: [routineId] });
  console.log(routine);
  return routine;
}

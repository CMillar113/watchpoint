/**
 * Get last routine_exercise_id added for that routine - incase two people run progrma at exact same time
 *
 */ import executeQuery from "../../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  const queryParams = req.query;
  const { routineId } = queryParams;
  console.log("recieved", routineId);

  if (req.method === "GET") {
    const response = await getRoutineExerciseId(routineId);
    res.status(200).json(response);
  } else {
    console.log(error);
  }
}

// get last entery routine_exercise_id for that routine and therefore custom to that user
async function getRoutineExerciseId(routineId) {
  const sql = `
  SELECT routine_exercise_id FROM routine_exercise WHERE routine_id = ?
  ORDER BY routine_exercise_id DESC
  LIMIT 1
  `;

  const routineExerciseId = await executeQuery({
    query: sql,
    values: [routineId],
  });
  console.log(routineExerciseId);
  return routineExerciseId;
}

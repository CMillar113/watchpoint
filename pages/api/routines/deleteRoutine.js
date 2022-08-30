/**
 *Delete Routine from database
 *
 */ import executeQuery from "../../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  const queryParams = req.query;
  const { routineId } = queryParams;
  console.log("recieved", routineId);

  if (req.method === "DELETE") {
    const response = await deleteRoutine(routineId);

    res.status(200).json(response);
  } else {
    console.log(error);
  }
}

// get last entery routine_exercise_id for that routine and therefore custom to that user
async function deleteRoutine(routineId) {
  const sql = `
    DELETE FROM routine WHERE routine.routine_id = ?;
    `;

  const routineExerciseId = await executeQuery({
    query: sql,
    values: [routineId],
  });
  console.log(routineExerciseId);
  return routineExerciseId;
}

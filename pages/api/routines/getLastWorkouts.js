/**
 * Get last exercise routines logged by user in workout_logged table filter for timeperiod of one month from current date
 *
 */

import executeQuery from "../../../lib/db";
import { getUserDetails } from "../userDetails";

export default async function handler(req, res) {
  const queryParams = req.query;
  const { athlete0Id, workoutId, today, backDate } = queryParams;
  console.log("recieved", athlete0Id, workoutId, today, backDate);

  const athlete = await getUserDetails(athlete0Id);

  if (!athlete) {
    res.status(401).json({ message: "Unauthorised" });
  }

  const athleteId = athlete[0].athlete_id; // athleteId is now sql based

  if (req.method === "GET") {
    const response = await getMonthOfRoutineExerciseId(
      athleteId,
      workoutId,
      today,
      backDate
    );
    res.status(200).json(response);
  } else {
    console.log(error);
  }
}

// get last entery routine_exercise_id for that routine and therefore custom to that user
async function getMonthOfRoutineExerciseId(
  athleteId,
  workoutId,
  today,
  backDate
) {
  // Gives all routines that have been logged as a workout this past month
  const sql = `
  SELECT DISTINCT routine.routine_id, routine.routine_name, workout_logged.date FROM workout_logged 
  INNER JOIN routine_exercise ON workout_logged.routine_exercise_id = routine_exercise.routine_exercise_id
  INNER JOIN routine ON routine_exercise.routine_id = routine.routine_id
  INNER JOIN athlete_element_routine ON routine.routine_id = athlete_element_routine.routine_id 
  WHERE athlete_element_routine.athlete_id = ?
  AND athlete_element_routine.element_id = ?
   AND workout_logged.date 
   BETWEEN ? AND ? ORDER BY workout_logged.date DESC
    `;

  const routineExerciseId = await executeQuery({
    query: sql,
    values: [athleteId, workoutId, backDate, today],
  });
  console.log(routineExerciseId);
  return routineExerciseId;
}

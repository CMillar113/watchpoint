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
      today,
      backDate
    );
    res.status(200).json(response);
  } else {
    console.log(error);
  }
}

// get last entery routine_exercise_id for that routine and therefore custom to that user
async function getMonthOfRoutineExerciseId(athleteId, today, backDate) {
  // Gives all routines that have been logged as a workout this past month
  const sql = `
  SELECT DISTINCT routine.routine_id FROM workout_logged 
  INNER JOIN routine_exercise ON workout_logged.routine_exercise_id = routine_exercise.routine_exercise_id
  INNER JOIN routine ON routine_exercise.routine_id = routine.routine_id
  INNER JOIN athlete_element_routine ON routine.routine_id = athlete_element_routine.routine_id 
  WHERE athlete_element_routine.athlete_id = ? AND workout_logged.date BETWEEN ? AND ?
    `;

  const routineExerciseId = await executeQuery({
    query: sql,
    values: [athleteId, backDate, today],
  });
  console.log(routineExerciseId);
  return routineExerciseId;
}

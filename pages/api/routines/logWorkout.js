/**
 * add wokrout to workout_logged database
 *
 */

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }
  console.log({ req });

  const queryParams = req.query;
  const { routineExerciseId, date, log } = queryParams;
  console.log("recieved", date);
  console.log("recieved", routineExerciseId, log);

  //   exercises.forEach((exercise) => {
  //     const routineExerciseId = exercise.routine_exercise_id;
  //     const log = exercise.weight;

  if (await checkIfEnteryExists(routineExerciseId)) {
    //update
    const update = await updateWorkoutTrackingElements(
      routineExerciseId,
      date,
      log
    );
    res.status(202).json(update);
  } else {
    //create
    const logged = await insertWorkoutTrackingElements(
      routineExerciseId,
      date,
      log
    );

    res.status(202).json(logged);
  }
  //   });
}

async function checkIfEnteryExists(routineExerciseId) {
  // will reduce size if only one entery per routine exercise id
  const sql = `
           SELECT COUNT(*) FROM workout_logged
           WHERE workout_logged.routine_exercise_id = ?
        `;
  const result = await executeQuery({
    query: sql,
    values: [routineExerciseId],
  });
  if (result[0]["COUNT(*)"] === 0) {
    return false;
  } else {
    return true;
  }
}

async function insertWorkoutTrackingElements(routineExerciseId, date, log) {
  const sql = `
  INSERT INTO workout_logged (wokrout_logged_id, routine_exercise_id, date, weight) 
  VALUES (NULL, ?, ?, ?);  `;
  const result = await executeQuery({
    query: sql,
    values: [routineExerciseId, date, log],
  });
  return result;
}

async function updateWorkoutTrackingElements(routineExerciseId, date, log) {
  const sql = `
  UPDATE workout_logged SET workout_logged.weight = ? WHERE workout_logged.routine_exercise_id = ? AND workout_logged.date = ?
       `;
  const result = await executeQuery({
    query: sql,
    values: [log, routineExerciseId, date],
  });
  return result;
}

/**
 * create exercise in exercise table
 *
 */

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }
  console.log({ req });

  const queryParams = req.query;
  const { exerciseCategoryid, exerciseName } = queryParams;
  console.log("recieved", exerciseCategoryid, exerciseName);

  const log = await createExercise(exerciseCategoryid, exerciseName); //populate routine table
  res.status(202).json(log);
}

async function createExercise(exerciseCategoryid, exerciseName) {
  const sql = `
   INSERT INTO exercise(exercise_id, exercise_name, exercise_category_id) 
   VALUES (NULL, ?, ?);
     `;
  const result = await executeQuery({
    query: sql,
    values: [exerciseName, exerciseCategoryid],
  });
  return result;
}

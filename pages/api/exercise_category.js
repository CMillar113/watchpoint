/**
 * Get the exercises associated with a specifc category
 *
 */

import executeQuery from "../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const categoryId = req.query.exerciseCategoryId;

      const exercises = await getCategoryExercises(categoryId);

      res.status(200).json({
        exercises,
      });
    } else {
      console.log(error);
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Couldn't find category details",
    });
  }
}

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getCategoryExercises(categoryId) {
  const sql = `SELECT exercise_name FROM exercise WHERE exercise_category_id = ?
 `;
  const exercises = await executeQuery({ query: sql, values: categoryId });
  console.log(exercises);
  return exercises;
}

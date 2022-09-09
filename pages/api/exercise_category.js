/**
 * Get the exercises associated with a specifc category for a specific user
 *
 */

import executeQuery from "../../lib/db";
import { getUserDetails } from "./userDetails";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const queryParams = req.query;
      const { exerciseCategoryId, athlete0Id } = queryParams;

      const athlete = await getUserDetails(athlete0Id);

      if (!athlete) {
        res.status(401).json({ message: "Unauthorised" });
      }
      const athleteId = athlete[0].athlete_id;

      const exercises = await getCategoryExercises(
        exerciseCategoryId,
        athleteId
      );

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

async function getCategoryExercises(categoryId, athleteId) {
  const sql = `SELECT exercise_name, exercise_id FROM exercise WHERE exercise_category_id = ? AND exercise.athlete_id = ?
 `;
  const exercises = await executeQuery({
    query: sql,
    values: [categoryId, athleteId],
  });
  console.log(exercises);
  return exercises;
}

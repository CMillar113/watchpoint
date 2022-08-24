/**
 * Get the exercises associated with an element - pass element and exercise category
 *
 */

import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const classId = req.query.classid;
      const categoryNames = await getCategories(classId);
      console.log(categoryNames);

      res.status(200).json({ categoryNames });
    } else {
      console.log(error);
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Couldn't find exercise ategories",
    });
  }
}

const sql = `SELECT * FROM exercise_category WHERE workout_class_id = ?
 `;

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getCategories(classId) {
  const exercises = await executeQuery({ query: sql, values: classId });
  console.log(exercises);
  return exercises;
}

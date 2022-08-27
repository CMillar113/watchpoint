/**
 * Get the exercise categories associated with an element - pass element and exercise category
 *
 */

import executeQuery from "../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const elementId = req.query.workoutId;
      const classId = await getClassId(elementId);
      console.log("passing", classId);
      //Add in the above function to make it scalable and responsive to the elements selected
      //also keeps front end dumber

      const categoryNames = await getCategories(classId[0].workout_class_id);
      console.log(categoryNames);

      res.status(200).json({ categoryNames });
    } else {
      console.log(error);
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Couldn't find exercise categories",
    });
  }
}

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getClassId(elementId) {
  const sql = `SELECT workout_class.workout_class_id FROM workout_class
  WHERE workout_class.element_id = ? limit 1
 `;

  const classId = await executeQuery({ query: sql, values: elementId });
  console.log(classId);
  return classId;
}

async function getCategories(classId) {
  const sql = `SELECT * FROM exercise_category WHERE workout_class_id = ?
 `;

  const exercises = await executeQuery({ query: sql, values: classId });
  console.log(exercises);
  return exercises;
}

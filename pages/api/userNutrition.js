/**
 * Calls macros for a given user- used on setNutrtion page
 *
 */

import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  const id = req.query.auth0;

  if (!id) {
    res.status(400).json({ message: "No ID specified" });
  }

  if (req.method === "GET") {
    const metrics = await getNutrition(id);
    console.log({ metrics });
    res.status(200).json({ metrics });
  } else {
    console.log(error);
  }
}

const sql = `
SELECT athlete.unique_identifier, nutrition_log.protein, nutrition_log.carbs, nutrition_log.fats, nutrition_log.water_goal
FROM athlete
INNER JOIN nutrition_log ON nutrition_log.nutrition_log_id = athlete.nutrition_log_id 
WHERE athlete.unique_identifier = ?;
  `;

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getNutrition(id) {
  const nutrition = await executeQuery({
    query: sql,
    values: [id],
  });
  console.log(nutrition);
  return nutrition;
}

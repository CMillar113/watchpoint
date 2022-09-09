/**
 * Calls the users nutrition logged Info
 *
 */

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  const athlete0Id = req.query.athlete0Id;

  if (!athlete0Id) {
    res.status(400).json({ message: "No ID specified" });
  }

  if (req.method === "GET") {
    const metrics = await getNutritionInfo(athlete0Id);
    console.log({ metrics });
    res.status(200).json(metrics);
  } else {
    console.log(error);
  }
}

async function getNutritionInfo(athlete0Id) {
  const sql = `
    SELECT athlete.unique_identifier, nutrition_log.nutrition_log_id, nutrition_log.protein, nutrition_log.carbs, nutrition_log.fats,nutrition_log.water_goal
    FROM athlete 
    INNER JOIN  nutrition_log on athlete.nutrition_log_id = nutrition_log.nutrition_log_id
    WHERE athlete.unique_identifier = ?
     `;

  const nutritionInfo = await executeQuery({
    query: sql,
    values: [athlete0Id],
  });
  console.log(nutritionInfo);
  return nutritionInfo;
}

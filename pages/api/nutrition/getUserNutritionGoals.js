/**
 * Calls the users nutrition logged Info
 *
 */

import executeQuery from "../../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  const athlete0Id = req.query.athlete0Id;

  if (!athlete0Id) {
    res.status(400).json({ message: "No ID specified" });
  }

  if (req.method === "GET") {
    const metrics = await getNutritionInfo(athlete0Id);
    console.log({ metrics });
    res.status(200).json(metrics);
    //      {
    //    protein: getProtein(metrics),
    //    carbs: getCarbs(metrics),
    //    fats: getFats(metrics),
    //    water: getWater(metrics),
    //  }
  } else {
    console.log(error);
  }
}

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
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

//  function getProtein(metrics) {
//    return metrics.filter((log) => log.protien === "");
//  }
//  function getFats(metrics) {
//    return metrics.filter((log) => log.fats === "");
//  }
//  function getCarbs(metrics) {
//    return metrics.filter((log) => log.carbs === "");
//  }

//  function getWater(metrics) {
//     return metrics.filter((log) => log.water === "");
//   }

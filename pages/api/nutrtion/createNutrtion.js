/**
 * log the nutrtion - macros & water for user used on setNutrtion page
 */

import executeQuery from "../../../lib/db";
import { getUserDetails } from "../userDetails";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }
  console.log({ req });
  const auth0 = user.sub;
  const queryParams = req.query;
  const { protein, carbs, fats, water } = queryParams;

  if ((await checkIfLogAlreadyExist(auth0)) !== undefined) {
    // does a nutrition_log_id exist for this user using unique_identifier
    const log = await updateNutrition(logID, protein, carbs, fats, water); //UPDATE
    res.status(202).json(log);
  } else {
    const log = await createNutrition(protein, carbs, fats, water); // INSERT
    res.status(201).json(log);
  }
}

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function createNutrition(protein, carbs, fats, water) {
  const sql = `
   INSERT INTO nutrition_log (nutrition_log_id, protein, carbs, fats, water_goal) 
   VALUES (NULL, ?, ?, ?, ?);
   `;
  const result = await executeQuery({
    query: sql,
    values: [protein, carbs, fats, water],
  });
  // talk to database get metrics for a given userID
  return result;
}

async function updateNutrition(logID, protein, carbs, fats, water) {
  const sql = `
   UPDATE nutrition_log SET protein = ?, carbs = ?, fats = ?, water_goal = ? WHERE nutrition_log_id = ?
   `;

  const result = await executeQuery({
    query: sql,
    values: [protein, carbs, fats, water, logID],
  });
  // talk to database get metrics for a given userID
  return result;
}

async function checkIfLogAlreadyExist(auth0) {
  const sql = `
      SELECT nutrition_log_id FROM athlete WHERE athlete.unique_identifier = ?
   `;

  const result = await executeQuery({
    query: sql,
    values: [auth0],
    ///// TODO - fill in these values depending on hte structure of the query
  });

  if (result.nutrition_log_id === 0) {
    return false;
  } else {
    return logID; // TODO - need to return id too so that update the correct line
  }
  // talk to database get metrics for a given userID
  // look at the result object to see if the count is greater than 0
  // if it's greater than zero, isAlreadyThere should be true
}

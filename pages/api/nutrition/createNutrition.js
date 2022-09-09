/**
 * log the nutrtion - macros & water for user used on setNutrtion page
 */

import executeQuery from "../../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }
  console.log({ req });
  const queryParams = req.query;
  const { id, protein, carbs, fats, water } = queryParams;
  console.log("recieved", id, protein, carbs, fats, water);

  if ((await checkIfLogAlreadyExist(id)) > 1) {
    // does a nutrition_log_id exist for this user using unique_identifier
    const logID = await checkIfLogAlreadyExist(id); //TODO - dont need to run twice - find equivalent
    console.log("check value for updating user", logID);
    const log = await updateNutrition(logID, protein, carbs, fats, water); //UPDATE
    res.status(202).json(log);
  } else {
    const log = await createNutrition(protein, carbs, fats, water); // INSERT into nutrition log
    const logID = await getLastEntery(); // get nutrition log id for athlete
    const update = await updateAthlete(logID, id); //assign nutrition log id to athlete in athlete table
    res.status(201).json(log);
    res.status(201).json(logID);
    res.status(201).json(update);
  }
}

async function createNutrition(protein, carbs, fats, water) {
  const sql = `
   INSERT INTO nutrition_log (nutrition_log_id, protein, carbs, fats, water_goal) 
   VALUES (NULL, ?, ?, ?, ?);
   `;
  const result = await executeQuery({
    query: sql,
    values: [protein, carbs, fats, water],
  });

  return result;
}

async function getLastEntery() {
  const sql = `
  SELECT nutrition_log_id FROM nutrition_log
ORDER BY nutrition_log_id DESC
LIMIT 1;
   `;
  const result = await executeQuery({
    query: sql,
  });

  console.log("last entery", result[0].nutrition_log_id);
  const logID = result[0].nutrition_log_id;
  return logID;
}

async function updateAthlete(logID, id) {
  const sql = `
  UPDATE athlete SET nutrition_log_id = ? WHERE athlete.unique_identifier =?
   `;
  const result = await executeQuery({
    query: sql,
    values: [logID, id],
  });
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

  return result;
}

async function checkIfLogAlreadyExist(id) {
  const sql = `
      SELECT nutrition_log_id FROM athlete WHERE athlete.unique_identifier = ?
   `;

  const result = await executeQuery({
    query: sql,
    values: [id],
  });
  console.log("check", result);
  if (result[0].nutrition_log_id > 1) {
    let logID = result[0].nutrition_log_id;
    console.log("check returned id", logID);
    return logID;
  } else {
    let logID = 0;
    return logID;
  }
}

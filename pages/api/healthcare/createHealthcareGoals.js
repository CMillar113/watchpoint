/**
 * check, create or update log for steps
 */

import executeQuery from "../../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Unsupported HTTP request" });
  }
  console.log({ req });

  const queryParams = req.query;
  const { id, elementID, goalValue } = queryParams;
  console.log("element", elementID);

  let parseElementID = parseInt(elementID);
  console.log(parseElementID);

  if (parseElementID === 7) {
    console.log("bodyweight");
    const log = await updateBodyweight(id, goalValue);
    res.status(202).json(log);
  } else if (parseElementID === 8) {
    console.log("steps");
    const log = await updateSteps(id, goalValue);
    res.status(202).json(log);
  }
}

async function updateBodyweight(id, goalValue) {
  const sql = `
   UPDATE athlete SET bodyweight_goal = ? WHERE athlete.unique_identifier = ? 
   `;
  const result = await executeQuery({
    query: sql,
    values: [goalValue, id],
  });
  return result;
}

async function updateSteps(id, goalValue) {
  const sql = `
     UPDATE athlete SET steps_goal = ? WHERE athlete.unique_identifier = ? 
     `;

  const result = await executeQuery({
    query: sql,
    values: [goalValue, id],
  });

  return result;
}

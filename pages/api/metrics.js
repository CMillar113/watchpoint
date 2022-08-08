// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method === "GET") {
    const metrics = await getMetrics();
    res.status(200).json(metrics);
  } else {
    console.log(error);
  }
}

/**
 *
 * SELECT athlete.athlete_id, element.element_name, element.element_id FROM element INNER JOIN athlete_element ON athlete_element.athlete_id = element.element_id INNER JOIN athlete ON athlete_element.athlete_id = athlete.athlete_id WHERE athlete.athlete_id = 1
 */

const sql = `
  SELECT athlete.athlete_id, element.element_name, element.element_id, element.element_class_id
  FROM element
  INNER JOIN athlete_element ON element.element_id = athlete_element.element_id
  INNER JOIN athlete ON athlete_element.athlete_id = athlete.athlete_id
  WHERE athlete.athlete_id = ?; 
`;
//Brings all healtchare elements for user

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getMetrics() {
  const metrics = await executeQuery({ query: sql, values: [1] });
  console.log(metrics);
  // talk to database get metrics for a given userID
  return metrics;
}

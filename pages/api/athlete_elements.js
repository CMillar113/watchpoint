/**
 * Athlete and elements linked information - shows the elements tied to a specfic athlete
 */

import executeQuery from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const metrics = await getMetrics();
    res.status(200).json(metrics);
  } else {
    console.log(error);
  }
}

const sql = `
  SELECT athlete.athlete_id, athlete.unique_identifier, element.element_name, element.element_id, element.element_class_id
  FROM element
  INNER JOIN athlete_element ON element.element_id = athlete_element.element_id
  INNER JOIN athlete ON athlete_element.athlete_id = athlete.athlete_id; 
`;

async function getMetrics() {
  const metrics = await executeQuery({ query: sql });
  console.log(metrics);

  return metrics;
}

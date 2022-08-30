/**
 * Athlete and elements linked information - shows the elements tied to a specfic athlete
 */

import executeQuery from "../../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method === "GET") {
    const elementId = req.query.elementId;
    const metrics = await getMetrics(elementId);
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
   SELECT element.element_name, element.element_id, element.element_class_id
   FROM element Where element.element_class_id = ?
 `;
//TODO - Only brings elements that have a athlete_id therefore new elements added at the start wont show unless someone is assigned them - maybe create new call with no athlete relation (updating app will then show new choices for users)
//Brings all healtchare elements for user

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getMetrics(elementId) {
  const metrics = await executeQuery({ query: sql, values: elementId });
  console.log(metrics);

  return metrics;
}

/**
 *
 */

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const elementId = req.query.elementId;
    const metrics = await getMetrics(elementId);
    res.status(200).json(metrics);
  } else {
    console.log(error);
  }
}

const sql = `
   SELECT element.element_name, element.element_id, element.element_class_id
   FROM element Where element.element_class_id = ?
 `;

async function getMetrics(elementId) {
  const metrics = await executeQuery({ query: sql, values: elementId });
  console.log(metrics);

  return metrics;
}

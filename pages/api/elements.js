/**
 * Calls element data only - nutrition, healthcare, workout
 * scalable to new elements being added- not used to see relationships between athlete and elements
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

const sql = `SELECT * FROM element where element_id=?
; 
`;

async function getMetrics() {
  const metrics = await executeQuery({ query: sql });
  console.log(metrics);
  return metrics;
}

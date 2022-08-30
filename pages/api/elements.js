/**
 * Calls element data only - nutrition, healthcare, workout
 * scalable to new elements being added- not used to see relationships between athlete and elements
 */

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
 *
 */

const sql = `SELECT * FROM element where element_id=?
; 
`;
/////TODO - Only brings elements that have a athlete_id therefore new elements added at the start wont show unless someone is assigned them - maybe create new call with no athlete relation (updating app will then show new choices for users)

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getMetrics() {
  const metrics = await executeQuery({ query: sql });
  console.log(metrics);
  // talk to database get metrics for a given userID
  return metrics;
}

// WHERE athlete.athlete_id = ?

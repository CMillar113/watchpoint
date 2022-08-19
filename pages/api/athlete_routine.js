/**
 * Information of athlete - element - routine linked
 * list of routines for that athlete in that element
 *
 */

import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  const id = req.query.auth0;

  if (req.method === "GET") {
    const metrics = await getRoutines(id);
    res.status(200).json(metrics);
  } else {
    console.log(error);
  }
}

const sql = `SELECT athlete.unique_identifier, athlete_element_routine.athlete_id, 
athlete_element_routine.element_id, athlete_element_routine.routine_id, 
athlete_element_routine.athlete_element_routine_id, routine.routine_name 
FROM athlete_element_routine
INNER JOIN routine ON athlete_element_routine.routine_id = routine.routine_id
INNER JOIN athlete ON athlete_element_routine.athlete_id = athlete.athlete_id
WHERE athlete.unique_identifier = ?
 `;

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getRoutines(id) {
  const routines = await executeQuery({
    query: sql,
    values: [id],
  });
  console.log(routines);
  return routines;
}

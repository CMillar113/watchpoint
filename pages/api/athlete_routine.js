/**
 * Information of athlete - element - routine linked
 * list of routines for that athlete in that element
 *
 */ import executeQuery from "../../lib/db";

export default async function handler(req, res) {
  const queryParams = req.query;
  const { auth0, elementid } = queryParams;
  const auth0id = auth0;
  const workoutElementId = elementid;
  console.log("recieved", auth0id, workoutElementId);

  if (req.method === "GET") {
    const metrics = await getRoutines(auth0id, workoutElementId);
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
WHERE athlete.unique_identifier = ? AND athlete_element_routine.element_id = ? ORDER By routine_id DESC
 `;

async function getRoutines(auth0id, workoutElementId) {
  const routines = await executeQuery({
    query: sql,
    values: [auth0id, workoutElementId],
  });
  console.log(routines);
  return routines;
}

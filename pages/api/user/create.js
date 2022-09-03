/**
 * Creates user using auth0 info in sql
 */

import executeQuery from "../../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
/** @type (req) => void */
export default async function handler(req, res) {
  console.log({ req });

  const user = req.body;
  const { id, username, email } = user;

  if (req.method === "POST") {
    const user = await createUser(id, username, email);
    res.status(200).json(user);
  } else {
    console.log(error);
  }
}

const sql = `
INSERT INTO athlete (athlete_id, unique_identifier, user_name, email_address, is_active, sleep_goal, bodyweight_goal, steps_goal, nutrition_log_id) 
VALUES (NULL, ?, ?, ?, '1', NULL, NULL, NULL, 1);
 `;
//Brings athlete firstname

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function createUser(id, username, email) {
  const user = await executeQuery({
    query: sql,
    values: [id, username, email],
  });
  // talk to database get metrics for a given userID
  return user;
}

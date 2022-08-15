/**
 * Calls athlete information like username
 */

import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method === "GET") {
    const userDetails = await getUserDetails();
    res.status(200).json(userDetails);
  } else {
    console.log(error);
  }
}

const sql = `
SELECT * FROM athlete WHERE 1
`;
//Brings athlete firstname

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getUserDetails() {
  const userDetails = await executeQuery({ query: sql });
  // talk to database get metrics for a given userID
  return userDetails;
}

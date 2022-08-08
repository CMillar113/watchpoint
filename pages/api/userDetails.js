//Want to use to call username

import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method === "GET") {
    const userMetrics = await getuserMetrics();
    res.status(200).json(userMetrics);
  } else {
    console.log(error);
  }
}

const sql = `
SELECT athlete.first_name
FROM athlete
WHERE athlete.athlete_id = ? 
`;
//Brings athlete firstname

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getuserMetrics() {
  const userMetrics = await executeQuery({ query: sql, values: [1] });
  console.log(userMetrics);
  // talk to database get metrics for a given userID
  return userMetrics;
}

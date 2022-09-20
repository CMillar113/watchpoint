/**
 * Calls athlete information like username
 */

import executeQuery from "../../lib/db";
import prisma from "../../lib/prisma";
// Controller function which is separated from the database
//logic and just returns data to frontend

export default async function handler(req, res) {
  console.log({ req });

  const id = req.query.auth0;

  if (!id) {
    res.status(400).json({ message: "No ID specified" });
  }
  console.log(req.headers.cookie);

  if (req.method === "GET") {
    const userDetails = await getUserDetails(id);
    res.status(200).json(userDetails);
  } else {
    console.log(error);
  }
}

// Service function that grabs data from database - keeping the handler agnostic
//of what dataabse it is connected to [separation of concerns]
export async function getUserDetails(id) {
  // prisma.$queryRaw`SELECT * FROM athlete WHERE athlete.unique_identifier = ${id}`;
  const sql = `
  SELECT * FROM athlete WHERE athlete.unique_identifier = ?
  `;
  // const userDetails =
  //   await prisma.$queryRaw`SELECT * FROM athlete WHERE athlete.unique_identifier = ${id}`;
  const userDetails = await executeQuery({
    query: sql,
    values: [id],
  });

  // talk to database get metrics for a given userID
  return userDetails;
}

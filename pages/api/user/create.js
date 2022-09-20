/**
 * Creates user in sql using auth0 info
 */

import executeQuery from "../../../lib/db";
import prisma from "../../../lib/prisma";

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

async function createUser(id, username, email) {
  const sql = `
    INSERT INTO athlete
    (athlete_id, unique_identifier, user_name, email_address, is_active,
      sleep_goal, bodyweight_goal, steps_goal,  nutrition_log_id)
    VALUES (NULL, ?, ?, ?, '1', NULL, NULL, NULL, 1);
   `;

  // const _user = await prisma.$queryRaw`
  //     INSERT INTO athlete
  //       (athlete_id, unique_identifier, user_name, email_address, is_active,
  //       sleep_goal, bodyweight_goal, steps_goal,  nutrition_log_id)
  //     VALUES (NULL, ${id}, ${username}, ${email}, '1', NULL, NULL, NULL, 1);
  //   `;
  const user = await executeQuery({
    query: sql,
    values: [id, username, email],
  });
  // talk to database get metrics for a given userID
  return user;
}

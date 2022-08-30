import mysql from "serverless-mysql";

const URL = !!process.env.MYSQL_PORT
  ? `${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}`
  : process.env.MYSQL_HOST;

const db = mysql({
  config: {
    host: URL,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});
export default async function executeQuery({ query, values }) {
  console.log({ query, values });

  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

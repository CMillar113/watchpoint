/**
 * Calls elements for users week in review
 *
 */

import executeQuery from "../../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  const queryParams = req.query;
  const { athlete0Id, today, backDate } = queryParams;
  console.log("recieved", athlete0Id, today, backDate);

  if (!athlete0Id) {
    res.status(400).json({ message: "No ID specified" });
  }
  if (req.method === "GET") {
    const metrics = await getHealthcare(athlete0Id, today, backDate);
    console.log({ metrics });
    res.status(200).json({
      steps: getSteps(metrics),
      bodyweight: getBodyWeight(metrics),
      sleep: getSleep(metrics),
    });
  } else {
    console.log(error);
  }
}

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getHealthcare(athlete0Id, today, backDate) {
  const sql = `
  SELECT athlete.unique_identifier, healthcare_log.element_id, element.element_name, healthcare_log.date, healthcare_log.log_value  
  FROM athlete 
  INNER JOIN  healthcare_log on athlete.athlete_id = healthcare_log.athlete_id 
  INNER JOIN  element on healthcare_log.element_id = element.element_id
  WHERE athlete.unique_identifier = ? AND healthcare_log.date BETWEEN ? AND ?
  ORDER BY healthcare_log.date DESC 
  `;
  //IMPROVMENT - Split healthcare logs into ther own databasetables - be quicker searching and filtering when there are more users and data

  const healthcare = await executeQuery({
    query: sql,
    values: [athlete0Id, backDate, today],
  });
  console.log(healthcare);
  return healthcare;
}

function getSteps(metrics) {
  return metrics.filter((log) => log.element_name === "Steps");
}
function getBodyWeight(metrics) {
  return metrics.filter((log) => log.element_name === "Bodyweight");
}
function getSleep(metrics) {
  return metrics.filter((log) => log.element_name === "Sleep");
}

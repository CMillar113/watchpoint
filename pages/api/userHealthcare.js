/**
 * Calls the users healthcare records for all 3 elements
 *
 */

import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  const id = req.query.auth0;

  if (!id) {
    res.status(400).json({ message: "No ID specified" });
  }

  if (req.method === "GET") {
    const metrics = await getHealthcare(id);
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

const sql = `
SELECT athlete.unique_identifier, healthcare_log.element_id, element.element_name, healthcare_log.date, healthcare_log.log_value  
FROM athlete 
INNER JOIN  healthcare_log on athlete.athlete_id = healthcare_log.athlete_id 
INNER JOIN  element on healthcare_log.element_id = element.element_id
WHERE athlete.unique_identifier = ?
ORDER BY healthcare_log.date DESC;
 `;

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getHealthcare(id) {
  const healthcare = await executeQuery({
    query: sql,
    values: [id],
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

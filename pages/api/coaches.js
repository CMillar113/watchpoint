import executeQuery from "../../lib/db";

// Controller function which is separated from the database logic and just returns data to frontend
export default async function handler(req, res) {
  if (req.method === "GET") {
    const coaches = await getCoaches();
    res.status(200).json(coaches);
  } else {
    console.log(error);
  }
}

const sql = `
SELECT coach.coach_id, coach.brand_name, coach.coach_img_url, coach.first_name, coach.surname, coach.email_address
FROM coach WHERE coach.is_active = 1; 
`;
//Brings all healtchare elements for user

// Service function that grabs data from database - keeping the handler agnostic of what dataabse it is connected to [separation of concerns]
async function getCoaches() {
  const coaches = await executeQuery({ query: sql });
  console.log(coaches);
  // talk to database get metrics for a given userID
  return coaches;
}

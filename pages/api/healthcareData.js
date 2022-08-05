export default function handler(req, res) {
  if (req.method === "GET") {
    const Logs = getLogs();
    res.status(200).json(metrics);
  } else {
    console.log(error);
  }
}

function getLogs() {
  // talk to database get metrics for a given userID
  return trackedMetrics;
}

const trackedMetrics = {
  bodyweight: true,
  steps: true,
  sleep: true,
};

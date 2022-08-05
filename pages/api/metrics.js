// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "GET") {
    const metrics = getMetrics();
    res.status(200).json(metrics);
  }
}

function getMetrics() {
  // talk to database get metrics for a given userID
  return trackedMetrics;
}

const trackedMetrics = {
  bodyweight: true,
  steps: true,
  sleep: true,
};

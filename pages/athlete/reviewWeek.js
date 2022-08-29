import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

const today = new Date().toISOString().substring(0, 10);
const backDate = today - 7;

export default function reviewWeek() {
  const [calories, setCalories] = useState();
  const { user } = useUser();
  const [isLoading, setLoading] = useState(true);

  //Only possible healthcare attributes - finite amount but if there were to be more this isnt the most scalable

  const [bodyweightWeekArray, setbodyweightWeekArray] = useState();
  const [stepsWeekArray, setStepsWeekArray] = useState();
  const [sleepWeekArray, setSleepWeekArray] = useState();

  useEffect(() => {
    if (!user) return;
    (async function () {
      setLoading(true);
      try {
        const athlete0Id = user.sub;
        const response = await fetch(
          `/api/user/weekReview?athlete0Id=${athlete0Id}&date=${today}`
        );
        const result = await response.json();

        console.log({ result });

        if (response.ok) {
          setLoggedBodyweight(result.bodyweight);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  return (
    <>
      <Meta title="Athlete Week Review" />
      <Navbar backPath={"/athlete"} title="Week Review" />
      <PageLayout>
        {/* Show calorie goal at top if there is calorie goals set */}
        {/* Show previous 7 days of healthcare logs (steps/ bodyweight weigh ins etc N/a if missed one) */}
        {/* Show workouts loggged in past 7 days ' athlete_routine_exercise' table */}
        <div
          id="All"
          className="w-full h-screen flex-col  border-2 border-black "
        >
          <p className=" justify-evenly flex">
            From: {backDate} To: {today}
          </p>
          <div
            id="Day"
            className="h-1/6 w-full border-black border-2 flex"
          ></div>
        </div>
      </PageLayout>
    </>
  );
}

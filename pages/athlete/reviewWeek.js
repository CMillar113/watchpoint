import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { calculateCaloriesFromMacros } from "../../src/backend";
import { subDays, format } from "date-fns";

const today = new Date();
const sevenDaysAgo = subDays(new Date(), 7);

export default function reviewWeek() {
  const [nutrition, setNutrtion] = useState();
  const { user } = useUser();
  const [isLoading, setLoading] = useState(true);
  const [bodyweightWeekArray, setBodyweightWeekArray] = useState();
  const [stepsWeekArray, setStepsWeekArray] = useState();
  const [sleepWeekArray, setSleepWeekArray] = useState();

  //Geting users Healthcare information
  useEffect(() => {
    if (!user) return;
    (async function () {
      setLoading(true);
      try {
        const _today = format(today, "yyyy-MM-dd");
        const backDate = format(sevenDaysAgo, "yyyy-MM-dd");

        const athlete0Id = user.sub;
        const response = await fetch(
          `/api/user/getHealthcareWeekReview?athlete0Id=${athlete0Id}&today=${_today}&backDate=${backDate}`
        );
        const result = await response.json();

        console.log({ result });

        if (response.ok) {
          setBodyweightWeekArray(result.bodyweight);
          setStepsWeekArray(result.steps);
          setSleepWeekArray(result.sleep);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  //Geting users nutrtion goal information
  useEffect(() => {
    if (!user) return;
    (async function () {
      setLoading(true);
      try {
        const athlete0Id = user.sub;
        const response = await fetch(
          `/api/nutrition/getUserNutritionGoals?athlete0Id=${athlete0Id}`
        );
        const result = await response.json();

        console.log({ result });

        if (response.ok) {
          setNutrtion(result);
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
      <Navbar backPath={"/athlete"} title="Weekly Review" />
      <PageLayout>
        {/* Show calorie goal at top if there is calorie goals set */}
        {/* Show previous 7 days of healthcare logs (steps/ bodyweight weigh ins etc N/a if missed one) */}
        {/* Show workouts loggged in past 7 days ' athlete_routine_exercise' table */}
        <div id="All" className="w-full h-screen flex-col ">
          <p className=" text-center text-slate-700 mt-2 px-2">
            Check out your week of hitting your goals!
          </p>
          <p className=" justify-evenly flex text-slate-800 ">
            {format(sevenDaysAgo, "do MMM yyyy")} -{" "}
            {format(today, "do MMM yyyy")}
          </p>

          {Array.isArray(nutrition) && nutrition.length > 0 ? (
            nutrition.map(function (log) {
              return (
                <React.Fragment key={`${log.nutrition_log_id}`}>
                  <h3 className="text-center mt-4 bg-primary-bg">
                    Calorie Target:{" "}
                    {calculateCaloriesFromMacros(
                      log.protein,
                      log.carbs,
                      log.fats
                    )}
                    Kcal
                  </h3>
                  <div className="flex w-full h-auto justify-between px-5 mt-1 mb-2">
                    <div className="border-2 text-center px-1">
                      {log.protein}g Protein{" "}
                    </div>
                    <div className="border-2 text-center  px-1">
                      {log.carbs}g Carbs
                    </div>
                    <div className="border-2 text-center  px-1">
                      {log.fats}g Fats
                    </div>
                    <div className="border-2 text-center  px-1">
                      {log.water_goal}L Water
                    </div>
                  </div>

                  <hr />
                </React.Fragment>
              );
            })
          ) : (
            <div className="w-full px-1">
              {isLoading ? "Loading..." : "No Values Logged"}
            </div>
          )}

          <div className="w-full h-auto border-2">
            <div
              id="Date & Log"
              className=" bg-primary-bg border-2 border-black"
            >
              <div className="flex w-full justify-between px-1 mb-1 bg-black text-cyan-50">
                <div>Bodyweight:</div>
                <div>Date:</div>
              </div>
              {Array.isArray(bodyweightWeekArray) &&
              bodyweightWeekArray.length > 0 ? (
                bodyweightWeekArray.map(function (log) {
                  return (
                    <React.Fragment
                      key={`${log.log_value}-${log.date}-${log.unique_identifier}`}
                    >
                      <div className="flex w-full justify-between px-1">
                        <div>{log.log_value}</div>
                        <div>{format(new Date(log.date), "do MMM yy")}</div>
                      </div>
                      <hr />
                    </React.Fragment>
                  );
                })
              ) : (
                <div className="w-full px-1">
                  {isLoading ? "Loading..." : "No Values Logged This Week"}
                </div>
              )}
            </div>
            <div
              id="Date & Log"
              className=" bg-primary-bg border-2 border-black"
            >
              <div className="flex w-full justify-between px-1 mb-1 bg-black text-cyan-50">
                <div>Steps:</div>
                <div>Date:</div>
              </div>
              {Array.isArray(stepsWeekArray) && stepsWeekArray.length > 0 ? (
                stepsWeekArray.map(function (log) {
                  return (
                    <React.Fragment
                      key={`${log.log_value}-${log.date}-${log.unique_identifier}`}
                    >
                      <div className="flex w-full justify-between px-1">
                        <div>{log.log_value}</div>
                        <div>{format(new Date(log.date), "do MMM yy")}</div>
                      </div>
                      <hr />
                    </React.Fragment>
                  );
                })
              ) : (
                <div className="w-full px-1">
                  {isLoading ? "Loading..." : "No Values Logged This Week"}
                </div>
              )}
            </div>
            <div
              id="Date & Log"
              className=" bg-primary-bg border-2 border-black"
            >
              <div className="flex w-full justify-between px-1 mb-1 bg-black text-cyan-50">
                <div>Hours of Sleep:</div>
                <div>Date:</div>
              </div>
              {Array.isArray(sleepWeekArray) && sleepWeekArray.length > 0 ? (
                sleepWeekArray.map(function (log) {
                  return (
                    <React.Fragment
                      key={`${log.log_value}-${log.date}-${log.unique_identifier}`}
                    >
                      <div className="flex w-full justify-between px-1">
                        <div>{log.log_value}</div>
                        <div>{format(new Date(log.date), "do MMM yy")}</div>
                      </div>
                      <hr />
                    </React.Fragment>
                  );
                })
              ) : (
                <div className="w-full px-1">
                  {isLoading ? "Loading..." : "No Values Logged This Week"}
                </div>
              )}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

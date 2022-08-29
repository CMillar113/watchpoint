import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { calculateCaloriesFromMacros } from "../../src/backend";

const now = new Date();
const month = now.getMonth() + 1;
const day = now.getDate() - 7;
const year = now.getFullYear();
//Deonstruct todays date and create as a week previous
const backDate = `${year}-${month}-${day}`;
const today = new Date().toISOString().substring(0, 10);

const displayDate = `${month}/${now.getDate()}`;
const displayBackDate = `${month}/${day}`;

export default function reviewWeek() {
  const [nutrition, setNutrtion] = useState();
  const { user } = useUser();
  const [isLoading, setLoading] = useState(true);

  //Only possible healthcare attributes - finite amount but if there were to be more this isnt the most scalable

  const [bodyweightWeekArray, setBodyweightWeekArray] = useState();
  const [stepsWeekArray, setStepsWeekArray] = useState();
  const [sleepWeekArray, setSleepWeekArray] = useState();

  //Geting users Healthcare information
  useEffect(() => {
    if (!user) return;
    (async function () {
      setLoading(true);
      try {
        const athlete0Id = user.sub;
        const response = await fetch(
          `/api/user/getHealthcareWeekReview?athlete0Id=${athlete0Id}&today=${today}&backDate=${backDate}`
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
          <p className=" justify-evenly flex">
            From the {displayBackDate} To the {displayDate} {year}
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
                    <div className="border-2 px-1">{log.protein}g Protein </div>
                    <div className="border-2 px-1">{log.carbs}g Carbs</div>
                    <div className="border-2 px-1">{log.fats}g Fats</div>
                    <div className="border-2 px-1">{log.water_goal}L Water</div>
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
                        <div>{log.date.substring(5, 10)}</div>
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
                        <div>{log.date.substring(5, 10)}</div>
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
                        <div>{log.date.substring(5, 10)}</div>
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

import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import NavMenu from "../../src/components/NavButtonTwo";

import Router from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import { lowerCaseFirstLetter } from "../_app";
import FullScreenSpinner from "../../src/components/FullScreenSpinner";

export default function athlete() {
  const [metrics, setMetrics] = useState(undefined);
  const { user, isLoading } = useUser();
  // const [dailySteps, setDailySteps] = useState("Steps");
  // const [dailyBodyweight, setDailyBodyweight] = useState("Bodyweight");
  // const [dailySleep, setDailySleep] = useState("Sleep");

  if (!user) {
    return "PLEASE GO TO LANDING PAGE TO SIGN IN";
  }

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `/api/healthcare/getHealthcareElements?elementId=${2}`
        );
        const result = await response.json();

        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  let body = null;
  if (metrics !== undefined && user !== undefined) {
    body = metrics
      .filter(function (metric) {
        return metric.element_class_id === 2;
      })
      .map(function (metric) {
        return (
          <button
            key={`${metric.element_id}-btn`}
            className="bg-primary-bg border-black border-2 text-black items-center w-2/3 "
            onClick={function () {
              const path = lowerCaseFirstLetter(metric.element_name);
              Router.push(`/athlete/${path}Dash`);
            }}
          >
            {metric.element_name}
          </button>
        );
      });
  }

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  return (
    <>
      <Meta title="Athlete - Home" />
      <Navbar title={user.nickname || ""} />
      <PageLayout>
        <NavMenu
          pathLeft={"/plan/setNutrition"}
          labelLeft={"Edit Goals"}
          pathRight={"/workouts/selectWorkout"}
          labelRight={"Workouts"}
        ></NavMenu>

        <div className=" border-2 border-black h-2/4 content-center items-center justify-evenly mb-2 ">
          <div
            className={`bg-primary-bg text-primary-text h-7 place-content-center w-full border-b-2 border-black flex mb-4  `}
          >
            Healthcare
          </div>
          <p className=" text-center text-slate-700 px-2">
            Use the buttons below to log your daily healthcare values
          </p>

          <div className="flex flex-col gap-2 w-full h-10 justify-evenly mt-11 mb-3 items-center">
            {body}
          </div>
        </div>

        <div className="border-2 border-black h-2/6 content-center items-center justify-center mt-4">
          <div
            className={`bg-primary-bg text-primary-text h-7 text-center  w-full border-black border-b-2 mb-1 overflow-hidden  `}
          >
            Review
          </div>
          <p className=" text-center text-slate-700 px-3">
            Check out your week, have you been hitting your goals?
          </p>
          <div className="mt-2">
            <Button path="/athlete/reviewWeek" label="Week in Review" />
          </div>
        </div>
        <div className="mt-4">
          <Button path="/settings" label="Settings" />
          <Button path="/api/auth/logout" label="Sign out" />
        </div>
      </PageLayout>
    </>
  );
}

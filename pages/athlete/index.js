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

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/athlete_elements");
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
        return (
          metric.element_class_id === 2 && metric.unique_identifier === user.sub
        );
      })
      .map(function (metric) {
        return (
          <button
            key={`${metric.element_id}-btn`}
            className="bg-black text-white items-center "
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
          pathCenter={""}
          labelCenter={"Food Log"}
          pathRight={"/workouts/selectWorkout"}
          labelRight={"Workouts"}
        ></NavMenu>

        <div className=" border-2 border-black h-1/3 content-center items-center  justify-evenly mb-2 ">
          <div
            className={`bg-primary-bg text-primary-text h-7 place-content-center w-full border-b-2 border-black flex mb-1  `}
          >
            Daily Goals
          </div>

          <div className="flex flex-col gap-2 w-8/12 h-10 justify-evenly mt-3 mb-3">
            {body}
          </div>
        </div>

        <div className="border-2 border-black h-1/3 content-center items-center justify-center">
          <div
            className={`bg-primary-bg text-primary-text h-7 place-content-center  w-full border-2 border-black  mb-1 mt-1 overflow-hidden  `}
          >
            Weekly Goals
          </div>
          No Weekly Goals Set
        </div>

        {/* {metrics !== undefined && <pre>{JSON.stringify(metrics, null, 2)}</pre>} */}
        <div>
          <Button path="/plan/selectElements" label="Set Goals" />
          <Button path="/settings" label="Settings" />
          <Button path="/athlete/reviewWeek" label="Week in Review" />
          <Button path="/api/auth/logout" label="Sign out" />
        </div>
      </PageLayout>
    </>
  );
}

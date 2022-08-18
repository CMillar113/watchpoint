import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import NavMenu from "../../../src/components/NavMenu";
import PageLayout from "../../../src/components/PageLayout";
import Button from "../../../src/components/Button";
import { useEffect, useState } from "react";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

import { lowerCaseFirstLetter } from "../../_app";

//Constants for testing data pull
const workoutTitle = "Hypertrophy";
const workoutPathTitle = lowerCaseFirstLetter(workoutTitle);
let passedElement = 3; // TODO -Could look up name and element ID then would work for all elements - single page?
//Constants for testing data pull

export default function routineMenu() {
  const { user, isLoading } = useUser();
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/athlete_routine");
        const result = await response.json();

        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  let routines = null;

  if (metrics !== undefined && user !== undefined) {
    let routines = metrics
      .filter(function (metric) {
        return (
          metric.unique_identifier === user.sub &&
          metric.element_id === passedElement
          //Filters for all routines in hypertrophy for current user
        );
      })
      .map(function (metric) {
        return (
          <button
            key={metric.athlete_element_routine_id}
            className=" w-full h-10 border-black border-2 flex px-3 mb-1"
            onClick={function () {
              Router.push(
                `/workouts/${workoutPathTitle}/routineDisplay?id=${metric.routine_id}`
              );
            }}
            // onClick={function () {
            //   Router.push(`/workouts/${workoutPathTitle}/routineDisplay`);
            // }}
          >
            {metric.routine_name}
          </button>
        );
      });
    return (
      <>
        <Meta title={workoutTitle} />
        <Navbar
          title={workoutTitle}
          backPath={`/workouts/${workoutPathTitle}`}
        />
        <PageLayout>
          <div className="w-full flex justify-center">
            <div className="mb-5 w-2/3 h-10 border-2 border-black rounded-md text-center">
              Searchbar placeholder
            </div>
          </div>
          {routines}
          <Button
            path={`/workouts/${workoutPathTitle}NewRoutine`}
            label={"Create New Routine +"}
          />
        </PageLayout>
      </>
    );
  }
}

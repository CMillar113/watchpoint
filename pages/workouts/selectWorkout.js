import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";

import { useEffect, useState } from "react";
import Router from "next/router";
import { lowerCaseFirstLetter } from "../_app";
import { useUser } from "@auth0/nextjs-auth0";

export default function selectWorkout() {
  const [metrics, setMetrics] = useState(undefined);
  const { user, isLoading } = useUser();

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `/api/healthcare/getHealthcareElements?elementId=${3}`
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

  //NEED TO PUT REQUIRMENT FOR DEFINED USER OTHERIWSE FAILS ON REFRESH - SAME REASON NEED USEEFFECT FUNCTION
  if (metrics !== undefined && user !== undefined) {
    let body = metrics
      .filter(function (metric) {
        return (
          metric.element_class_id === 3 //will bring all workout classified elements
        );
      })
      .map(function (metric) {
        return (
          <button
            key={`${metric.element_id}-btn`}
            className="h-16 w-full rounded-md border-black border-2 bg-slate-300 mb-2 place-content-center"
            onClick={function () {
              let path = lowerCaseFirstLetter(metric.element_name);
              Router.push(
                `/workouts/element?workout=${path}&workoutId=${metric.element_id}`
                // `/workouts/${path}?workout=${path}&workoutId=${metric.element_id}`
              );
            }}
          >
            {" "}
            {metric.element_name}
          </button>
        );
      });
    return (
      <>
        <Meta title="Select Workout" />
        <Navbar title="Workouts:" backPath={"/athlete"} />
        <PageLayout>
          <p className=" text-center text-slate-700 mb-4">
            Please select the type of workout you would like to begin!
          </p>
          <div>{body}</div>
        </PageLayout>
      </>
    );
  }
}

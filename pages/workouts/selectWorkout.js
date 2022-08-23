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

  //NEED TO PUT REQUIRMENT FOR DEFINED USER OTHERIWSE FAILS ON REFRESH - SAME REASON NEED USEEFFECT FUNCTION
  if (metrics !== undefined && user !== undefined) {
    let body = metrics
      .filter(function (metric) {
        return (
          metric.element_class_id === 3 && metric.unique_identifier == user.sub
        );
      })
      .map(function (metric) {
        return (
          <button
            key={`${metric.element_id}-btn`}
            className="h-20 w-full rounded-md border-black border-2 bg-slate-300 mb-2 place-content-center"
            onClick={function () {
              let path = lowerCaseFirstLetter(metric.element_name);
              Router.push(`/workouts/${path}`);
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
          <p className="text-center">
            Please Select The Workout You Wish To Begin
          </p>
          <div>{body}</div>
        </PageLayout>
      </>
    );
  }
}

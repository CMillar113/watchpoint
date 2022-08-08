import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function selectWorkout() {
  let body = null;
  body = checkWorkoutElements();

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

function checkWorkoutElements() {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/metrics");
        const result = await response.json();

        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (metrics !== undefined) {
    let body = metrics
      .filter(function (metric) {
        return metric.element_class_id === 3;
      }) // This is how to apply a filter
      .map(function (metric) {
        return (
          <button
            key={`${metric.element_id}-btn`}
            className="h-20 w-full rounded-md border-black border-2 bg-slate-300 mb-2 place-content-center"
            onClick={function () {
              Router.push(`/workouts/${metric.element_name}Dash`);
            }}
          >
            {" "}
            {metric.element_name}
          </button>
        );
      });
    return body;
  }
}

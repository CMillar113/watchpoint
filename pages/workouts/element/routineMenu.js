import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import PageLayout from "../../../src/components/PageLayout";
import Button from "../../../src/components/Button";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

export default function routineMenu() {
  const { user, isLoading } = useUser();
  const { query, isReady } = useRouter();
  const [metrics, setRoutines] = useState(undefined);
  const [workout, setWorkoutTitle] = useState(" ");
  const [workoutId, setWorkoutId] = useState(" ");

  useEffect(() => {
    if (!user) return;

    if (!isReady) return;
    async function effect() {
      const { workout } = query;
      setWorkoutTitle(workout);
    }
    effect();

    (async function () {
      const { workoutId } = query;
      setWorkoutId(workoutId);
      try {
        const response = await fetch(
          `/api/athlete_routine?auth0=${user.sub}&elementid=${workoutId}`
        );
        const result = await response.json();

        if (response.ok) {
          setRoutines(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user, query, isReady]);

  const workoutTitle = workout;

  if (metrics !== undefined && user !== undefined) {
    let routines = metrics.map(function (metric) {
      return (
        <div
          key={metric.athlete_element_routine_id}
          className="flex w-full gap-2"
        >
          <button
            className=" w-full h-8 justify-evenly border-black text-black  border-2 flex px-3 mb-1"
            onClick={function () {
              Router.push(
                `/workouts/element/routineDisplay?workout=${workoutTitle}&workoutId=${workoutId}&routineId=${metric.routine_id}`
              );
            }}
          >
            {metric.routine_name}
          </button>

          <button
            key={`${metric.athlete_element_routine_id}-delete`}
            className="  h-8 justify-evenly border-black text-red-500  border-2 flex px-3 mb-1"
            onClick={async function () {
              try {
                const response = await fetch(
                  `/api/routines/deleteRoutine?routineId=${metric.routine_id}`, //TODO - Add delete endpoint
                  { method: "DELETE" }
                );
                const result = await response.json();
                console.log(result);
                window.location.reload();
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Delete
          </button>
        </div>
      );
    });
    return (
      <>
        <Meta title={workoutTitle} />
        <Navbar
          title={workoutTitle}
          backPath={`/workouts/element?workout=${workoutTitle}&workoutId=${workoutId}`}
        />
        <PageLayout>
          <div className="w-full flex justify-center">
            <div className="mb-5 w-2/3 h-10 border-2 border-black rounded-md text-center">
              Most Recent
            </div>
          </div>
          {routines}
          <Button
            path={`/workouts/element/createRoutine?workout=${workoutTitle}&workoutId=${workoutId}`}
            label={"Create New Routine +"}
          />
        </PageLayout>
      </>
    );
  }
}

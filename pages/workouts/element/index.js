import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import NavMenu from "../../../src/components/NavButtonOne";
import PageLayout from "../../../src/components/PageLayout";
import Router, { useRouter } from "next/router";
import { subDays, format } from "date-fns";

const _today = new Date();
const thirtyDaysAgo = subDays(new Date(), 30);

export default function hypertrophyDash() {
  const { query, isReady } = useRouter();
  const [workout, setWorkoutTitle] = useState(" ");
  const [workoutId, setWorkoutId] = useState(0);
  const [routinesId, setRoutinesId] = useState("");
  const [routineCards, setRoutineCards] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (!isReady) return;
    async function effect() {
      const { workout, workoutId } = query;
      setWorkoutTitle(workout);
      setWorkoutId(workoutId);
    }
    effect();
  }, [query, isReady]);

  //Getting last logged workouts
  useEffect(() => {
    if (!user) return;
    if (!isReady) return;
    const { workout, workoutId } = query;
    (async function () {
      try {
        const backDate = format(thirtyDaysAgo, "yyyy-MM-dd"); // todays date a month previous
        const today = format(_today, "yyyy-MM-dd");
        const response = await fetch(
          `/api/routines/getLastWorkouts?athlete0Id=${user.sub}&workoutId=${workoutId}&today=${today}&backDate=${backDate}`
        );
        const result = await response.json();

        if (response.ok) {
          setRoutinesId(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user, query, isReady]);

  useEffect(() => {
    // Check  updates corrrectly through entery
    console.log("updated routinesId state", { routinesId });
  }, [routinesId]);

  const workoutTitle = workout;
  const workoutElementId = workoutId;

  return (
    <>
      <Meta title={workoutTitle} />
      <Navbar title={workoutTitle} backPath={"/workouts/selectWorkout"} />
      <PageLayout>
        <NavMenu
          path={`/workouts/element/routineMenu?workout=${workoutTitle}&workoutId=${workoutElementId}`}
          label={"Routines"}
        ></NavMenu>
        <hr className="bg-black" />
        <p className=" text-center text-slate-700 mb-4 mt-2">
          Quick select from a list of your most recent workouts!
        </p>

        <div className="w-full h-auto flex justify-center border-2 border-black text-white bg-black rounded-lg mb-4">
          <h3 className=" text-center  ">Recent Workouts</h3>
        </div>

        {routinesId &&
          Array.isArray(routinesId) &&
          routinesId.map(function (routine) {
            return (
              <button
                key={routine.routine_id}
                className=" w-full h-8 justify-evenly border-black text-black  border-2 flex px-3 mb-1"
                onClick={function () {
                  Router.push(
                    `/workouts/element/routineDisplay?workout=${workoutTitle}&workoutId=${workoutId}&routineId=${routine.routine_id}`
                  );
                }}
              >
                <div className=" w-full justify-between flex px-5">
                  <div>{routine.routine_name}</div>
                  <div>{format(new Date(routine.date), "do MMM yy")}</div>
                </div>
              </button>
            );
          })}
      </PageLayout>
    </>
  );
}

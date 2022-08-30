import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import NavMenu from "../../../src/components/NavButtonOne";
import PageLayout from "../../../src/components/PageLayout";

const now = new Date();
const month = now.getMonth(); //get month is a month behind
const day = now.getDate();
const year = now.getFullYear();
//Deonstruct todays date and create as a week previous
const backDate = `${year}-${month}-${day}`; // todays date a month previous
const today = new Date().toISOString().substring(0, 10);

export default function hypertrophyDash() {
  const { query, isReady } = useRouter();
  const [workout, setWorkoutTitle] = useState(" ");
  const [workoutId, setWorkoutId] = useState(" ");
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

    (async function () {
      try {
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

    (async function () {
      try {
        console.log(routinesId);
        const response = fetch(
          `/api/routines/latestLoggedRoutines?routineId=${routine.routine_id}`
        );
        const result = response.json();

        if (response.ok) {
          setRoutineCards(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user, query, isReady]);

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
        <p className="text-center">
          Month and up to date list of wokrouts last logged being at top
        </p>

        <div className="w-full h-auto flex justify-center border-2 border-black rounded-lg">
          <h3 className=" text-center">Routine Name</h3>
        </div>
      </PageLayout>
    </>
  );
}

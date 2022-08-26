import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import NavMenu from "../../../src/components/NavButtonOne";
import PageLayout from "../../../src/components/PageLayout";
import { lowerCaseFirstLetter } from "../../_app";

export default function hypertrophyDash() {
  const { query, isReady } = useRouter();
  const [workout, setWorkoutTitle] = useState(" ");
  const [workoutId, setWorkoutId] = useState(" ");
  useEffect(() => {
    if (!isReady) return;
    async function effect() {
      const { workout, workoutId } = query;
      setWorkoutTitle(workout);
      setWorkoutId(workoutId);
    }
    effect();
  }, [query, isReady]);

  const workoutTitle = workout;
  const workoutElementId = workoutId;

  return (
    <>
      <Meta title={workoutTitle} />
      <Navbar title={workoutTitle} backPath={"/workouts/selectWorkout"} />
      <PageLayout>
        <NavMenu
          path={`/workouts/${workoutTitle}/routineMenu?workout=${workoutTitle}&workoutId=${workoutElementId}`}
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

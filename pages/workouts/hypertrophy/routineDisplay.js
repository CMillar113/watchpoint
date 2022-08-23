import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";

import PageLayout from "../../../src/components/PageLayout";
import Button from "../../../src/components/Button";
import FullScreenSpinner from "../../../src/components/FullScreenSpinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { lowerCaseFirstLetter } from "../../_app";
import { useUser } from "@auth0/nextjs-auth0";

//Constants for testing data pull
const workoutTitle = "Hypertrophy";
const workoutPathTitle = lowerCaseFirstLetter(workoutTitle);

// let routineName = null;
// routineName = checkRoutineName(passedRoutineID);
//Constants for testing data pull

export default function routineDisplay() {
  const { query, isReady } = useRouter();
  const [routine, setRoutine] = useState({
    name: "",
    notes: "",
    exercises: [],
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;

    async function effect() {
      setLoading(true);
      const { id } = query;

      const response = await fetch(`/api/routine_exercise?routine_id=${id}`);
      const result = await response.json();
      console.log({ result });
      if ("message" in result) {
        console.error(result.message);
      } else {
        setRoutine(result);
      }
      setLoading(false);
    }

    effect();
  }, [query, isReady]);

  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <>
      <Meta title={workoutTitle} />
      <Navbar
        title="Routine"
        backPath={`/workouts/${workoutPathTitle}/routineMenu`}
      />
      <PageLayout>
        <div className="w-full h-auto text-center border-black border-2 rounded-md mb-5">
          <h3 className="w-full h-auto border-2">{routine.name}</h3>
          <h3 className="w-full h-auto  border-2">{routine.notes}</h3>
        </div>

        {/* <pre>{JSON.stringify(routine, null, 2)}</pre> */}
        {routine &&
          routine.exercises &&
          Array.isArray(routine.exercises) &&
          routine.exercises.map(function (exercise) {
            return (
              <div
                key={exercise.routine_exercise_id}
                className=" w-full h-10 border-black border-2 flex justify-center px-3  "
              >
                <h3 className="w-1/2 mt-1">{exercise.exercise_name}</h3>

                <div
                  key={`${exercise.routine_exercise_id}-setsDiv`}
                  className="w-1/2 text-right flex justify-center "
                >
                  <h3 className="w-1/2 mt-1">Sets: {exercise.sets}</h3>
                </div>
              </div>
            );
          })}
        <div className=" w-full h-auto mb-3 mt-2">
          <Button path="" label="+ Add Exercise"></Button>
        </div>
        <Button path="" label="Start This Workout"></Button>
      </PageLayout>
    </>
    //TODO - if sets dont exist why is it showing th value of the one that does exist for both
  );
}

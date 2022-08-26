import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";

import PageLayout from "../../../src/components/PageLayout";
import Button from "../../../src/components/Button";
import FullScreenSpinner from "../../../src/components/FullScreenSpinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { lowerCaseFirstLetter } from "../../_app";
import { useUser } from "@auth0/nextjs-auth0";

//Constants
const workoutTitle = "Hypertrophy";
const workoutPathTitle = lowerCaseFirstLetter(workoutTitle);
//constants

export default function startWorkout() {
  const { query, isReady } = useRouter();
  const [routine, setRoutine] = useState({
    name: "",
    notes: "",
    exercises: [],
  });
  const [isLoading, setLoading] = useState(true);
  const [exerciseWeight, setExerciseWeight] = useState(0);

  useEffect(() => {
    if (!isReady) return;

    async function effect() {
      setLoading(true);
      const { routineId } = query;

      const response = await fetch(
        `/api/routine_exercise?routine_id=${routineId}`
      );
      const result = await response.json();
      console.log({ result });
      if ("message" in result) {
        console.error(result.message);
      } else {
        setRoutine({
          exercises: [],
          ...result,
        });
      }
      setLoading(false);
    }

    effect();
  }, [query, isReady]);

  console.log(routine.exercises.length);

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

        {routine &&
          routine.exercises &&
          Array.isArray(routine.exercises) &&
          routine.exercises.map(function (exercise) {
            return (
              <form
                key={`${exercise.routine_exercise_id}-setsDiv`}
                className="w-full text-center mb-2"
                method="post"
                data-validate="parsley"
                // onSubmit={handleSubmit}
              >
                <div
                  key={exercise.routine_exercise_id}
                  className=" w-full h-10 border-black border-2 flex justify-center px-3  "
                >
                  <h3 className="w-1/2 mt-1">{exercise.exercise_name}</h3>

                  <div className="w-1/2 text-right flex justify-center ">
                    <h3 className="w-full mt-1">
                      Sets: {exercise.planned_sets} Reps:{" "}
                      {exercise.planned_reps}
                    </h3>
                  </div>
                </div>

                <input
                  className="border-2 border-black w-full h-10 text-center"
                  type="text"
                  placeholder="  Weight (Kg)"
                  name="Weight (Kg)"
                  data-type="Weight (Kg)"
                  //       value={exerciseWeight}
                  //        onChange={(e) => {
                  //   setExerciseWeight(e.target.value);
                  //         }}
                />
              </form>
            );
          })}
        {/* //TODO - Pressing button logs workout weights and directs back to  athlete homepage*/}
        <div className=" w-full h-auto mb-3 mt-2">
          <Button path="/athlete" label="Complete Workout"></Button>
        </div>
      </PageLayout>
    </>
  );
}

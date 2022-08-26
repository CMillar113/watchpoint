import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";

import PageLayout from "../../../src/components/PageLayout";
import Button from "../../../src/components/Button";
import FullScreenSpinner from "../../../src/components/FullScreenSpinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function routineDisplay() {
  const { query, isReady } = useRouter();
  const [workout, setWorkoutTitle] = useState(" ");
  const [workoutId, setWorkoutId] = useState(" ");
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
      const { routineId, workout, workoutId } = query;
      setWorkoutTitle(workout);
      setWorkoutId(workoutId);
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

  const workoutTitle = workout;

  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <>
      <Meta title={workoutTitle} />
      <Navbar
        title="Routine"
        backPath={`/workouts/element/routineMenu?workout=${workoutTitle}&workoutId=${workoutId}`}
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
              <div
                key={exercise.routine_exercise_id}
                className=" w-full h-10 border-black border-2 flex justify-center px-3  "
              >
                <h3 className="w-1/2 mt-1">{exercise.exercise_name}</h3>

                <div
                  key={`${exercise.routine_exercise_id}-setsDiv`}
                  className="w-1/2 text-right flex justify-center "
                >
                  <h3 className="w-full mt-1">
                    Sets: {exercise.planned_sets} Reps: {exercise.planned_reps}
                  </h3>
                </div>
              </div>
            );
          })}
        <div className=" w-full h-auto mb-3 mt-2">
          <Button
            path={`/workouts/element/exerciseCategories?workout=${workoutTitle}&workoutId=${workoutId}&routineId=${query.routineId}`}
            label="+ Add Exercise"
          ></Button>
        </div>
        <Button
          path={`/workouts/element/startWorkout?workout=${workoutTitle}&workoutId=${workoutId}&routineId=${query.routineId}`}
          label="Start This Workout"
        ></Button>
      </PageLayout>
    </>
  );
}

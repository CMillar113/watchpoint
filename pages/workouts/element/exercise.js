import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import PageLayout from "../../../src/components/PageLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import buttonStyles from "../../../styles/Button.module.css";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

export default function exercise() {
  const [workout, setWorkoutTitle] = useState(" ");
  const [workoutId, setWorkoutId] = useState(" ");
  const { query, isReady } = useRouter();
  const [isLoading, setLoading] = useState();
  const [newExercise, setNewExercise] = useState("");
  const { user } = useUser();
  const [exercise, setExercise] = useState({
    exercises: [],
  });

  useEffect(() => {
    if (!isReady) return;
    if (!user) return;

    async function effect() {
      setLoading(true);
      const { id, workout, workoutId } = query;
      setWorkoutTitle(workout);
      setWorkoutId(workoutId);
      const response = await fetch(
        `/api/exercise_category?exerciseCategoryId=${id}&athlete0Id=${user.sub}`
      );
      const result = await response.json();
      console.log({ result });
      if ("message" in result) {
        console.error(result.message);
      } else {
        setExercise(result);
      }
      setLoading(false);
    }

    effect();
  }, [query, isReady, user]);

  const workoutTitle = workout;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = query;
    const data = { newExercise };
    console.log({ "submitted data": newExercise });
    try {
      const response = await fetch(
        `/api/routines/createExercise?exerciseCategoryid=${id}&exerciseName=${newExercise}&athlete0Id=${user.sub}`,
        {
          //create exercie in exercise table  id is exercsie category id
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        if (query.routineId) {
          Router.push(
            `/workouts/element/exercise?id=${id}&workout=${workout}&workoutId=${workoutId}&routineId=${query.routineId}`
          );
        } else {
          Router.push(`/workouts/element/exercise?id=${id}`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = async (e, exerciseId) => {
    try {
      const routineId = query.routineId;
      const data = { routineId, exerciseId };
      const response = await fetch(
        `/api/routines/addExercise?routineId=${routineId}&exerciseId=${exerciseId}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log("Add exercise to routine:", { result });

      if (response.ok) {
        //Get last added routine_exercise_id  for that routine and pass onto SetsAndReps page
        const response2 = await fetch(
          `/api/routines/getRoutineExerciseId?routineId=${routineId}`
        );
        const result2 = await response2.json();
        console.log(result2);
        const routineExerciseId = result2[0].routine_exercise_id;
        Router.push(
          `/workouts/element/setsAndReps?workout=${workoutTitle}&workoutId=${workoutId}&routineExerciseId=${routineExerciseId}&routineId=${routineId}`
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Meta title="Exercise List" />
      <Navbar
        title="Exercise:"
        backPath={`/workouts/element/routineMenu?workout=${workoutTitle}&workoutId=${workoutId}`}
      />
      <PageLayout>
        <p className="text-center mb-3">
          Please Select Exercise to Add to Routine
        </p>
        <div>
          {exercise.exercises &&
            Array.isArray(exercise.exercises) &&
            exercise.exercises.map(function (metric) {
              return (
                <button
                  key={`${metric.exercise_name}-btn`}
                  className="h-10 w-full rounded-md border-black border-2 bg-slate-300 mb-2 place-content-center"
                  onClick={(e) => handleAdd(e, metric.exercise_id)}
                >
                  {" "}
                  {metric.exercise_name}
                </button>
              );
            })}
        </div>
        <form
          className="w-full text-center"
          method="post"
          data-validate="parsley"
          onSubmit={handleSubmit}
        >
          <div className=" w-full mb-2 text-center">
            <input
              className="border-2 border-black w-8/12 h-10"
              type="text"
              placeholder=" New exercise Name"
              name="newExercise"
              data-required="true"
              data-type="steps"
              data-error-message="Enter a name for the exercise "
              value={newExercise}
              onChange={(e) => {
                setNewExercise(e.target.value);
              }}
            />
          </div>

          <input
            className={`mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg border-2 border-black ${buttonStyles.primary}`}
            type="submit"
            value="Create Exercise"
          />
        </form>
      </PageLayout>
    </>
  );
}

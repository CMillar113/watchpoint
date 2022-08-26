import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import PageLayout from "../../../src/components/PageLayout";
import Button from "../../../src/components/Button";
import { useEffect, useState } from "react";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { lowerCaseFirstLetter } from "../../_app";
import buttonStyles from "../../../styles/Button.module.css";
import { useRouter } from "next/router";

//Constants
const workoutTitle = "Hypertrophy";
const workoutPathTitle = lowerCaseFirstLetter(workoutTitle);
const elementID = 3;
//constants

export default function createRoutine() {
  const { query, isReady } = useRouter();
  const [exerciseSets, setSets] = useState("");
  const [exerciseReps, setReps] = useState("");
  const [routineExerciseId, setRoutineExerciseId] = useState(0);
  const [routineId, setRoutineId] = useState(0);

  useEffect(() => {
    if (!isReady) return;
    async function effect() {
      const { routineExerciseId, routineId } = query;
      setRoutineExerciseId(routineExerciseId);
      setRoutineId(routineId);
    }
    effect();
  }, [query, isReady]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { exerciseSets, exerciseReps };
    console.log({ "submitted data": exerciseSets, exerciseReps });
    try {
      const response = await fetch(
        `/api/routines/createSetsAndReps?routineExerciseId=${routineExerciseId}&sets=${exerciseSets}&reps=${exerciseReps}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        Router.push(`/workouts/hypertrophy/routineDisplay?id=${routineId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Meta title="Sets & Reps" />
      <Navbar
        title="Sets"
        backPath={`/workouts/${workoutPathTitle}/routineMenu`}
      />
      <PageLayout>
        <form
          className="mt-3"
          id="newRoutine"
          onSubmit={handleSubmit}
          method="post"
          data-validate="parsley"
        >
          <h3 className="text-center">Sets:</h3>

          <input
            className="h-8 border-2 w-full mb-1 text-center"
            type="text"
            placeholder="Sets"
            name="Sets"
            id="Sets"
            data-required="true"
            data-error-message="Add Sets"
            value={exerciseSets}
            onChange={(e) => {
              setSets(e.target.value);
            }}
          />
          <h3 className="text-center">Reps:</h3>
          <input
            className="h-8 border-2 w-full mb-1 text-center"
            type="text"
            placeholder="Reps:"
            name="Reps"
            id="Reps:"
            data-required="true"
            data-error-message="Add Reps"
            value={exerciseReps}
            onChange={(e) => {
              setReps(e.target.value);
            }}
          />

          <div className=" w-full flex justify-center">
            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg border-2 border-black text-center ${buttonStyles.primary}`}
              type="submit"
              value="Add to Routine"
            />
          </div>
        </form>
      </PageLayout>
    </>
  );
}

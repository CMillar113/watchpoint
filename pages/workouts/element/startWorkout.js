import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";

import PageLayout from "../../../src/components/PageLayout";
import FullScreenSpinner from "../../../src/components/FullScreenSpinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from "react";

import Router from "next/router";
import buttonStyles from "../../../styles/Button.module.css";

const today = new Date().toISOString().substring(0, 10);

export default function startWorkout() {
  const { query, isReady } = useRouter();
  const [workout, setWorkoutTitle] = useState(" ");
  const [workoutId, setWorkoutId] = useState(" ");
  const [routineExerciseId, setRoutineExerciseId] = useState(0); // so that it updates correct data entery
  const [routineId, setRoutineId] = useState("");

  const [routine, setRoutine] = useState({
    name: "",
    notes: "",
    exercises: [], //TODO - Remove
  });
  const [isLoading, setLoading] = useState(true);
  const [exerciseWeight, setExerciseWeight] = useState(0);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (!isReady) return;

    async function effect() {
      setLoading(true);
      const { routineId, workout, workoutId } = query;
      setWorkoutTitle(workout);
      setWorkoutId(workoutId);

      setRoutineId(routineId);

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

      const _exercises = result.exercises.map((exercise) => ({
        ...exercise,
        weight: 0,
      }));
      setExercises(_exercises);

      setLoading(false);
    }

    effect();
  }, [query, isReady]);

  useEffect(() => {
    // Check exercises updates corrrectly through entery
    console.log("updated exercises state", { exercises });
  }, [exercises]);

  //TODO- on submit updates workout_logged table with weight values for specific rouitne_exercise_id's

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(exercises);
    exercises.forEach((exercise) => {
      const routineExerciseId = exercise.routine_exercise_id;
      const log = exercise.weight;
      try {
        const response = fetch(
          `/api/routines/logWorkout?routineExerciseId=${routineExerciseId}&date=${today}&log=${log}`,
          {
            method: "POST",
            body: JSON.stringify(exercises),
          }
        );
        const result = response.json();

        if (response.ok) {
          console.log(response);
        }
      } catch (e) {
        console.error(e);
      } finally {
        Router.push("/athlete");
      }
    });
  };

  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <>
      <Meta title={workout} />
      <Navbar title={today} />
      <PageLayout>
        <div className="w-full h-auto text-center border-black border-2 rounded-md mb-5">
          <h3 className="w-full h-auto border-2">{routine.name}</h3>
          <h3 className="w-full h-auto  border-2">{routine.notes}</h3>
        </div>

        <form className="w-full text-center mb-2" onSubmit={handleSubmit}>
          {exercises &&
            Array.isArray(exercises) &&
            exercises
              .sort((a, b) => a.routine_exercise_id - b.routine_exercise_id)
              .map(function (exercise) {
                return (
                  <div className="w-11/12" key={exercise.routine_exercise_id}>
                    <div className=" w-full h-10 border-black border-2 flex justify-center px-3  ">
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
                      placeholder={exercise.weight}
                      name="Weight (Kg)"
                      data-type="Weight (Kg)"
                      value={
                        exercises.find(
                          (ex) =>
                            ex.routine_exercise_id ===
                            exercise.routine_exercise_id
                        ).weight || 0
                      }
                      onChange={(e) => {
                        const newWeight = e.target.value;
                        // updateing weight key on only this exercise object
                        const exerciseToUpdate = {
                          ...exercise,
                          weight: newWeight,
                        };
                        // removing the exercise to prevent duplication
                        const exercisesWithoutUnupdated = exercises.filter(
                          (ex) =>
                            ex.routine_exercise_id !==
                            exercise.routine_exercise_id
                        );
                        // add the updated exercise back into an array with the updated state
                        const updatedExercises = [
                          ...exercisesWithoutUnupdated,
                          exerciseToUpdate,
                        ];

                        setExercises(updatedExercises);
                      }}
                    />
                  </div>
                );
              })}

          <div className=" w-full flex justify-center">
            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg border-2 border-black text-center ${buttonStyles.primary}`}
              type="submit"
              value="Complete Workout"
            />
          </div>
        </form>
      </PageLayout>
    </>
  );
}

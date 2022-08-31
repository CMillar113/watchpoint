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

export default function createRoutine() {
  const [workout, setWorkoutTitle] = useState(" ");
  const [workoutId, setWorkoutId] = useState(" ");
  const [routineName, setroutineName] = useState("");
  const [routineNote, setroutineNote] = useState("");
  const { query, isReady } = useRouter();
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

  const workoutTitle = workout;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!routineName) {
      routineName = "Undefined";
    }
    const data = { routineName, routineNote };

    let id = user.sub;
    console.log({ "submitted data": routineName, routineNote });
    try {
      const response = await fetch(
        `/api/routines/createRoutine?id=${id}&routineName=${routineName}&routineNote=${routineNote}&elementid=${workoutId}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result }); //TODO - return routine_id of new created routine and pass to add exercise pages

      if (response.ok) {
        Router.push(
          `/workouts/element/routineMenu?workout=${workoutTitle}&workoutId=${workoutId}`
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Meta title="New Routine" />
      <Navbar
        title="New"
        backPath={`/workouts/element/routineMenu?workout=${workoutTitle}&workoutId=${workoutId}`}
      />
      <PageLayout>
        <form
          className="mt-3"
          id="newRoutine"
          onSubmit={handleSubmit}
          method="post"
          data-validate="parsley"
        >
          <p className=" text-center text-slate-700 mb-4 mt-2">
            Add information about your routine
          </p>

          <h3 className="text-center">Name New Routine</h3>

          <input
            className="h-8 border-2 w-full mb-1 text-center"
            type="text"
            placeholder="Routine Name:"
            name="Routine Name"
            id="Routine Name"
            data-required="true"
            data-error-message="Name Routine"
            value={routineName}
            onChange={(e) => {
              setroutineName(e.target.value);
            }}
          />
          <h3 className="text-center">Routine Notes</h3>
          <input
            className="h-8 border-2 w-full mb-1 text-center"
            type="text"
            placeholder="Routine Notes:"
            name="Routine Notes"
            id="Routine Notes"
            data-required="true"
            data-error-message="Enter Routine Notes"
            value={routineNote}
            onChange={(e) => {
              setroutineNote(e.target.value);
            }}
          />

          <div className=" w-full flex justify-center">
            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg border-2 border-black text-center ${buttonStyles.primary}`}
              type="submit"
              value="Create Routine"
            />
          </div>
        </form>
      </PageLayout>
    </>
  );
}

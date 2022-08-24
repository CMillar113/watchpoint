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
  const [routineName, setroutineName] = useState(0);
  const [routineNote, setroutineNote] = useState(0);
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { routineName, routineNote };
    let id = user.sub;
    console.log({ "submitted data": routineName, routineNote });
    try {
      const response = await fetch(
        `/api/routines/createRoutine?id=${id}&routineName=${routineName}&routineNote=${routineNote}&elementid=${elementID}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result }); //TODO - return routine_id of new created routine and pass to add exercise pages

      if (response.ok) {
        Router.push("/workouts/hypertrophy/routineMenu");
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

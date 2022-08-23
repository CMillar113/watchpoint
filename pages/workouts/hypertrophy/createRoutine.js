import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import PageLayout from "../../../src/components/PageLayout";
import Button from "../../../src/components/Button";
import { useEffect, useState } from "react";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { lowerCaseFirstLetter } from "../../_app";
import buttonStyles from "../../../styles/Button.module.css";

export default function createRoutine() {
  const [routineName, setroutineName] = useState(0);
  const [routineNote, setroutineNote] = useState(0);

  //TODO - put into if loop to create 'x' amount
  const [exerciseName1, setExerciseName1] = useState(0);
  //TODO - put into if loop to create 'x' amount

  return (
    <form
      id="macroForm"
      //   onSubmit={handleSubmit}
      method="post"
      data-validate="parsley"
    >
      <h3 className="text-center">New Macros:</h3>

      <input
        className="h-8 border-2 w-full mb-1 text-center"
        type="number"
        placeholder="New Protein (g)"
        name="protein"
        id="protein"
        data-required="true"
        data-error-message="Enter Protein value"
        value={exercise1}
        onChange={(e) => {
          setRoutineExercise1(e.target.value);
        }}
      />
      <input
        className="h-8 border-2 w-full mb-1 text-center"
        type="number"
        placeholder="New Carbs (g)"
        name="carbs"
        id="carbs"
        data-required="true"
        data-error-message="Enter Carbohydrate value"
        value={exercise2}
        onChange={(e) => {
          setRoutineExercise2(e.target.value);
        }}
      />
      <input
        className="h-8 border-2 w-full text-center"
        type="number"
        placeholder="New Fat (g)"
        name="fat"
        id="fat"
        data-required="true"
        data-error-message="Enter Fat value"
        value={exercise3}
        onChange={(e) => {
          setRoutineExercise3(e.target.value);
        }}
      />
      <div
        id="previous"
        className="w-full inline-block border-2 text-xs text-center mt-1"
      >
        {" "}
        <h3>Water Goals (L):</h3>
      </div>

      <input
        className="h-8 border-2 w-full text-center"
        type="number"
        placeholder="water"
        name="water"
        id="water"
        data-required="true"
        data-error-message="Enter water value"
        value={exercise4}
        onChange={(e) => {
          setRoutineExercise4(e.target.value);
        }}
      />

      <div className=" w-full flex justify-center">
        <input
          className={`mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg border-2 border-black text-center ${buttonStyles.primary}`}
          type="submit"
          value="Update"
        />
      </div>
    </form>
  );
}

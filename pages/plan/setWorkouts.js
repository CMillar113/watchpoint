import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function setWorkouts() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [hypertrophy, setHypertrophytNumber] = useState(0);
  const [cardio, setCardioNumber] = useState(0);
  const hypertrophyElementId = 3;
  const cardioElementId = 4;

  const handleSubmitHypertrophy = async (e) => {
    e.preventDefault();

    const data = { hypertrophy };
    let id = user.sub;
    console.log({ "submitted data": hypertrophy, id });
    try {
      const response = await fetch(
        `/api/workout/createWorkoutGoals?id=${id}&elementID=${hypertrophyElementId}&goalValue=${hypertrophy}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        console.log("Complete");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitCardio = async (e) => {
    e.preventDefault();

    const data = { cardio };
    let id = user.sub;
    console.log({ "submitted data": cardio, id });
    try {
      const response = await fetch(
        `/api/workout/createWorkoutGoals?id=${user.sub}&elementID=${cardioElementId}&goalValue=${cardio}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        console.log("Complete");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Meta title="Workout Plan" />
      <Navbar title="Workouts" backPath={"/plan/setHealthcare"} />
      <PageLayout>
        {/* If hypertrophy workouts selected */}
        <h3 className="px-2">Hypertrophy Workouts</h3>

        <form
          className="flex justify-center"
          onSubmit={handleSubmitHypertrophy}
          id="hypertrophyForm"
          method="post"
          data-validate="parsley"
        >
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Number Per Week"
            name="hypertrophy"
            id="hypertrophy"
            data-required="true"
            data-error-message="Enter Hypertrophy Workouts Per Week"
            value={hypertrophy}
            onChange={(e) => {
              setHypertrophytNumber(e.target.value);
            }}
          />
          <input
            className={` w-1/2 h-full text-h2-mobile bg-primary-bg border-2 border-black text-center ${buttonStyles.primary}`}
            type="submit"
            value="Update"
          />
        </form>
        <p className=" text-primary-fadedtext text-xs flex justify-center">
          How many hypertrophy gym workouts per week would you like to hit?
        </p>

        {/* If Cardio workout selected */}
        <h3 className="px-2 mt-4">Cardio Workouts</h3>
        <form
          className="flex justify-center"
          id="cardioForm"
          method="post"
          data-validate="parsley"
          onSubmit={handleSubmitCardio}
        >
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Number Per Week"
            name="cardio"
            id="cardio"
            data-required="true"
            data-error-message="Enter Cardio Workouts Per Week"
            value={cardio}
            onChange={(e) => {
              setCardioNumber(e.target.value);
            }}
          />
          <input
            className={` w-1/2 h-full text-h2-mobile bg-primary-bg border-2 border-black text-center ${buttonStyles.primary}`}
            type="submit"
            value="Update"
          />
        </form>
        <p className=" text-primary-fadedtext text-xs flex justify-center mb-4">
          How many cardio workouts per week would you like to hit?
        </p>

        <Button path="/athlete" label="Confirm Goals"></Button>
      </PageLayout>
    </>
  );
}

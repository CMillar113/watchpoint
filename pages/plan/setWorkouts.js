import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import Router from "next/router";

export default function setWorkouts() {
  return (
    <>
      <Meta title="Workout Plan" />
      <Navbar title="Workouts" backPath={"/plan/setHealthcare"} />
      <PageLayout>
        {/* If hypertrophy workouts selected */}
        <h3 className="px-2">Hypertrophy Workouts</h3>

        <form
          className="flex justify-center"
          id="hypertrophyForm"
          method="post"
          data-validate="parsley"
        >
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Number of Hypertrophy Workouts Per Week"
            name="bodyweight"
            id="bodyweight"
            data-required="true"
            data-error-message="Enter Hypertrophy Workouts Per Week"
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
        >
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Number of Cardio Workouts Per Week"
            name="steps"
            id="steps"
            data-required="true"
            data-error-message="Enter Cardio Workouts Per Week"
          />
        </form>
        <p className=" text-primary-fadedtext text-xs flex justify-center mb-4">
          How many cardio workouts per week would you like to hit?
        </p>

        <Button
          path="/athlete"
          label="Confirm"
          onClick={submitForms()}
        ></Button>
      </PageLayout>
    </>
  );
}

function submitForms() {
  // document.getElementById("hypertrophyForm").submit(); //TODO - Fix this so both forms get submitted when db is working
  // document.getElementById("cardioForm").submit();
  console.log("Why does this print before clicks");
}

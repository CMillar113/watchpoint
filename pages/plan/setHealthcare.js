import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import Router from "next/router";

export default function setHealthcare() {
  return (
    <>
      <Meta title="Healthcare Plan" />
      <Navbar title="Healthcare" backPath={"/plan/setNutrition"} />
      <PageLayout>
        {/* If bodyweight selected */}
        <h3 className="px-2">Bodyweight Goals</h3>
        <Button path="BMICalculator" label="Go To - BMI Calculator "></Button>

        <form
          className="justify-center flex"
          id="bodyweightForm"
          // action="submitForms()"
          method="post"
          data-validate="parsley"
        >
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Current Bodyweight (Kg)"
            name="bodyweight"
            id="bodyweight"
            data-required="true"
            data-error-message="Enter Current Bodyweight in Kg"
          />
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Goal Bodyweight (Kg)"
            name="bodyweightGoal"
            id="bodyweightGoal"
            data-required="true"
            data-error-message="Enter Goal Bodyweight in Kg"
          />
        </form>

        {/* If steps selected */}
        <h3 className="px-2 mt-4">Daily Steps Goal</h3>
        <form
          className="flex justify-center"
          id="stepsForm"
          method="post"
          data-validate="parsley"
        >
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Number of Steps"
            name="steps"
            id="steps"
            data-required="true"
            data-error-message="Enter Daily Steps Goal"
          />
        </form>

        {/* If sleep is selected */}
        <h3 className="px-2 mt-4">Hours of Sleep Goal</h3>
        <form
          className="flex justify-center"
          id="sleepForm"
          method="post"
          data-validate="parsley"
        >
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Hours of Sleep"
            name="sleep"
            id="sleep"
            data-required="true"
            data-error-message="Enter Sleep Goal"
          />
        </form>

        <Button
          path="/plan/setWorkouts"
          label="Confirm"
          onClick={submitForms()}
        ></Button>

        {/* If sleep selected */}
        {/* if any workouts selected */}
      </PageLayout>
    </>
  );
}

function submitForms() {
  // document.getElementById("bodyweightForm").submit(); //TODO - Fix this so both forms get submitted when db is working
  // document.getElementById("stepsForm").submit();
  // document.getElementById("sleepForm").submit();
  console.log("Why does this print before clicks");
}

import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import Router from "next/router";

export default function calorieCalculator() {
  return (
    <>
      <Meta title="Calorie Calculator" />
      <Navbar title="Calorie Calculator" backPath={"/plan/setNutrition"} />
      <PageLayout>
        <h3 className="px-2">Details</h3>
        <form
          className="justify-center flex-column "
          id="calorieCalculatorForm"
          // action="submitForms()"
          method="post"
          data-validate="parsley"
        >
          {/* Choose Gender */}
          <label className="flex items-center mb-2">
            <input
              type="radio"
              className="checked:bg-blue-500 w-10 h-10 mr-5 "
              name="gender"
              value="gender"
            />
            Male
          </label>
          <label className="flex items-center ">
            <input
              type="radio"
              className="checked:bg-blue-500 w-10 h-10 mr-5 "
              name="gender"
              value="gender"
            />
            Female
          </label>
          {/* Input personal details */}
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Age"
            name="age"
            id="age"
            data-required="true"
            data-error-message="Enter Age in Years"
          />
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Height (cm)"
            name="height"
            id="height"
            data-required="true"
            data-error-message="Enter Height in cm"
          />
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Bodyweight (Kg)"
            name="weight"
            id="weight"
            data-required="true"
            data-error-message="Enter Bodyweight in Kg"
          />
          {/* Select Activity Level */}
          <label className="flex items-center mb-2">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5 "
              name="activityLevel"
              value="activityLevel"
            />
            Sedentary: Little to no exercise
          </label>
          <label className="flex items-center mb-2 ">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5 "
              name="activityLevel"
              value="activityLevel"
            />
            Light: Exercise 1-3 times/week
          </label>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5 "
              name="activityLevel"
              value="activityLevel"
            />
            Moderate: Exercise 4-5 times/week
          </label>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5 "
              name="activityLevel"
              value="activityLevel"
            />
            Active: Daily exercise or intense exercise 3-4 times/week
          </label>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5 "
              name="activityLevel"
              value="activityLevel"
            />
            Very Active: Intense exercise 6-7 times/week
          </label>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5 "
              name="activityLevel"
              value="activityLevel"
            />
            Extra Active: Very intense exercise daily
          </label>
        </form>

        {/* Want to reload page with populated caloreis and water intake */}
        <Button
          path="/plan/calorieCalculator"
          label="Calculate"
          onClick={() => submitForms()}
        ></Button>
        <hr className="bg-primary-text"></hr>

        <div className=" columns-2 flex justify-center mt-10">
          <div className="  h-10 w-1/3 border-2 border-black rounded-lg px-2 text-center ">
            Kcal
          </div>
          <div className="  h-10 w-1/3 border-2 border-black rounded-lg px-2 text-center ">
            Litres
          </div>
        </div>

        {/* Pass calculated macros to nutrition page */}
        <Button
          path="/plan/setNutrition"
          label="Use These"
          onClick={submitForms}
        ></Button>

        {/* If sleep selected */}
        {/* if any workouts selected */}
      </PageLayout>
    </>
  );
}

function submitForms() {
  // document.getElementById("calorieCalculatorForm").submit(); //TODO - Fix this so both forms get submitted when db is working
  console.log("Why does this print before clicks");
}

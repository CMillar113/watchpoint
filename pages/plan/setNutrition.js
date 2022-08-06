import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import Router from "next/router";

export default function setGoals() {
  return (
    <>
      <Meta title="Nutrition Plan" />
      <Navbar title="Nutrition" backPath={"/plan/selectElements"} />
      <PageLayout>
        {/* If calories selected */}

        <h3 className="px-2">Calories & Macros</h3>
        <Button
          path="calorieCalculator"
          label="Go To - Calorie/Water Calculator "
        ></Button>
        <div
          id="left side"
          className="w-1/2 inline-block border-2 text-xs text-center mt-3"
        >
          <h3>Previous Calories:</h3>
          <div
            id="row"
            className="h-8 w-full bg-gray-300 flex items-center justify-center mb-1"
          >
            <h3>Previous Calories PH</h3>
          </div>
          <h3>Previous Macros:</h3>
          <div
            id="row"
            className="h-8 w-full bg-gray-300 flex items-center justify-center mb-1"
          >
            <h3>Protein PH</h3>
          </div>
          <div
            id="row"
            className="h-8 w-full bg-gray-300 flex items-center justify-center mb-1"
          >
            <h3>Carbs PH</h3>
            <br />
          </div>
          <div
            id="row"
            className="h-8 w-full bg-gray-300 flex items-center justify-center "
          >
            <h3>Fats PH</h3>
            <br />
          </div>
        </div>
        {/* RightSide Form*/}
        <div
          id="right side"
          className=" w-1/2 inline-block border-2 text-xs text-center"
        >
          <h3>New Calories:</h3>
          <div
            id="row"
            className="h-8 w-full bg-gray-300 flex items-center justify-center mb-1"
          >
            <h3>New Calories PH</h3>
          </div>
          <h3>New Macros:</h3>
          <form
            id="macroForm"
            // action="submitForms()"
            method="post"
            data-validate="parsley"
          >
            <input
              className="h-8 border-2 w-full mb-1 text-center"
              type="number"
              placeholder="New Protein (g)"
              name="protein"
              id="protein"
              data-required="true"
              data-error-message="Enter Protein value"
            />
            <input
              className="h-8 border-2 w-full mb-1 text-center"
              type="number"
              placeholder="New Carbs (g)"
              name="carbs"
              id="carbs"
              data-required="true"
              data-error-message="Enter Carbohydrate value"
            />
            <input
              className="h-8 border-2 w-full text-center"
              type="number"
              placeholder="New Fat (g)"
              name="fat"
              id="fat"
              data-required="true"
              data-error-message="Enter Fat value"
            />
          </form>
        </div>
        <p className="text-primary-fadedtext text-center text-sm mt-2">
          {" "}
          Enter goal macros for the week and your new calories will be
          calculated{" "}
        </p>
        {/* If water Intake Selected */}
        <h3 className="mt-5 px-2">Water Intake</h3>
        <form
          className="flex justify-center"
          id="waterForm"
          // action="submitForms()"
          method="post"
          data-validate="parsley"
        >
          <input
            className="h-8 border-2 w-2/3 mb-1 mt-1 flex justify-center text-center"
            type="number"
            placeholder="Water Intake (Litres)"
            name="water"
            id="water"
            data-required="true"
            data-error-message="Enter Daily Water Intake value"
          />
        </form>
        <p className="text-primary-fadedtext text-sm text-center px-2">
          {" "}
          The daily recommended amount for a healthy adult is 2 litres
        </p>

        <Button
          path="/plan/setHealthcare"
          label="Confirm"
          onClick={submitForms()}
        ></Button>

        {/* If bodyweight selected */}
        {/* If steps selected */}
        {/* If sleep selected */}
        {/* if any workouts selected */}
      </PageLayout>
    </>
  );
}

function submitForms() {
  // document.getElementById("macroForm").submit(); //TODO - Fix this so both forms get submitted when db is working
  // document.getElementById("waterForm").submit();
  console.log("Why does this print before clicks");
}

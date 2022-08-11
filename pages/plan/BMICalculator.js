import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import Router from "next/router";

export default function BMICalculator() {
  return (
    <>
      <Meta title="BMI Calculator" />
      <Navbar title="BMI Calculator" backPath={"/plan/setHealthcare"} />
      <PageLayout>
        <h3 className="px-2">Details</h3>
        <form
          className="justify-center flex-column "
          id="BMICalculatorForm"
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
        </form>

        {/* Want to reload page with populated caloreis and water intake */}
        <Button
          path="/plan/BMICalculator"
          label="Calculate"
          onClick={submitForms()}
        ></Button>

        <hr className="bg-primary-text"></hr>

        <div className=" columns-2 flex justify-center mt-10">
          <h3 className="h-10 w-1/3 text-center text-primary-fadedtext ">
            BMI Value
          </h3>
          <h3 className="h-10 w-1/3 text-center text-primary-fadedtext ">
            BMI Status
          </h3>
        </div>

        <div className=" columns-2 flex justify-center">
          <div className="  h-10 w-1/3 border-2 border-black rounded-lg px-2 text-center "></div>
          <div className="  h-10 w-1/3 border-2 border-black rounded-lg px-2 text-center "></div>
        </div>

        {/* Pass calculated macros to nutrition page */}
        <Button
          path="/plan/setHealthcare"
          label="Back"
          onClick={submitForms()}
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

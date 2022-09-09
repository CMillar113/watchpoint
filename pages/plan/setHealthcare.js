import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import buttonStyles from "../../styles/Button.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { useRouter } from "next/router";

export default function setHealthcare() {
  const { user } = useUser();
  const router = useRouter();
  const [steps, setSteps] = useState("");
  const [bodyweight, setBodyweight] = useState("");

  // Only 2 healthcare elements require goals
  const bodyweightElementId = 7;
  const stepsElementId = 8;

  //FORM HANDLE SUBMIT
  const handleSubmitBw = async (e) => {
    e.preventDefault();

    const data = { bodyweight };
    let id = user.sub;
    console.log({ "submitted data": bodyweight, id });
    try {
      const response = await fetch(
        `/api/healthcare/createHealthcareGoals?id=${user.sub}&elementID=${bodyweightElementId}&goalValue=${bodyweight}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        console.log("complete");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleSubmitSteps = async (e) => {
    e.preventDefault();

    const data = { steps };
    let id = user.sub;
    console.log({ "submitted data": steps, id });
    try {
      const response = await fetch(
        `/api/healthcare/createHealthcareGoals?id=${user.sub}&elementID=${stepsElementId}&goalValue=${steps}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        router.push("/plan/setHealthcare");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Meta title="Healthcare Plan" />
      <Navbar title="Healthcare" backPath={"/plan/setNutrition"} />
      <PageLayout>
        <p className=" text-center text-slate-700  px-2">
          Use the BMI calculator to guage your starting point
        </p>
        <Button path="BMICalculator" label="Use BMI Calculator"></Button>

        <hr className="mt-2 mb-4"></hr>
        <p className=" text-center text-slate-700  mb-4  px-2">
          Only set targets for the elements you wish to track, there are no
          requirments !
        </p>
        <h3 className=" px-2 text-center bg-primary-bg">Bodyweight Goals:</h3>
        {/* bodyweight */}
        <form
          className="w-full content-center"
          onSubmit={handleSubmitBw}
          id="bodyweightForm"
          method="post"
          data-validate="parsley"
        >
          <input
            className="h-8 border-2 w-full mb-1 mt-1  text-center"
            type="number"
            placeholder="Goal Bodyweight (Kg)"
            name="bodyweightGoal"
            id="bodyweightGoal"
            data-required="true"
            data-error-message="Enter Goal Bodyweight in Kg"
            value={bodyweight}
            onChange={(e) => {
              setBodyweight(e.target.value);
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
        <hr className="mb-7"></hr>

        <h3 className="px-2 mt-4 text-center bg-primary-bg ">
          Daily Steps Goal:
        </h3>
        <form
          className="w-full"
          onSubmit={handleSubmitSteps}
          id="stepsForm"
          method="post"
          data-validate="parsley"
        >
          <input
            className="h-8 border-2 w-full mb-1 mt-1  text-center"
            type="number"
            placeholder="Number of Steps"
            name="steps"
            id="steps"
            data-required="true"
            data-error-message="Enter Daily Steps Goal"
            value={steps}
            onChange={(e) => {
              setSteps(e.target.value);
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
        <hr className="mb-7"></hr>

        <Button path="/plan/setWorkouts" label="Next"></Button>
      </PageLayout>
    </>
  );
}

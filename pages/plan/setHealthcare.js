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

export default function setHealthcare() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [steps, setSteps] = useState(0);
  const [bodyweight, setBodyweight] = useState(0);
  const [metrics, setMetrics] = useState(undefined);
  const bodyweightElementId = 7;
  const stepsElementId = 8;

  // useEffect(() => {
  //   if (!user) return;
  //   (async function () {
  //     setLoading(true);
  //     try {
  //       const auth0PrimaryKey = user.sub;
  //       const response = await fetch(
  //         `/api/athlete_elements?auth0=${auth0PrimaryKey}`
  //       );
  //       const result = await response.json();

  //       console.log({ result });

  //       if (response.ok) {
  //         setElements(result.metrics[0]);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [user]);

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const response = await fetch("/api/athlete_elements");
  //       const result = await response.json();

  //       if (response.ok) {
  //         setMetrics(result);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  // }, []);

  // let body = null;

  // if (metrics !== undefined && user !== undefined) {
  //   body = metrics
  //     .filter(function (metric) {
  //       // TODO - put filter in backend?
  //       return (
  //         metric.element_class_id === 2 && metric.unique_identifier === user.sub
  //       );
  //     })
  //     .map(function (metric) {
  //       return (
  //         <>

  //         </>
  //       );
  //     });
  // }

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
        {/* If bodyweight selected */}
        <h3 className="px-2 text-center">Bodyweight Goals:</h3>
        <Button path="BMICalculator" label="Go To - BMI Calculator "></Button>

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

          <input
            className={` w-1/2 h-full text-h2-mobile bg-primary-bg border-2 border-black text-center ${buttonStyles.primary}`}
            type="submit"
            value="Update"
          />
        </form>
        <hr className="mb-7"></hr>

        {/* If steps selected */}
        <h3 className="px-2 mt-4 text-center">Daily Steps Goal:</h3>
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

          <input
            className={` w-1/2 h-full text-h2-mobile bg-primary-bg border-2 border-black text-center ${buttonStyles.primary}`}
            type="submit"
            value="Update"
          />
        </form>
        <hr className="mb-3"></hr>

        <Button path="/plan/setWorkouts" label="Next"></Button>

        {/* If sleep selected */}
        {/* if any workouts selected */}
      </PageLayout>
    </>
  );
}

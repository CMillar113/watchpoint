import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import { Calories } from "../../src/constants";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function setGoals() {
  const { user } = useUser();
  const router = useRouter();
  const [loggedMacros, setLoggedMacros] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [water, setWater] = useState("");

  //get previous logged info to populate
  //create handle submit for new daat
  useEffect(() => {
    if (!user) return;
    (async function () {
      setLoading(true);
      try {
        const auth0PrimaryKey = user.sub;
        const response = await fetch(
          `/api/userNutrition?auth0=${auth0PrimaryKey}`
        );
        const result = await response.json();

        console.log({ result });

        if (response.ok) {
          setLoggedMacros(result.metrics[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  //CALORIE CALCS USING IMPORTED CONSTANTS
  const num =
    loggedMacros.protein * Calories.protein +
    loggedMacros.fats * Calories.fat +
    loggedMacros.carbs * Calories.carb;
  const calories = num.toString();

  //FORM HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { protein, carbs, fats, water };
    console.log({ "submitted data": user.sub, data });
    try {
      const response = await fetch(
        `/api/nutrition/createNutrition?id=${user.sub}&protein=${protein}&carbs=${carbs}&fats=${fats}&water=${water}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        router.push("/plan/setNutrition");
      }
    } catch (e) {
      console.error(e);
    }

    router.reload("/plans/setNutrition");
  };

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
          id="previous"
          className="w-full inline-block border-2 text-xs text-center mt-1"
        >
          <h3>Current Set Calories:</h3>
          <div
            id="row"
            className="h-8 w-full bg-gray-300 flex items-center justify-center mb-1"
          >
            <h3>{calories} Kcal</h3>
          </div>
          <h3>Current Set Macros:</h3>
          <div
            id="row"
            className="h-8 w-full bg-gray-300 flex items-center justify-center mb-1"
          >
            <h3>Protein: {loggedMacros.protein} g</h3>
          </div>
          <div
            id="row"
            className="h-8 w-full bg-gray-300 flex items-center justify-center mb-1"
          >
            <h3>Carbohydrates: {loggedMacros.carbs} g</h3>
            <br />
          </div>
          <div
            id="row"
            className="h-8 w-full bg-gray-300 flex items-center justify-center "
          >
            <h3>Fats: {loggedMacros.fats} g</h3>
            <br />
          </div>
        </div>

        {/* Form*/}
        <form
          id="macroForm"
          onSubmit={handleSubmit}
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
            value={protein}
            onChange={(e) => {
              setProtein(e.target.value);
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
            value={carbs}
            onChange={(e) => {
              setCarbs(e.target.value);
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
            value={fats}
            onChange={(e) => {
              setFats(e.target.value);
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
            value={water}
            onChange={(e) => {
              setWater(e.target.value);
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
        <p className="text-primary-fadedtext text-center text-sm mt-1">
          {" "}
          Enter goal macros for the week and your new calories will be
          calculated{" "}
        </p>

        <Button path="/plan/setHealthcare" label="Next"></Button>
      </PageLayout>
    </>
  );
}

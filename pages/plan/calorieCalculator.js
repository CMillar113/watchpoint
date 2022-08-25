import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import Router from "next/router";
import { useState } from "react";
import { calculateCalories } from "../../src/backend";
import { calculateWater } from "../../src/backend";

export default function calorieCalculator() {
  const [calories, setCalories] = useState(0);
  const [water, setWater] = useState(0);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [bodyweight, setBodyweight] = useState("");
  const [activityLevel, setActivityLevel] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dailyCalories = calculateCalories(
      gender,
      age,
      height,
      bodyweight,
      activityLevel
    );
    const dailyWater = calculateWater(bodyweight, activityLevel);
    setCalories(dailyCalories);
    setWater(dailyWater);
    return dailyCalories, dailyWater; //DO I NEED THIS RETURN??
  };

  return (
    <>
      <Meta title="Calorie Calculator" />
      <Navbar title="Calories" backPath={"/plan/setNutrition"} />
      <PageLayout>
        <form
          className="justify-center flex-column "
          id="calorieCalculatorForm"
          // action="submitForms()"
          method="post"
          data-validate="parsley"
        >
          {/* Choose Gender */}
          <div className="w-full flex justify-between px-10 mt-1">
            <label className="flex items-center mb-2 ">
              <input
                type="radio"
                className="checked:bg-blue-500 w-10 h-10 mr-5 "
                name="gender"
                value={gender}
                onChange={(e) => {
                  setGender("male");
                }}
              />
              Male
            </label>
            <label className="flex items-center ">
              <input
                type="radio"
                className="checked:bg-blue-500 w-10 h-10 mr-5 "
                name="gender"
                value={gender}
                onChange={(e) => {
                  setGender("female");
                }}
              />
              Female
            </label>
          </div>
          {/* Input personal details */}
          <input
            className="w-full h-8 border-2  mb-1 mt-1 flex justify-center text-center "
            type="number"
            placeholder="Age"
            name="age"
            id="age"
            data-required="true"
            data-error-message="Enter Age in Years"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <input
            className="w-full h-8 border-2  mb-1 mt-1 flex justify-center text-center "
            type="number"
            placeholder="Height (cm)"
            name="height"
            id="height"
            data-required="true"
            data-error-message="Enter Height in cm"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
          />
          <input
            className="w-full h-8 border-2  mb-1 mt-1 flex justify-center text-center "
            type="number"
            placeholder="Bodyweight (Kg)"
            name="weight"
            id="weight"
            data-required="true"
            data-error-message="Enter Bodyweight in Kg"
            value={bodyweight}
            onChange={(e) => {
              setBodyweight(e.target.value);
            }}
          />
          {/* Select Activity Level */}
          <label className="flex items-center mb-2 ml-1 mt-2">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5  "
              name="activityLevel"
              value={activityLevel}
              onChange={(e) => {
                setActivityLevel(1.2);
              }}
            />
            Sedentary: Little to no exercise
          </label>
          <label className="flex items-center mb-2 ml-1">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5 "
              name="activityLevel"
              value={activityLevel}
              onChange={(e) => {
                setActivityLevel(1.375);
              }}
            />
            Light: Exercise 1-3 times/week
          </label>
          <label className="flex items-center mb-2 ml-1">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5 "
              name="activityLevel"
              value={activityLevel}
              onChange={(e) => {
                setActivityLevel(1.55);
              }}
            />
            Moderate: Exercise 4-5 times/week
          </label>
          <label className="flex items-center mb-2 ml-1">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5 "
              name="activityLevel"
              value={activityLevel}
              onChange={(e) => {
                setActivityLevel(1.725);
              }}
            />
            Active: Daily exercise or intense exercise 3-4 times/week
          </label>
          <label className="flex items-center mb-2 ml-1">
            <input
              type="radio"
              className="checked:bg-blue-500 w-6 h-6 mr-5 "
              name="activityLevel"
              value={activityLevel}
              onChange={(e) => {
                setActivityLevel(1.9);
              }}
            />
            Very Active: Intense exercise 6-7 times/week
          </label>

          <div className=" w-full flex justify-center">
            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg border-2 border-black text-center ${buttonStyles.primary}`}
              type="submit"
              value="Calculate"
              onClick={handleSubmit}
            />
          </div>
        </form>

        <hr className="bg-primary-text"></hr>

        <div className="columns-2 flex justify-center mt-3 mb-3">
          <h3 className="h-10 w-1/3 text-center text-primary-fadedtext ">
            Maintanince Calories:
          </h3>
          <h3 className="h-10 w-1/3 text-center text-primary-fadedtext  ">
            Recommended Water Intake:
          </h3>
        </div>

        <div className=" columns-2 flex justify-center mb-2">
          <div className="  h-6 w-1/3 border-2 border-black rounded-lg px-2 text-center  ">
            {calories} Kcal
          </div>
          <div className="  h-6 w-1/3 border-2 border-black rounded-lg px-2 text-center ">
            {water} Litres
          </div>
        </div>

        <Button path="/plan/setNutrition" label="Back"></Button>
      </PageLayout>
    </>
  );
}

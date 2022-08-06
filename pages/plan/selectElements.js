import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";

export default function selectElements() {
  let calories = 0;
  let waterIntake = 0;
  let bodyweight = 0;
  let steps = 0;
  let sleep = 0;
  let hypertrophyWorkout = 0;
  let cardioWorkout = 0;

  return (
    <>
      <Meta title="Select Elements" />
      <Navbar title="Select Elements" backPath={"/athlete"} />
      <PageLayout>
        <form
          className="text-left text-xl flex-col px-10 "
          action="/plan/setNutrition" // TODO Needs changed to link to the 'setPlan' for whatever first elemenet thats suitable is
        >
          <div
            id="elementClass"
            className=" w-full h-1/6 border-2 border-black bg-slate-200 text-center"
          >
            Nutrition
          </div>
          <div className="radio border-2 ">
            <label className="flex items-center  ">
              <input
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5 "
                value="Calories & Macros"
              />
              Calories & Macros
            </label>
          </div>
          <div className="radio border-2 ">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5"
                value="Water Intake"
              />
              Water Intake
            </label>
          </div>
          <div
            id="elementClass"
            className=" w-full h-1/6 border-2 border-black bg-slate-200 text-center"
          >
            Healthcare
          </div>
          <div className="radio border-2 ">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5"
                value="Bodyweight"
              />
              Bodyweight
            </label>
          </div>
          <div className="radio border-2 ">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5"
                value="Steps"
              />
              Steps
            </label>
          </div>
          <div className="radio border-2 ">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5"
                value="Sleep"
              />
              Sleep
            </label>
          </div>
          <div
            id="elementClass"
            className=" w-full h-1/6 border-2 border-black bg-slate-200 text-center"
          >
            Workouts
          </div>
          <div className="radio border-2 ">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5"
                value="Hypertrophy Workout"
              />
              Hypertrophy Workout
            </label>
          </div>
          <div className="radio border-2 ">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5"
                value="Cardio Workout"
              />
              Cardio Workout
            </label>
          </div>
          <button
            id="submitButton"
            className={`border-2 border-black mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg ${buttonStyles.primary}`}
            type="submit"
          >
            Submit
          </button>
        </form>
      </PageLayout>
    </>
  );
}

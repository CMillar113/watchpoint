import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import { useEffect, useState } from "react";

export default function selectElements() {
  const [nutritionActive, setNutrition] = useState();
  const [bodyweightActive, setBodyweight] = useState();
  const [stepsActive, setSteps] = useState();
  const [sleepActive, setSleep] = useState();

  //POPULATE CHECK BOXES INDEPENDANDT OF UER DATA
  const nutritionElements = checkNutrtionElements();
  const healthcareElements = checkHealthcareElements();
  const workoutElements = checkWorkoutElements();

  //On submit must create link between that user and that element
  // Must also be able to delete that link is user un-selects the element
  //run check to see what elements the user is linked to and check those boxes
  //on submit create and/or delete links

  const handleSubmit = async (e) => {};

  return (
    <>
      <Meta title="Select Elements" />
      <Navbar title="Elements" backPath={"/athlete"} />
      <PageLayout>
        <form
          className="text-left text-xl flex-col px-10 "
          action="/plan/setNutrition" // TODO Needs changed to link to the 'setPlan' for whatever first elemenet thats suitable is
          onSubmit={handleSubmit}
        >
          <div
            id="elementClass"
            className=" w-full h-1/6 border-2 border-black bg-slate-200 text-center"
          >
            Nutrition
          </div>
          {nutritionElements}
          <div
            id="elementClass"
            className=" w-full h-1/6 border-2 border-black bg-slate-200 text-center"
          >
            Healthcare
          </div>
          {healthcareElements}
          <div
            id="elementClass"
            className=" w-full h-1/6 border-2 border-black bg-slate-200 text-center"
          >
            Workouts
          </div>
          {workoutElements}
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

//BUILDS FORM - Will update if new elements are added (SCALABLE)
function checkNutrtionElements() {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/elements");
        const result = await response.json();

        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (metrics !== undefined) {
    let nutritionElements = metrics
      .filter(function (metric) {
        return metric.element_class_id === 1;
      })
      .map(function (metric) {
        return (
          <div key={`${metric.element_id}-div`} className="radio border-2 ">
            <label className="flex items-center  ">
              <input
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5 "
                value={metric.element_name}
              />
              {metric.element_name}
            </label>
          </div>
        );
      });
    return nutritionElements;
  }
}

function checkHealthcareElements() {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/elements");
        const result = await response.json();

        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (metrics !== undefined) {
    let healthcareElements = metrics
      .filter(function (metric) {
        return metric.element_class_id === 2;
      })
      .map(function (metric) {
        return (
          <div key={`${metric.element_id}-div`} className="radio border-2 ">
            <label className="flex items-center  ">
              <input
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5 "
                value={metric.element_name}
              />
              {metric.element_name}
            </label>
          </div>
        );
      });
    return healthcareElements;
  }
}

function checkWorkoutElements() {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/elements");
        const result = await response.json();

        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (metrics !== undefined) {
    let workoutElements = metrics
      .filter(function (metric) {
        return metric.element_class_id === 3;
      })
      .map(function (metric) {
        return (
          <div key={`${metric.element_id}-div`} className="radio border-2 ">
            <label className="flex items-center  ">
              <input
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5 "
                value={metric.element_name}
              />
              {metric.element_name}
            </label>
          </div>
        );
      });
    return workoutElements;
  }
}

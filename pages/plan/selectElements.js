import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import { useEffect, useState } from "react";

export default function selectElements() {
  let calories = 0;
  let waterIntake = 0;
  let bodyweight = 0;
  let steps = 0;
  let sleep = 0;
  let hypertrophyWorkout = 0;
  let cardioWorkout = 0;

  let nutritionElements = null;
  let healthcareElements = null;
  let workoutElements = null;
  nutritionElements = checkNutrtionElements();
  healthcareElements = checkHealthcareElements();
  workoutElements = checkWorkoutElements();

  return (
    <>
      <Meta title="Select Elements" />
      <Navbar title="Elements" backPath={"/athlete"} />
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

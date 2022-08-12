import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import NavMenu from "../../../src/components/NavMenu";
import PageLayout from "../../../src/components/PageLayout";
import Button from "../../../src/components/Button";
import { useEffect, useState } from "react";
import Router from "next/router";

import { lowerCaseFirstLetter } from "../../_app";

//Constants for testing data pull
const workoutTitle = "Hypertrophy";
const workoutPathTitle = lowerCaseFirstLetter(workoutTitle);
let passedAthlete = 1;
let passedElement = 3;
let passedRoutineID = 1;

// let routineName = null;
// routineName = checkRoutineName(passedRoutineID);
//Constants for testing data pull

export default function routineDisplay() {
  let exerciseList = null;
  exerciseList = checkRoutineContents(passedRoutineID);
  console.log(exerciseList);

  return (
    <>
      <Meta title={workoutTitle} />
      <Navbar
        title="Routine"
        backPath={`/workouts/${workoutPathTitle}/routineMenu`}
      />
      <PageLayout>{exerciseList}</PageLayout>
    </>
  );
}

// function checkRoutineName(passedRoutineID) {
//   const [metrics, setMetrics] = useState(undefined);

//   useEffect(() => {
//     (async function () {
//       try {
//         const response = await fetch("/api/routine_exercise");
//         const result = await response.json();

//         if (response.ok) {
//           setMetrics(result);
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     })();
//   }, []);

//   if (metrics !== undefined) {
//     let routineName = metrics
//       .filter(function (metric) {
//         return metric.routine_id === passedRoutineID;
//       })
//       .map(function (metric) {
//         return metric.routine_name;
//       });
//     return routineName;
//   }
// }

function checkRoutineContents(passedRoutineID) {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/routine_exercise");
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
    let exercises = metrics
      .filter(function (metric) {
        return metric.routine_id === passedRoutineID;
      })
      .map(function (metric) {
        return (
          <button
            key={metric.routine_exercise_id}
            className=" w-full h-10  border-black border-2 flex "
          >
            {metric.exercise_name}
          </button>
        );
      });
    return exercises;
  }
}

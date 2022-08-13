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
  let routineName = null;
  let routineNotes = null;

  routineName = checkRoutineName(passedRoutineID);
  routineNotes = checkRoutineNotes(passedRoutineID);
  exerciseList = checkRoutineContents(passedRoutineID);
  console.log(exerciseList);

  return (
    <>
      <Meta title={workoutTitle} />
      <Navbar
        title="Routine"
        backPath={`/workouts/${workoutPathTitle}/routineMenu`}
      />
      <PageLayout>
        <div className="w-full h-auto text-center border-black border-2 rounded-md mb-5">
          <h3 className="w-full h-auto border-2">{routineName}</h3>
          <h3 className="w-full h-auto  border-2">{routineNotes}</h3>
        </div>

        {exerciseList}

        <div className=" w-full h-auto mb-3 mt-2">
          <Button path="" label="+ Add Exercise"></Button>
        </div>
        <Button path="" label="Start This Workout"></Button>
      </PageLayout>
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
      // .filter(function (metric) {
      //   return metric.athlete_id=== passedAthlete;
      // })
      // .filter(function (metric) {
      //   return metric.element_id === passedElement;
      // })
      .map(function (metric) {
        return (
          <div
            key={metric.routine_exercise_id}
            className=" w-full h-10 border-black border-2 flex justify-center px-3  "
          >
            <h3 className="w-1/2 mt-1">{metric.exercise_name}</h3>

            <div
              key={`${metric.routine_exercise_id}-setsDiv`}
              className="w-1/2 text-right flex justify-center "
            >
              <h3 className="w-1/4 mt-1">Sets: {metric.sets}</h3>
            </div>
          </div>
        );
      });
    console.log(exercises);
    return exercises;
  }
}

function checkRoutineName(passedRoutineID) {
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
    let name = metrics
      .filter(function (metric) {
        return metric.routine_id === passedRoutineID;
      })
      .map(function (metric) {
        return metric.routine_name;
      });
    console.log(name);
    return name[0]; /////TODO - theres two responses with same routine_id (mutliple exercises in a routine ...multiple names)
  }
}

function checkRoutineNotes(passedRoutineID) {
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
    let notes = metrics
      .filter(function (metric) {
        return metric.routine_id === passedRoutineID;
      })
      .map(function (metric) {
        return metric.routine_note;
      });
    console.log(notes);
    return notes[0]; /////TODO - theres two responses with same routine_id (mutliple exercises in a routine ...multiple names)
  }
}

/**
 * Show all exercise categorys in that element
 */
import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import PageLayout from "../../../src/components/PageLayout";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

// const classId = 1;

export default function exercises() {
  const [workout, setWorkoutTitle] = useState(" ");
  const [workoutId, setWorkoutId] = useState(" ");
  const [ClassId, setClassId] = useState(" ");
  const [categories, setCategories] = useState({
    categoryNames: [],
  });
  const { user, isLoading } = useUser();
  const { query, isReady } = useRouter();
  const { routineId } = query;

  useEffect(() => {
    if (!isReady) return;
    (async function () {
      const { workout, workoutId } = query;
      setWorkoutTitle(workout);
      setWorkoutId(workoutId);
      console.log(workoutId);

      try {
        console.log("sent", workoutId);
        const response = await fetch(
          `/api/element_exercises?workoutId=${workoutId}`
        );
        const result = await response.json();

        if (response.ok) {
          setCategories(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);
  console.log(workoutId);
  const workoutTitle = workout;

  return (
    <>
      <Meta title="Exercise Categories" />
      <Navbar
        title="Categories:"
        backPath={`/workouts/element/routineMenu?workout=${workoutTitle}&workoutId=${workoutId}`}
      />
      <PageLayout>
        <p className="text-center mb-3">Please Select Exercise Category </p>
        <div>
          {categories.categoryNames &&
            Array.isArray(categories.categoryNames) &&
            categories.categoryNames.map(function (metric) {
              return (
                <button
                  key={`${metric.exercise_category_id}-btn`}
                  className="h-10 w-full rounded-md border-black border-2 bg-slate-300 mb-2 place-content-center"
                  onClick={function () {
                    Router.push(
                      `/workouts/element/exercise?id=${metric.exercise_category_id}&workout=${workoutTitle}&workoutId=${workoutId}&routineId=${routineId}`
                    );
                  }}
                >
                  {" "}
                  {metric.exercise_category_name}
                </button>
              );
            })}
        </div>
      </PageLayout>
    </>
  );
}

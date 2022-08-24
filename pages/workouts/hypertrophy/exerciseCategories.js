/**
 * Show all exercise categorys in that element
 */
import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import PageLayout from "../../../src/components/PageLayout";

import { useEffect, useState } from "react";
import Router from "next/router";
import { lowerCaseFirstLetter } from "../../_app";
import { useUser } from "@auth0/nextjs-auth0";

//constants
const classId = 1;
const workoutTitle = "Hypertrophy";
const workoutPathTitle = lowerCaseFirstLetter(workoutTitle);
//constants

export default function exercises() {
  const [categories, setCategories] = useState(undefined);
  const { user, isLoading } = useUser();

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `/api/element_exercises?classid=${classId}`
        );
        const result = await response.json();

        if (response.ok) {
          setCategories(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  console.log(categories);

  return (
    <>
      <Meta title="Exercise Categories" />
      <Navbar title="Categories:" backPath={`/workouts/${workoutPathTitle}`} />
      <PageLayout>
        <p className="text-center">Please Select Exercise Category </p>
        <div>
          {categories &&
            Array.isArray(categories) &&
            categories.map(function (metric) {
              return (
                <button
                  key={`${metric.exercise_category_id}-btn`}
                  className="h-20 w-full rounded-md border-black border-2 bg-slate-300 mb-2 place-content-center"
                  onClick={function () {
                    let path = lowerCaseFirstLetter(
                      metric.exercise_category_id
                    );
                    Router.push(
                      `/workouts/${workoutPathTitle}/exercises${path}`
                    );
                  }}
                >
                  {" "}
                  {metric.exercise_category_name}
                </button>
              );
            })}
          ;
        </div>
      </PageLayout>
    </>
  );
}

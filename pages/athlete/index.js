import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import NavMenu from "../../src/components/NavMenu";

import Router from "next/router";
import { useEffect, useState } from "react";

import { lowerCaseFirstLetter } from "../_app";

export default function athlete() {
  let userName = null;
  userName = checkUserName();

  let body = null;
  body = checkHealthcareElements();

  return (
    <>
      <Meta title="Athlete - Home" />
      <Navbar title={userName} />
      <PageLayout>
        <NavMenu
          pathLeft={"/plan/setNutrition"}
          labelLeft={"Edit Goals"}
          pathCenter={""}
          labelCenter={"Food Log"}
          pathRight={"/workouts/selectWorkout"}
          labelRight={"Workouts"}
        ></NavMenu>

        <div className="h-screen">
          <div
            className={`bg-primary-bg text-primary-text h-11 place-content-center w-full border-2 border-black flex mb-1  `}
          >
            Daily Goals
          </div>
          <div className=" border-2 flex border-black h-1/2 content-center items-center overflow-hidden justify-center ">
            <div className="flex flex-col gap-2 w-8/12  h-10">
              {body}
              {/* {body !== null ? body : <p>No Goals</p>} */}
              {/* Brefily shows no goals then disapears */}
              {/* {body} */}
            </div>
          </div>

          <div
            className={`bg-primary-bg text-primary-text h-11 place-content-center  w-full border-2 border-black flex mb-1 mt-1 overflow-hidden  `}
          >
            Weekly Goals
          </div>
          <div className="border-2 flex border-black h-1/2 content-center items-center overflow-hidden justify-center">
            No Weekly Goals Set
          </div>
        </div>

        {/* {metrics !== undefined && <pre>{JSON.stringify(metrics, null, 2)}</pre>} */}
        <div>
          <Button path="/plan/selectElements" label="Set Goals" />
          <Button path="/settings" label="Settings" />
          <Button path="/athlete/reviewWeek" label="Week in Review" />
        </div>
      </PageLayout>
    </>
  );
}

function checkUserName() {
  const [userDetails, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/userDetails");
        const result = await response.json();

        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (userDetails !== undefined) {
    // console.log("test");
    // console.log(userDetails);

    let userName = userDetails.map(function (userDetail) {
      // console.log(userDetail.first_name);
      return userDetail.first_name; //This is the return of the SQL data to the variable userName
    });
    // console.log(userName);
    return userName; //Must return username as this is the return to the function call
  }
}

function checkHealthcareElements() {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/athlete_elements");
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
    let body = metrics
      .filter(function (metric) {
        return metric.element_class_id === 2;
      })
      .map(function (metric) {
        return (
          <button
            key={`${metric.element_id}-btn`}
            className="bg-black text-white items-center "
            onClick={function () {
              let path = lowerCaseFirstLetter(metric.element_name);
              Router.push(`/athlete/${path}Dash`);
            }}
          >
            {metric.element_name}
          </button>
        );
      });
    return body;
  }
}

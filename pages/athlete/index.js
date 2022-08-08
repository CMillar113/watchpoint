import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";

import navStyles from "../../styles/Nav.module.css";

import Router from "next/router";

import { useEffect, useState } from "react";

export default function athlete() {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/metrics");
        const result = await response.json();

        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  let userName = null;

  userName = checkUserName();
  // if (userName === undefined) {
  //   console.log("fail @ userName defined");
  // }

  let body = null;

  if (metrics !== undefined) {
    body = metrics
      // .filter(function (metric) {
      //   return metric.element_name === "bodyweight";
      // }) This is how to apply a filter - not needed in this case as my SQL is only bringing back the required data
      .map(function (metric) {
        return (
          <button
            key={`${metric.element_id}-btn`}
            className="bg-black text-white items-center "
            onClick={function () {
              Router.push(`/athlete/${metric.element_name}Dash`);
            }}
          >
            {metric.element_name}
          </button>
        );
      });
  } else {
    body = "No Goals Set";
  }

  return (
    <>
      <Meta title="Athlete - Home" />
      <Navbar title={userName} />
      <PageLayout>
        <div className="h-screen ">
          <div
            className={`bg-primary-bg text-primary-text h-11 place-content-center w-full border-2 border-black flex mb-1  `}
          >
            Daily Goals
          </div>
          <div className=" border-2 flex border-black h-3/5 content-center items-center overflow-hidden justify-center ">
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
          <p className="min-h-fit border-2 border-black flex h-3/5">
            No Weekly Goals Set
          </p>

          {/* {metrics !== undefined && <pre>{JSON.stringify(metrics, null, 2)}</pre>} */}
        </div>

        <Button path="/plan/selectElements" label="Set Plans" />
      </PageLayout>
    </>
  );
}

function checkUserName() {
  const [userMetrics, setMetrics] = useState(undefined);

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

  if (userMetrics !== undefined) {
    console.log("test");
    console.log(userMetrics);

    let userName = userMetrics.map(function (userMetric) {
      console.log(userMetric.first_name);
      return userMetric.first_name; //This is the return of the SQL data to the variable userName
    });
    console.log(userName);
    return userName; //Must return username as this is the return to the function call
  }
}

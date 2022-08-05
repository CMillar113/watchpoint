import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";

import navStyles from "../../styles/Nav.module.css";

import Router from "next/router";
import { USERNAME } from "../../src/constants";
import { useEffect, useState } from "react";
// import bodyweight from "./bodyweightDash";
// import steps from "./stepsDash";
// import sleep from "./sleepDash";

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

  checkUserName();

  let body = null;

  if (metrics !== undefined) {
    body = Object.keys(metrics).map(function (metric) {
      if (metrics[metric] === true) {
        return (
          <button
            key={`${metric}-btn`}
            className="bg-black text-white items-center "
            onClick={function () {
              Router.push(`/athlete/${metric}Dash`);
            }}
          >
            {metric}
          </button>
        ); // metrics["bodyweight"]
      }
    });
  }

  return (
    <>
      <Meta title="Athlete - Home" />
      <Navbar title={USERNAME} />
      <PageLayout>
        <div className="h-screen ">
          <div
            className={`bg-primary-bg text-primary-text w-full border-2 border-black flex mb-1  `}
          >
            Daily Goals
          </div>
          <div className=" border-2 flex border-black h-3/5 content-center items-center ">
            <div className="flex flex-col gap-2 w-8/12  h-10">
              {/* {body === null ? <pre>No Goals</pre> : { body }} */}
              {body}
            </div>
          </div>

          <div
            className={`bg-primary-bg text-primary-text h-11 w-full border-2 border-black flex mb-1 mt-1  `}
          >
            Weekly Goals
          </div>
          <div className="min-h-fit border-2 border-black flex h-3/5">
            No Weekly Goals Set
          </div>

          {/* {metrics !== undefined && <pre>{JSON.stringify(metrics, null, 2)}</pre>} */}
        </div>
      </PageLayout>
    </>
  );
}

function checkUserName() {
  //Currently calls from constant sheet - will call from database by passing in athlete_id
  const isset = (ref) => typeof ref !== "undefined";
  if (isset(USERNAME)) {
    console.log("True");
  } else {
    let USERNAME = "Undefined";
  }
}

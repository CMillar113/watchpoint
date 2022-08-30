import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Router from "next/router";
import Image from "next/image";

import { useEffect, useState } from "react";
import { lowerCaseFirstLetter } from "../_app";

//Post all coach accounts unless search function is used then only post some
export default function connectToCoach() {
  let coachCard = null;
  coachCard = checkCoaches();
  return (
    <>
      <Meta title="Connect to Coach" />
      <Navbar title="Coach Search" backPath={"/settings"} />
      <PageLayout>
        <div className="w-full flex justify-center">
          <div className="h-10 w-5/6 border-black border-2 rounded-md mb-5 flex justify-center">
            Searchbar placeholder
          </div>
        </div>
        {coachCard}
      </PageLayout>
    </>
  );
}

function checkCoaches() {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/coach/getAllCoaches");
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
    let coaches = metrics.map(function (metric) {
      //Not semantically correct to put divs inside buttons - build divs and input button
      return (
        <div
          key={`${metric.coach_id}-div`}
          className="h-auto w-full rounded-md border-primary-bg border-2 bg-black mb-2 place-content-center text-center"
        >
          <button
            className="mr-0"
            onClick={function () {
              Router.push(`/settings/coachProfile?coachId=${metric.coach_id}`);
            }}
          >
            {" "}
            <p className="text-white ">
              {metric.first_name} {metric.surname}
            </p>
            <p className="text-white">{metric.brand_name}</p>
          </button>
        </div>

        // console.log(userDetail.first_name);
      );
    });
    // console.log(userName);
    return coaches;
  }
}

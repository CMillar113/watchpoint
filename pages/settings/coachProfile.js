import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Router from "next/router";
import Image from "next/image";
import buttonStyles from "../../styles/Button.module.css";

import { useEffect, useState } from "react";
import { lowerCaseFirstLetter } from "../_app";

//Post all coach accounts unless search function is used then only post some
export default function coachProfile() {
  let coachCard = null;

  let passedCoach_id = 1; //TODO Not hardcoded- Passed from connectToCoach screen
  coachCard = checkCoach(passedCoach_id); //Same function as connectToCoach - return coach card but with filter depending on the coach_id selected
  return (
    <>
      <Meta title="Coach Profile" />
      <Navbar title="Coach" backPath={"/settings/connectToCoach"} />
      <PageLayout>
        {coachCard}

        <div className="w-full  border-black border-2 rounded-md flex justify-center">
          <form
            className="h-full w-full flex justify-center"
            action="/settings/coachConnected"
            method="post"
            data-validate="parsley"
          >
            <input
              className="mt-2 mb-2 border-2 border-black w-8/12 text-center"
              type="text"
              placeholder="Connection Code"
              name="code"
              data-required="true"
              data-type="text"
              data-error-message="Connection Code Incorrect"
            />

            <input
              className={` h-auto w-1/5 ml-2 mt-2 mb-2 text-h2-mobile  bg-primary-bg border-black border-2 rounded-lg `}
              type="submit"
              value="Connect"
              //TODO - Does not have same reaction as <Button> dosnt feel like its clicked
            />
          </form>
        </div>
      </PageLayout>
    </>
  );
}

function checkCoach(passedCoach_id) {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/coaches");
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (metrics !== undefined) {
    let coach = metrics
      .filter(function (metric) {
        return metric.coach_id === passedCoach_id;
      }) //This is how to apply a filter
      .map(function (metric) {
        //Not semantically correct to put divs inside buttons - build divs and input button
        return (
          <div
            key={`${metric.coach_id}-div`}
            className="h-full w-full rounded-md border-black border-2 bg-white mb-2 place-content-center text-center"
          >
            <button
              key={`${metric.coach_id}-btn`}
              className="mr-0"
              onClick={function () {
                Router.push(`/settings/coachProfile`);
              }}
            >
              {" "}
              <p key={`${metric.coach_id}-p1`} className="text-3xl ">
                {metric.brand_name}
              </p>
              <div className="w-full flex justify-center">
                <img
                  src={metric.coach_img_url}
                  alt=""
                  height={300}
                  width={300}
                  alt="Logo"
                ></img>
              </div>
              <p key={`${metric.coach_id}-p2`} className="text-3xl">
                {metric.first_name} {metric.surname}
              </p>
              <p key={`${metric.coach_id}-p3`} className="text-3xl">
                {metric.email_address}
              </p>
            </button>
          </div>
        );
      });

    return coach;
  }
}

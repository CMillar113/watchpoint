import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Router from "next/router";
import Image from "next/image";
import buttonStyles from "../../styles/Button.module.css";

import { useEffect, useState } from "react";
import { lowerCaseFirstLetter } from "../_app";
import Button from "../../src/components/Button";

export default function myCoach() {
  let passedAthlete_id = 1;
  let elements = null;
  elements = checkAthletesElements(passedAthlete_id); //TODO - SQL req hardcoded with athlete_id = 1

  let passedCoach_id = 2; //TODO Not hardcoded- Passed from connectToCoach screen
  let coachCard = null;
  coachCard = checkCoach(passedCoach_id); //Same function as connectToCoach - return coach card but with filter depending on the coach_id selected

  return (
    <>
      <Meta title="my Coach" />
      <Navbar title="Coach" backPath={"/settings"} />
      <PageLayout>
        {coachCard}
        <h3 className="flex justify-center mb-2">Allow Coach Access to:</h3>
        <form className="text-left text-xl flex-col px-10 " action="/settings">
          {elements}

          <button
            id="submit"
            className={`border-2 border-black mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg ${buttonStyles.primary}`}
            type="submit"
          >
            Update
          </button>
        </form>

        <Button
          path="/settings/coachDisconnected"
          label="Disconnect from coach"
        ></Button>
      </PageLayout>
    </>
  );
}

function checkAthletesElements(passedAthlete_id) {
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

  if (metrics !== undefined) {
    let body = metrics
      .filter(function (metric) {
        return metric.athlete_id === passedAthlete_id; // TODO - HArdcoded into SQL as athlete_id = 1
      }) //This is how to apply a filter - not needed in this case as my SQL is only bringing back the required data
      .map(function (metric) {
        return (
          <div key={`${metric.element_id}-div`} className="radio border-2 ">
            <label
              key={`${metric.element_id}-label`}
              className="flex items-center  "
            >
              <input
                key={`${metric.element_id}-input`}
                type="checkbox"
                className="checked:bg-blue-500 w-10 h-10 mr-5 "
                value={metric.element_name}
                // checked={true}
              />
              {metric.element_name}
            </label>
          </div>
        );
      });
    return body;
  }
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
            className="h-auto w-full rounded-md border-black border-2 bg-white mb-2 place-content-center text-center"
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

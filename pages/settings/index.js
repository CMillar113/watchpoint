import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import NavMenu from "../../src/components/NavMenu";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import { useEffect, useState } from "react";

export default function settings() {
  //TODO - Not hardcoded - check with database athlete_coach table
  let passedAthlete_id = 1;
  let coachConnected = checkCoachConnected(passedAthlete_id);

  //Check for an empty array of zero values - which is "no coach connected"
  if (Array.isArray(coachConnected) && coachConnected.length !== 0) {
    return (
      <>
        <Meta title="Settings" />
        <Navbar title="Settings" backPath={"/athlete"} />
        <PageLayout>
          <Button path="/settings/myCoach" label="My Coach"></Button>

          <div className=" mt-6 w-full h-auto flex justify-center ">
            <div className=" border-2 border-black rounded-sm w-5/6 h-32 flex justify-center content-center ">
              Theme Selector
            </div>
          </div>
        </PageLayout>
      </>
    );
  } else {
    return (
      <>
        <Meta title="Settings" />
        <Navbar title="Settings" backPath={"/athlete"} />
        <PageLayout>
          <Button
            path="/settings/connectToCoach"
            label="Connect With Coach"
          ></Button>
          <div className=" mt-6 w-full h-auto flex justify-center ">
            <div className=" border-2 border-black rounded-sm w-5/6 h-32 flex justify-center content-center ">
              Theme Selector
            </div>
          </div>
        </PageLayout>
      </>
    );
  }
}
//TODO -Filter in function or in API?- should be moved to in function
function checkCoachConnected(passedAthlete_id) {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/athlete_coach");
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
    let coachRelationship = metrics.filter(function (metric) {
      if (metric.athlete_id === passedAthlete_id) {
        return metric.coach_id;
      }
    });
    // .map(function (metric) {
    //   return metric.coach_id;
    // });
    return coachRelationship;
  }
}

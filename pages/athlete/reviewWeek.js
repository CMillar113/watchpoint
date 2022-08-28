import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";

import Router from "next/router";
import { useEffect, useState } from "react";

export default function reviewWeek() {
  return (
    <>
      <Meta title="Athlete Week Review" />
      <Navbar backPath={"/athlete"} title="Week Review" />
      <PageLayout>
        {/* Show calorie goal at top if there is calorie goals set */}
        {/* Show previous 7 days of healthcare logs (steps/ bodyweight weigh ins etc N/a if missed one) */}
        {/* Show workouts loggged in past 7 days ' athlete_routine_exercise' table */}
        <div
          id="All"
          className="w-full h-screen flex-col  border-2 border-black "
        >
          <div
            id="Day"
            className="h-1/6 w-full border-black border-2 flex"
          ></div>
        </div>
      </PageLayout>
    </>
  );
}

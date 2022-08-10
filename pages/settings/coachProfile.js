import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Router from "next/router";
import Image from "next/image";

import { useEffect, useState } from "react";
import { lowerCaseFirstLetter } from "../_app";

//Post all coach accounts unless search function is used then only post some
export default function coachProfile() {
  let coachCard = null;
  coachCard = checkCoach(); //Same function as connectToCoach - return coach card but with filter depending on the coach_id selected
  return (
    <>
      <Meta title="Coach Profile" />
      <Navbar title="Coach Search" backPath={"/settings/connectToCoach"} />
      <PageLayout>
        <div className="w-full flex justify-center"></div>
        {coachCard}
      </PageLayout>
    </>
  );
}

import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import NavMenu from "../../src/components/NavMenu";

import Router from "next/router";
import { useEffect, useState } from "react";

export default function reviewWeek() {
  return (
    <>
      <Meta title="Athlete Week Review" />
      <Navbar backPath={"/athlete"} title="Week Review" />
      <PageLayout>
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

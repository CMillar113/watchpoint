import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import buttonStyles from "../../styles/Button.module.css";

import { useEffect, useState } from "react";
import { lowerCaseFirstLetter } from "../_app";
import { useUser } from "@auth0/nextjs-auth0";

//Post all coach accounts unless search function is used then only post some
export default function coachProfile() {
  const { query, isReady } = useRouter();
  const { user } = useUser();
  const [coachId, setCoachId] = useState("");
  const [metrics, setCoachMetrics] = useState("");
  const [connectionCode, setConnectionCode] = useState("");

  useEffect(() => {
    if (!user) return;
    if (!isReady) return;
    async function effect() {
      const { coachId } = query;
      setCoachId(coachId);
    }
    effect();

    (async function () {
      const { coachId } = query; // seems to be faster loading if use this rather than state (check more)
      try {
        const response = await fetch(
          `/api/coach/getCoachInfo?coachId=${coachId}`
        );
        const result = await response.json();
        console.log("result", result);

        if (response.ok) {
          setCoachMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user, query, isReady]); // continues once these are set or changed

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { connectionCode };
    console.log({ "submitted data": connectionCode, coachId });
    try {
      const response = await fetch(
        `/api/coach/createCoachConnection?coachId=${coachId}&connectionCode=${connectionCode}&athlete0Id=${user.sub}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        Router.push(`/settings/coachConnected`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (metrics !== undefined && user !== undefined) {
    return (
      <>
        <Meta title="Coach Profile" />
        <Navbar title="Coach" backPath={"/settings/connectToCoach"} />
        <PageLayout>
          <div
            key={`${metrics.coach_id}-div`}
            className="h-auto w-full rounded-md border-black border-2 bg-white mb-2 place-content-center text-center"
          >
            {" "}
            <p key={`${metrics.coach_id}-p1`} className="text-3xl ">
              {metrics.brand_name}
            </p>
            <div className="w-full flex justify-center">
              <img
                src={metrics.coach_img_url}
                alt=""
                height={300}
                width={300}
                alt="Logo"
              ></img>
            </div>
            <p key={`${metrics.coach_id}-p2`} className="text-3xl">
              {metrics.first_name} {metrics.surname}
            </p>
            <p key={`${metrics.coach_id}-p3`} className="text-3xl">
              {metrics.email_address}
            </p>
          </div>

          <div className="w-full  border-black border-2 rounded-md flex justify-center">
            <form
              className="h-full w-full flex justify-center"
              onSubmit={handleSubmit}
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
                value={connectionCode}
                onChange={(e) => {
                  setConnectionCode(e.target.value);
                }}
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
}

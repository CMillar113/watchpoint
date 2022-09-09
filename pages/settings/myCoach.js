import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../src/components/Button";
import { useUser } from "@auth0/nextjs-auth0";

export default function myCoach() {
  const { query, isReady } = useRouter();
  const { user } = useUser();
  const [coachId, setCoachId] = useState("");
  const [metrics, setCoachMetrics] = useState("");

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

  const handleDisconnect = async (e) => {
    const coachId = query.coachId;
    const athlete0Id = user.sub;
    console.log(`input`, coachId, athlete0Id);
    try {
      const response = await fetch(
        `/api/coach/disconnectCoach?coachId=${coachId}&athlete0Id=${athlete0Id}`,
        {
          method: "POST",
          data: JSON.stringify(coachId),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        Router.push("/settings/coachDisconnected");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (metrics !== undefined && user !== undefined) {
    return (
      <>
        <Meta title="my Coach" />
        <Navbar title="Coach" backPath={"/settings"} />
        <PageLayout>
          <div
            key={`${metrics.coach_id}-div`}
            className="h-auto w-full rounded-md border-black border-2 bg-white mb-2 place-content-center text-center"
          >
            <button
              key={`${metrics.coach_id}-btn`}
              className="mr-0"
              onClick={function () {
                Router.push(`/settings/coachProfile`);
              }}
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
            </button>
          </div>
          <div className="w-full text-center flex justify-center mb-2">
            <h3 className="border-2 border-primary-bg text-center w-11/12">
              You are currently connected
            </h3>
          </div>
          <p className="flex text-center mb-2 px-2">
            Your coach will have access to your workout routines and week in
            review page
          </p>

          <button
            className=" w-full h-8 justify-evenly border-black bg-primary-bg border-2 flex px-3 mb-1"
            onClick={function () {
              handleDisconnect();
            }}
          >
            Disconnect
          </button>
        </PageLayout>
      </>
    );
  }
}

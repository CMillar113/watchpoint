import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import buttonStyles from "../../styles/Button.module.css";

import { useEffect, useState } from "react";
import { lowerCaseFirstLetter } from "../_app";
import Button from "../../src/components/Button";
import { useUser } from "@auth0/nextjs-auth0";

export default function myCoach() {
  const { query, isReady } = useRouter();
  const { user, isLoading } = useUser();
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
        const response = await fetch(`/api/coaches?coachId=${coachId}`);
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

  const handleDisconnect = async () => {
    // const coachId = query.coachId;
    const athlete0Id = user.sub;
    try {
      const response = await fetch(
        `/api/disconnectCoach?coachId=${coachId}athlete0Id=${athlete0Id}`
      );
      const result = await response.json();
      console.log("result", result);

      if (response.ok) {
        setCoachMetrics(result);
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

          {/* <form
            className="text-left text-xl flex-col px-10  "
            action="/settings"
          >
            {elements}

            <button
              id="submit"
              className={`border-2 border-black mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg  ${buttonStyles.primary}`}
              type="submit"
            >
              Update
            </button>
          </form> */}

          <Button
            path=""
            onClick={() => {
              handleDisconnect();
            }}
            label="Disconnect from coach"
          ></Button>
        </PageLayout>
      </>
    );
  }
}

// function checkAthletesElements(passedAthlete_id) {
//   const [metrics, setMetrics] = useState(undefined);

//   useEffect(() => {
//     (async function () {
//       try {
//         const response = await fetch("/api/athlete_elements");
//         const result = await response.json();

//         if (response.ok) {
//           setMetrics(result);
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     })();
//   }, []);

//   if (metrics !== undefined) {
//     let body = metrics
//       .filter(function (metric) {
//         return metric.athlete_id === passedAthlete_id; // TODO - HArdcoded into SQL as athlete_id = 1
//       }) //This is how to apply a filter - not needed in this case as my SQL is only bringing back the required data
//       .map(function (metric) {
//         return (
//           <div key={`${metric.element_id}-div`} className="radio border-2 ">
//             <label
//               key={`${metric.element_id}-label`}
//               className="flex items-center  "
//             >
//               <input
//                 key={`${metric.element_id}-input`}
//                 type="checkbox"
//                 className="checked:bg-blue-500 w-10 h-10 mr-5 "
//                 value={metric.element_name}
//                 // checked={true}
//               />
//               {metric.element_name}
//             </label>
//           </div>
//         );
//       });
//     return body;
//   }
// }

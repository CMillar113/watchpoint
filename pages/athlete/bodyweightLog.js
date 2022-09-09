import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const today = new Date();

export default function stepsLog() {
  const [loggedBodyweight, setLoggedBodyweight] = useState([]);
  const { user } = useUser(); //Get current users 7 day average of steps
  const [isLoading, setLoading] = useState(true);
  const [date, setDate] = useState(today);

  useEffect(() => {
    if (!user) return;
    (async function () {
      setLoading(true);
      try {
        const auth0PrimaryKey = user.sub;
        const response = await fetch(
          `/api/userHealthcare?auth0=${auth0PrimaryKey}`
        );
        const result = await response.json();

        console.log({ result });

        if (response.ok) {
          setLoggedBodyweight(result.bodyweight);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  useEffect(() => {
    console.log("useEffect", { loggedBodyweight });
  }, [loggedBodyweight]); //Spy on state variable if changes

  return (
    <>
      <Meta title="Bodyweight Log" />
      <Navbar title="Bodyweight" backPath={"/athlete/bodyweightDash"} />
      <PageLayout>
        <div className="w-full border-2 border-black bg-primary-bg text-center">
          {" "}
          <h3>{format(new Date(), "EEEE do MMMM yyyy")}</h3>
        </div>
        <div className="w-full h-screen border-2">
          {/* Function will return date & value */}
          <div id="Date & Log" className=" bg-primary-bg border-2 border-black">
            <div className="flex w-full justify-between px-1 mb-1 bg-black text-cyan-50">
              <div>Bodyweight</div>
              <div>Date</div>
            </div>
            {loggedBodyweight.length > 0 ? (
              loggedBodyweight.map(function (log) {
                return (
                  <React.Fragment
                    key={`${log.log_value}-${log.date}-${log.unique_identifier}`}
                  >
                    <div className="flex w-full justify-between px-1">
                      <div>{log.log_value} Kg</div>
                      <div>{format(new Date(log.date), "do MMM yyyy")}</div>
                    </div>
                    <hr />
                  </React.Fragment>
                );
              })
            ) : (
              <div className="w-full px-1">
                {isLoading ? "Loading..." : "Nothing Logged"}
              </div>
            )}
          </div>
          {/* End of returned function */}
        </div>
      </PageLayout>
    </>
  );
}

// import Meta from "../../src/components/Meta";
// import Navbar from "../../src/components/NavBar";
// import PageLayout from "../../src/components/PageLayout";
// import Button from "../../src/components/Button";
// import Link from "next/link";
// import buttonStyles from "../../styles/Button.module.css";

// export default function bodyweightLog() {
//   return (
//     <>
//       <Meta title="Bodyweight Log" />
//       <Navbar title="Bodyweight Log" backPath={"/athlete/bodyweightDash"} />
//       <PageLayout>
//         <div className="w-full border-2 border-black bg-primary-bg text-center">
//           {" "}
//           Month 2022
//         </div>
//         <div className="w-full h-screen border-2">
//           {/* Function will return  date & value */}
//           <div
//             id="Date & Log"
//             className="text-center bg-slate-300 columns-2 border-2 border-black gap-1"
//           >
//             <p>06/08/22</p>
//             <p>77Kg</p>
//           </div>
//           {/* End of returned function */}
//         </div>
//       </PageLayout>
//     </>
//   );
// }

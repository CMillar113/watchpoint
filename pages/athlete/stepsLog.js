import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import buttonStyles from "../../styles/Button.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";

const today = new Date().toISOString().substring(0, 10);

export default function stepsLog() {
  const [loggedSteps, setLoggedSteps] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();

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
          setLoggedSteps(result.steps);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  useEffect(() => {
    console.log("useEffect", { loggedSteps });
  }, [loggedSteps]); //Spy on state variable if changes

  return (
    <>
      <Meta title="Steps Log" />
      <Navbar title="Steps Log" backPath={"/athlete/stepsDash"} />
      <PageLayout>
        <div className="w-full border-2 border-black bg-primary-bg text-center">
          {" "}
          <h3>Today: {today}</h3>
        </div>
        <div className="w-full h-screen border-2">
          {/* Function will return date & value */}
          <div id="Date & Log" className=" bg-slate-300  border-2 border-black">
            <div className="flex w-full justify-between px-1 mb-1 bg-slate-400 text-cyan-50">
              <div>Steps</div>
              <div>Date</div>
            </div>
            {loggedSteps.length > 0 ? (
              loggedSteps.map(function (log) {
                return (
                  <React.Fragment
                    key={`${log.log_value}-${log.date}-${log.unique_identifier}`}
                  >
                    <div className="flex w-full justify-between px-1">
                      <div>{log.log_value}</div>
                      <div>{log.date.substring(0, 10)}</div>
                    </div>
                    <hr />
                  </React.Fragment>
                );
              })
            ) : (
              <div className="w-full px-1">
                {isLoading ? "Loading..." : "Nothing to see here folks"}
              </div>
            )}
          </div>
          {/* End of returned function */}
        </div>
      </PageLayout>
    </>
  );
}

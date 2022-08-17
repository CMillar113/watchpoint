import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import buttonStyles from "../../styles/Button.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";

export default function steps() {
  const [metrics, setMetrics] = useState(undefined);
  const { user, isLoading } = useUser(); //Get current users 7 day average of steps

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/userHealthcare");
        const result = await response.json();

        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  let body = null;

  if (metrics !== undefined && user !== undefined) {
    body = metrics
      .filter(function (metric) {
        return metric.element_id === 8 && metric.unique_identifier === user.sub;
      })
      .map(function (metric) {
        return metric.log_value;
      });
  }

  console.log();
  // last = body[body.length - 1];

  return (
    <>
      <Meta title="Steps" />
      <Navbar title="Steps" backPath={"/athlete"} />
      <PageLayout>
        <div className="bg-white border-2 border-black rounded-2xl shadow-xl items-center text-center px-8  ">
          <p className=" text-primary-fadedtext ">Daily Step Count</p>
        </div>

        <div className="mt-5 text-center items-center content-center">
          <form
            action={`/athlete`}
            method="post"
            data-validate="parsley"
            // onClick={}
          >
            <div className=" mb-2 ">
              <input
                className="border-2 border-black w-8/12 h-10"
                type="number"
                placeholder=" Daily Steps"
                name="steps"
                data-required="true"
                data-type="steps"
                data-error-message="Enter a value for Daily Steps "
              />
            </div>
            {/* will need to autopoulate with todays date but allow choice - scroll selector */}
            <div className=" mb-2">
              <input
                className="border-2 border-black w-8/12 h-10"
                type="date"
                placeholder=""
                name="date"
                data-required="true"
                data-type="date"
                data-error-message="Select a Date"
              />
            </div>

            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg border-2 border-black  ${buttonStyles.primary}`}
              type="submit"
              value="Add Entry"
            />
          </form>
        </div>
        <Button path="/athlete/stepsLog" label="Steps Log" />

        <div className=" w-full mb-4 mt-4 border-2 border-black ">
          <h3 className=" mt-1  text-center text-xl">Last Entery: {body}</h3>
        </div>
      </PageLayout>
    </>
  );
}

async function logSteps(value) {
  console.log("create", { value });
  // try {
  //   const response = await fetch("/api/healthcare/createSteps", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //     }),
  //   });
  //   const result = await response.json();

  //   console.log({ result });
  // } catch (e) {
  //   console.error(e);
  // }
}

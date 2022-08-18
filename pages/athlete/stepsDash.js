import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import buttonStyles from "../../styles/Button.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";

const today = new Date().toISOString().substring(0, 10);

export default function steps() {
  const [loggedSteps, setLoggedSteps] = useState([]);
  const { user } = useUser(); //Get current users 7 day average of steps
  const [steps, setSteps] = useState(0);
  const [date, setDate] = useState(today);

  useEffect(() => {
    if (!user) return;
    (async function () {
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
      }
    })();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { steps, date };
    console.log({ data });
    try {
      const response = await fetch(
        `/api/healthcare/createSteps?id=${user.sub}&steps=${steps}&date=${date}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });
    } catch (e) {
      console.error(e);
    }
  };

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
            onSubmit={handleSubmit}
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
                value={steps}
                onChange={(e) => {
                  setSteps(e.target.value);
                }}
              />
            </div>
            {/* will need to autopoulate with todays date but allow choice - scroll selector */}
            <div className=" mb-2">
              <input
                className="border-2 border-black w-8/12 h-10"
                type="date"
                name="date"
                data-required="true"
                data-type="date"
                data-error-message="Select a Date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>

            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg border-2 border-black  ${buttonStyles.primary}`}
              type="submit"
              value="Add Entry"
            />
            <Button type="submit" path="/athlete/stepsLog" label="Steps Log" />
          </form>
        </div>

        <div className=" w-full mb-4 mt-4 border-2 border-black ">
          <h3 className=" mt-1  text-center text-xl">
            {loggedSteps.length === 0 ? (
              <>
                Looking a bit bare <br /> Try logging some steps
              </>
            ) : (
              <>Last Entry: {loggedSteps[0].log_value} steps</>
            )}
          </h3>
        </div>
      </PageLayout>
    </>
  );
}

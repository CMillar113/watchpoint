import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";

const today = new Date().toISOString().substring(0, 10);

export default function steps() {
  const [loggedSteps, setLoggedSteps] = useState([]);
  const { user } = useUser(); //Get current users 7 day average of steps
  const [steps, setSteps] = useState("");
  const [date, setDate] = useState(today);
  const router = useRouter();

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

  //FORM SUBMIT
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

      if (response.ok) {
        router.push("/athlete/stepsLog");
      }
    } catch (e) {
      console.error(e);
    }
  };

  //PAGE RETURN
  return (
    <>
      <Meta title="Steps" />
      <Navbar title="Steps" backPath={"/athlete"} />
      <PageLayout>
        <div className="bg-white border-2 py-2 border-black rounded-2xl shadow-xl items-center text-center px-8  ">
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
                className="border-2 border-black w-8/12 h-10 p-2"
                type="number"
                placeholder="Daily Steps"
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

            <div className=" mb-2">
              <input
                className="border-2 border-black w-8/12 h-10 p-2"
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

            <Button
              className="disabled:opacity-50 p-2"
              type="submit"
              disabled={steps === ""}
              label="Add Entry"
            />
            <Button
              type="button"
              path="/athlete/stepsLog"
              label="Steps Log"
              className="p-2"
            />
          </form>
        </div>

        <div className=" w-full mt-4 py-2 border-2 border-black ">
          <h3 className=" text-center text-xl">
            {loggedSteps.length === 0 ? (
              <>
                Looking a bit bare <br /> Try logging some steps
              </>
            ) : (
              <>Last Entry: {loggedSteps[0].log_value} steps</>
            )}
          </h3>
          <h3 className="  text-center text-xl">
            {loggedSteps.length === 0 ? (
              <>-</>
            ) : (
              <>on {format(new Date(loggedSteps[0].date), "do MMM yyyy")} </>
            )}
          </h3>
        </div>
      </PageLayout>
    </>
  );
}

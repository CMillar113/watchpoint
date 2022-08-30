import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import buttonStyles from "../../styles/Button.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const today = new Date().toISOString().substring(0, 10);

export default function sleep() {
  const [loggedSleep, setLoggedSleep] = useState([]);
  const { user } = useUser(); //Get current users 7 day average of steps
  const [sleep, setSleep] = useState(0);
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
          setLoggedSleep(result.sleep);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);

  //FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { sleep, date };
    console.log({ data });
    try {
      const response = await fetch(
        `/api/healthcare/createSteps?id=${user.sub}&sleep=${sleep}&date=${date}`, //TODO - pass element id and make single API endpoint
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        router.push("/athlete/sleepLog");
      }
    } catch (e) {
      console.error(e);
    }
  };

  //PAGE RETURN
  return (
    <>
      <Meta title="Sleep" />
      <Navbar title="Sleep" backPath={"/athlete"} />
      <PageLayout>
        <div className="bg-white border-2 border-black rounded-2xl shadow-xl items-center text-center px-8  ">
          <p className=" text-primary-fadedtext ">Nightly Hours Slept</p>
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
                placeholder=" Hours Slept"
                name="sleep"
                data-required="true"
                data-type="sleep"
                data-error-message="Enter a value for Hours Slept "
                value={sleep}
                onChange={(e) => {
                  setSleep(e.target.value);
                }}
              />
            </div>

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
            <Button type="submit" path="/athlete/sleepLog" label="Sleep Log" />
          </form>
        </div>

        <div className=" w-full mb-4 mt-4 border-2 border-black ">
          <h3 className=" mt-1  text-center text-xl">
            {loggedSleep.length === 0 ? (
              <>
                Looking a bit bare <br /> Try logging some hours
              </>
            ) : (
              <>Last Entry: {loggedSleep[0].log_value} hours</>
            )}
          </h3>
          <h3 className=" mt-1  text-center text-xl">
            {loggedSleep.length === 0 ? (
              <>-</>
            ) : (
              <>on {loggedSleep[0].date.substring(0, 10)} </>
            )}
          </h3>
        </div>
      </PageLayout>
    </>
  );
}

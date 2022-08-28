import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import buttonStyles from "../../styles/Button.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const today = new Date().toISOString().substring(0, 10);

export default function bodyweight() {
  const [loggedBodyweight, setLoggedBodyweight] = useState([]);
  const { user } = useUser();
  const [bodyweight, setBodyweight] = useState(0);
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
          setLoggedBodyweight(result.bodyweight);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);

  //FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { bodyweight, date };
    console.log({ data });
    try {
      const response = await fetch(
        `/api/healthcare/createBodyweight?id=${user.sub}&bodyweight=${bodyweight}&date=${date}`,
        {
          method: "POST",
          data: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        router.push("/athlete/bodyweightLog");
      }
    } catch (e) {
      console.error(e);
    }
  };

  //PAGE RETURN
  return (
    <>
      <Meta title="Bodyweight" />
      <Navbar title="Bodyweight" backPath={"/athlete"} />
      <PageLayout>
        <div className="bg-white border-2 border-black rounded-2xl shadow-xl items-center text-center px-8  ">
          <p className=" text-primary-fadedtext ">Daily Bodyweight Log</p>
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
                placeholder=" Daily Bodyweight"
                name="boyweight"
                data-required="true"
                data-type="bodyweight"
                data-error-message="Enter a value for Daily Bodyweight "
                value={bodyweight}
                onChange={(e) => {
                  setBodyweight(e.target.value);
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
            <Button
              type="submit"
              path="/athlete/bodyweightLog"
              label="Bodyweight Log"
            />
          </form>
        </div>

        <div className=" w-full mb-4 mt-4 border-2 border-black ">
          <h3 className=" mt-1  text-center text-xl">
            {loggedBodyweight.length === 0 ? (
              <>
                Looking a bit bare <br /> Try logging some bodyweights
              </>
            ) : (
              <>Last Entry: {loggedBodyweight[0].log_value} Kg</>
            )}
          </h3>
          <h3 className=" mt-1  text-center text-xl">
            {loggedBodyweight.length === 0 ? (
              <>-</>
            ) : (
              <>on {loggedBodyweight[0].date.substring(0, 10)} </>
            )}
          </h3>
        </div>
      </PageLayout>
    </>
  );
}

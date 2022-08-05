import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";

export default function bodyweight() {
  return (
    <>
      <Meta title="Bodyweight" />
      <Navbar title="Bodyweight" backPath={"/athlete"} />
      <PageLayout>
        <div className="bg-white border-2 border-black rounded-2xl shadow-xl items-center text-center px-8  ">
          <p className=" text-primary-fadedtext ">Todays Weight</p>
        </div>

        <div className="mt-5 text-center items-center content-center">
          <form action={`/athlete`} method="post" data-validate="parsley">
            <div className=" mb-2 ">
              <input
                className="border-2 border-black w-8/12 h-10"
                type="number"
                placeholder=" Todays Weight"
                name="weight"
                data-required="true"
                data-type="weight"
                data-error-message="Enter a value for Bodyweight  "
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
                data-error-message="Select a Date "
              />
            </div>

            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium  bg-primary-bg border-2 border-black ${buttonStyles.primary}`}
              type="submit"
              value="Add Entry"
              //TODO - Does not have same reaction as <Button> dosnt feel like its clicked
            />
          </form>
        </div>

        <div className=" w-full mb-4 mt-4 border-2 border-black ">
          <h3 className=" mt-1  text-center text-xl">7 Day Average:</h3>
        </div>

        <Button path="/athlete/bodyweightLog" label="Bodyweight Log" />
      </PageLayout>
    </>
  );
}

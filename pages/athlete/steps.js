import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";

export default function steps() {
  return (
    <>
      <Meta title="Steps Log" />
      <Navbar title="Steps" backPath={"/athlete"} />
      <PageLayout>
        <div className="bg-white border-2 border-black rounded-2xl shadow-xl items-center text-center px-8  ">
          <p className=" text-primary-fadedtext ">Daily Step Count</p>
        </div>

        <div className="mt-5 text-center items-center content-center">
          <form action={`/athlete`} method="post" data-validate="parsley">
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
                data-error-message="Select a Date "
              />
            </div>

            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium lg:text-h2-large bg-primary-bg ${buttonStyles.primary}`}
              type="submit"
              value="Add Entry"
              //TODO - Does not have same reaction as <Button> dosnt feel like its clicked
            />
          </form>
        </div>
      </PageLayout>
    </>
  );
}

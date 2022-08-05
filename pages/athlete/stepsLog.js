import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";

export default function stepsLog() {
  return (
    <>
      <Meta title="Steps Log" />
      <Navbar title="Steps Log" backPath={"/athlete/stepsDash"} />
      <PageLayout>
        <div className="w-full border-2 border-black bg-primary-bg text-center">
          {" "}
          Month 2022
        </div>
        <div className="w-full h-screen border-2">
          {/* Function will return date & value */}
          <div
            id="Date & Log"
            className="text-center bg-slate-300 columns-2 border-2 border-black gap-1"
          >
            <p>06/08/22</p>
            <p>14036</p>
          </div>
          {/* End of returned function */}
        </div>
      </PageLayout>
    </>
  );
}

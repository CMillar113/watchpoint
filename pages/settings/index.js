import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import NavMenu from "../../src/components/NavMenu";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
export default function settings() {
  return (
    <>
      <Meta title="Settings" />
      <Navbar title="Settings" backPath={"/athlete"} />
      <PageLayout>
        <Button
          path="/settings/connectToCoach"
          label="Connect With Coach"
        ></Button>
        <div className=" mt-6 w-full h-auto flex justify-center ">
          <div className=" border-2 border-black rounded-sm w-5/6 h-32 flex justify-center content-center ">
            Theme Selector
          </div>
        </div>
      </PageLayout>
    </>
  );
}

import Meta from "../src/components/Meta";
import Navbar from "../src/components/NavBar";
import Button from "../src/components/Button";
import PageLayout from "../src/components/PageLayout";

export default function about() {
  return (
    <>
      <Meta title="About" />
      <Navbar title="About" backPath={"/"} />

      <PageLayout>
        <div className="w-full flex flex-col items-center ">
          <div className="mb-5 flex flex-col justify-start items-center text-center px-2 ">
            <h2>Welcome</h2>
            <p className=" text-center text-slate-700 mt-2 px-2 border-2 border-black rounded-md">
              Watchpoint is a completly free, single entery point for all your
              fitness & Health tracking needs{" "}
            </p>
          </div>

          <div className="mb-5 flex flex-col justify-start items-center text-center px-2 ">
            <h2>WatchPoint Aims:</h2>
            <p className=" text-center text-slate-700 mt-2 px-2 border-2 border-black rounded-md">
              The aim of watchpoint is to provide a simple, high quality, 100%
              free, single entery point fitness tracking system that accomodates
              all users
            </p>
          </div>

          <div className="mb-8 flex flex-col justify-start items-center text-center px-2 ">
            <h2>How To Use:</h2>
            <p className=" text-center text-slate-700 mt-2 px-2 border-2 border-black rounded-md">
              Create an account, select what elements you wish to track and use
              watchpoint on the daily to log all your info that will help you
              chase your goals
            </p>
          </div>
        </div>

        <Button path="/api/auth/login" label="Sign In / Register" />
      </PageLayout>
    </>
  );
}

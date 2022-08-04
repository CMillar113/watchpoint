import Meta from "../src/components/Meta";
import Navbar from "../src/components/NavBar";
import PageLayout from "../src/components/PageLayout";
import buttonStyles from "../styles/Button.module.css";

export default function resetPassword() {
  return (
    <>
      <Meta title="Password Reset" />
      <Navbar title="Reset Password" backPath={"/signIn"} />
      <PageLayout>
        <div className="mt-5 text-center items-center content-center w-full">
          <legend className="mb-2 ">Email Address</legend>
          <form action="/passwordReset" method="post" data-validate="parsley">
            <div className=" mb-2 ">
              <input
                className="border-2 border-black w-8/12"
                type="email"
                placeholder=" Email*"
                name="email"
                id="email"
                data-required="true"
                data-error-message="Your Email is required"
              />
            </div>
            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium lg:text-h2-large bg-primary-bg ${buttonStyles.primary}`}
              type="submit"
              value="Reset Password"
              //TODO - Does not have same reaction as <Button> dosnt feel like its clicked
            />
          </form>
        </div>
      </PageLayout>
    </>
  );
}

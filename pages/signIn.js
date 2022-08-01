import Meta from "../src/components/Meta";
import Navbar from "../src/components/NavBar";
import buttonStyles from "../styles/Button.module.css";
import Link from "next/link";
import PageLayout from "../src/components/PageLayout";

export default function signIn() {
  return (
    <>
      <Meta title="Sign In" />
      <Navbar title="Sign In" />
      <PageLayout>
        <div className="bg-white border-2 border-black rounded-2xl shadow-xl items-center text-center px-8  ">
          <p className=" text-primary-fadedtext ">
            Sign in to your account and start tracking your progress!
          </p>
        </div>

        <div className="mt-5 text-center items-center content-center">
          <form action="/accountCreated" method="post" data-validate="parsley">
            <div className=" mb-2">
              <input
                className="border-2 border-black w-8/12"
                type="text"
                placeholder=" E-mail*"
                name="email"
                data-required="true"
                data-type="email"
                data-error-message="Your E-mail is required"
              />
            </div>

            <div className=" mb-2">
              <input
                className="border-2 border-black w-8/12"
                type="text"
                placeholder=" Password*"
                name="password"
                data-required="true"
                data-type="password"
                data-error-message="A password is required"
              />
            </div>

            <p className="mt-5 text-primary-fadedtext text-center text-xs px-9 ">
              Forgotten Your Password? Reset it{" "}
              <Link href="/resetPassword">Here</Link>
            </p>

            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium lg:text-h2-large bg-primary-bg ${buttonStyles.primary}`}
              type="submit"
              value="Sign In"
              //TODO - Does not have same reaction as <Button> dosnt feel like its clicked
            />
          </form>
        </div>
      </PageLayout>
    </>
  );
}
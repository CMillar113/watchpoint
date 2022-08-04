import Meta from "../src/components/Meta";
import Navbar from "../src/components/NavBar";
import buttonStyles from "../styles/Button.module.css";
import PageLayout from "../src/components/PageLayout";

export default function createAccount() {
  return (
    <>
      <Meta title="Create Account" />
      <Navbar title={"Create Account"} backPath={"/"} />
      <PageLayout>
        <div className="bg-white border-2 border-black rounded-2xl shadow-xl items-center text-center px-8  ">
          <p className=" text-primary-fadedtext ">
            Fill in your details below to create your very own WatchPoint
            account
          </p>
        </div>

        <div className="mt-5 text-center items-center content-center w-full">
          <legend className="mb-2 ">Account Information</legend>
          <form action="/accountCreated" method="post" data-validate="parsley">
            <div className=" mb-2 ">
              <input
                className="border-2 border-black w-8/12"
                type="text"
                placeholder=" First Name*"
                name="firstname"
                id="firstname"
                data-required="true"
                data-error-message="Your First Name is required"
              />
            </div>
            <div className=" mb-2 ">
              <input
                className="border-2 border-black w-8/12"
                type="text"
                placeholder=" Surname*"
                name="surname"
                id="surname"
                data-required="true"
                data-error-message="Your surname is required"
              />
            </div>

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
                placeholder=" Confirm E-mail*"
                name="cemail"
                data-required="true"
                data-error-message="Your E-mail must correspond"
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

            <div className="mb-2">
              Coach/Athlete account selector placeholder
              {/* //TODO - Add in  selector button */}
            </div>

            <p className=" text-primary-fadedtext text-center text-sm px-9 ">
              {" "}
              A Coach account is used to track and update client plans. (Not for
              personal use)
            </p>

            <p className="mt-5 text-primary-fadedtext text-center text-xs px-9 ">
              By proceeding you also agree to the Terms of Service and Privacy
              Policy
            </p>
            <input
              className={`mt-2 text-h2-mobile md:text-h2-medium lg:text-h2-large bg-primary-bg ${buttonStyles.primary}`}
              type="submit"
              value="Confirm"
              //TODO - Does not have same reaction as <Button> dosnt feel like its clicked
            />
          </form>
        </div>

        {/* <Button path="/accountCreated" label="Confirm" /> */}
      </PageLayout>
    </>
  );
}

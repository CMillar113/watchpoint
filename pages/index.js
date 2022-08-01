import Meta from "../src/components/Meta";
import Button from "../src/components/Button";
import Image from "next/image";
import PageLayout from "../src/components/PageLayout";
import { USERNAME } from "../src/constants";

export default function Home() {
  const isset = (ref) => typeof ref !== "undefined";
  if (isset(USERNAME)) {
    console.log("True");
  }

  return (
    <>
      <Meta title="Watchpoint" />

      <PageLayout>
        <div className="w-full flex flex-col items-center">
          <h1 className="mt-2 text-h1-mobile md:text-h1-medium lg:text-h1-large ">
            Watchpoint
          </h1>
          <Image
            src="/images/WatchpointLogo.jpg"
            alt=""
            height={200}
            width={200}
            alt="Logo"
          ></Image>
          <h2 className="mt-2 text-h2-mobile md:text-h2-medium lg:text-h2-large">
            {" "}
            The All - in - One{" "}
          </h2>
          <h2 className="mt-0 mb-4 text-h2-mobile md:text-h2-medium lg:text-h2-large">
            {" "}
            Health & Fitness Lifestyle Tracker{" "}
          </h2>
          <Button path="/about" label="About WatchPoint" />
          <Button path="/createAccount" label="Create Account" />
          <Button path="/signIn" label="Sign In" />
        </div>
      </PageLayout>
    </>
  );
}

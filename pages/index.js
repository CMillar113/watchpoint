import Meta from "../src/components/Meta";
import Button from "../src/components/Button";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import PageLayout from "../src/components/PageLayout";

export default function Home() {
  return (
    <>
      <Meta title="Watchpoint" />

      <PageLayout>
        <div className="w-full flex flex-col items-center">
          <h1 className="mt-2 text-h1-mobile md:text-h1-medium lg:text-h1-large ">
            Watchpoint
          </h1>

          <Image
            className={styles.logo}
            src="/images/WatchpointLogo.jpg"
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

          {/* <Button
          onClick={() => {
            alert("Hello");
          }}
          label="Hello button" */}
          {/* /> */}
        </div>
      </PageLayout>
    </>
  );
}

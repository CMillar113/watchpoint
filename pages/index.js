import { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";

import { useUser } from "@auth0/nextjs-auth0";

import Meta from "../src/components/Meta";
import Button from "../src/components/Button";
import PageLayout from "../src/components/PageLayout";
import Logo from "../src/assets/watchpointLogo.jpg";
import FullScreenSpinner from "../src/components/FullScreenSpinner";

export default function Home() {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/accountCheck");
    }
  }, [user]);

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (user) {
    // Don't show login form flash to logged in users before redirecting
    return null;
  }

  return (
    <>
      <Meta title="Watchpoint" />

      <PageLayout>
        <div className="w-full flex flex-col items-center mt-32">
          <h1 className="mt-2 text-h1-mobile md:text-h1-medium lg:text-h1-large ">
            WatchPoint
          </h1>
          <Image src={Logo} height={100} width={100} alt="Logo"></Image>
          <h2 className="mt-2 text-h2-mobile md:text-h2-medium lg:text-h2-large">
            {" "}
            The All - in - One{" "}
          </h2>
          <h2 className="mt-0 mb-4 text-h2-mobile md:text-h2-medium lg:text-h2-large">
            {" "}
            Health & Fitness Lifestyle Tracker{" "}
          </h2>
          <Button path="/about" label="About WatchPoint" />
          <Button path="/api/auth/login" label="Sign In / Register" />
        </div>
      </PageLayout>
    </>
  );
}

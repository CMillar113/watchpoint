import PageLayout from "../src/components/PageLayout";
import Image from "next/image";
import Button from "../src/components/Button";

export default function accountCreated() {
  return (
    <>
      <PageLayout>
        <div className="bg-white border-2 border-black rounded-2xl mt-16 shadow-xl items-center text-center  ">
          <h2>Account Created</h2>

          <Image
            src="/images/WatchpointLogo.jpg"
            alt=""
            height={200}
            width={200}
            alt="Logo"
          ></Image>

          <p className="mt-2 text-primary-fadedtext">
            You can start using the application now
          </p>

          <Button path="/signIn" label="Go To Sign In" />
        </div>
      </PageLayout>
    </>
  );
}

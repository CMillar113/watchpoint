import PageLayout from "../../src/components/PageLayout";
import Image from "next/image";
import Button from "../../src/components/Button";

export default function coachDisconnected() {
  return (
    <>
      <PageLayout>
        <div className="bg-white border-2 border-black rounded-2xl mt-16 shadow-xl items-center text-center  ">
          <h2>Coach Connected</h2>

          <Image
            src="/images/WatchpointLogo.jpg"
            alt=""
            height={200}
            width={200}
            alt="Logo"
          ></Image>

          <Button path="/settings" label="settings" />
        </div>
      </PageLayout>
    </>
  );
}

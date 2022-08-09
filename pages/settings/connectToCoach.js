import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";

export default function connectToCoach() {
  return (
    <>
      <Meta title="Connect to Coach" />
      <Navbar title="Coach Search" backPath={"/settings"} />
      <PageLayout></PageLayout>
    </>
  );
}

import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";

export default function setGoals() {
  return (
    <>
      <Meta title="Set Goals" />
      <Navbar title="Set Goals" backPath={"/plan/selectElements"} />
      <PageLayout>
        {/* If bodyweight selected */}
        {/* If steps selected */}
        {/* If sleep selected */}
        {/* if any workouts selected */}
      </PageLayout>
    </>
  );
}

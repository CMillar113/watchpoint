import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";

import { USERNAME } from "../../src/constants";

export default function athlete() {
  const isset = (ref) => typeof ref !== "undefined";
  if (isset(USERNAME)) {
    console.log("True");
  } else {
    let USERNAME = "Undefined";
  } //TODO- Unhandled rejection error TODO - figure out this logic

  return (
    <>
      <Meta title="Athlete - Home" />
      <Navbar title={`${USERNAME}`} />
      <PageLayout></PageLayout>
    </>
  );
}

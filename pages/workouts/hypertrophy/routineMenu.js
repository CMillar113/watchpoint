import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import NavMenu from "../../../src/components/NavMenu";
import PageLayout from "../../../src/components/PageLayout";

export default function routineMenu() {
  const workoutTitle = "Hypertrophy";
  const workoutPathTitle = "hypertrophy";
  return (
    <>
      <Meta title={workoutTitle} />
      <Navbar title={workoutTitle} backPath={"/workouts/hypertrophy"} />
      <PageLayout>Yo</PageLayout>
    </>
  );
}

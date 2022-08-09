import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import NavMenu from "../../../src/components/NavMenu";
import PageLayout from "../../../src/components/PageLayout";

export default function hypertrophyDash() {
  const workoutTitle = "Hypertrophy";
  const workoutPathTitle = "hypertrophy";
  return (
    <>
      <Meta title={workoutTitle} />
      <Navbar title={workoutTitle} backPath={"/workouts/selectWorkout"} />
      <PageLayout>
        <NavMenu
          pathLeft={`{/workouts/${workoutPathTitle}/routines}`}
          labelLeft={"Routines"}
          pathCenter={"/athlete"}
          labelCenter={"Home"}
          pathRight={`{/workouts/${workoutPathTitle}/new}`}
          labelRight={"New Workout"}
        ></NavMenu>
        Month and upt to date list of wokrouts last logged being at top
      </PageLayout>
    </>
  );
}

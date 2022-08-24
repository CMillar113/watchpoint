import Meta from "../../../src/components/Meta";
import Navbar from "../../../src/components/NavBar";
import NavMenu from "../../../src/components/NavButtonOne";
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
          path={`/workouts/${workoutPathTitle}/routineMenu`}
          label={"Routines"}
        ></NavMenu>
        <hr className="bg-black" />
        <p className="text-center">
          Month and up to date list of wokrouts last logged being at top
        </p>

        <div className="w-full h-auto flex justify-center border-2 border-black rounded-lg">
          <h3 className=" text-center">Routine Name</h3>
        </div>
      </PageLayout>
    </>
  );
}

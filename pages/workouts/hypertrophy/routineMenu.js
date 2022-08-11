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
      <Navbar title={workoutTitle} backPath={`/workouts/${workoutPathTitle}`} />
      <PageLayout>
        <div className="w-full flex justify-center">
          <div className="mb-5 w-2/3 h-10 border-2 border-black rounded-md text-center">
            Searchbar placeholder
          </div>
        </div>
        <div className=" w-full h-10  border-black border-2 flex ">
          Routine Name
        </div>
      </PageLayout>
    </>
  );
}

function checkForRoutines(passedElement, passedAthlete) {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/athlete_routine");
        const result = await response.json();

        if (response.ok) {
          setMetrics(result);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (metrics !== undefined) {
    let routines = metrics
      .filter(function (metric) {
        return metric.athlete_id === passedAthlete;
      })
      .filter(function (metric) {
        return metric.element_id === passedElement;
      })
      .map(function (metric) {
        return (
          <div className=" w-full h-10  border-black border-2 flex ">
            {metric.routine_name}
          </div>
        );
      });
    return routines;
  }
}

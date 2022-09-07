import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import FullScreenSpinner from "../../src/components/FullScreenSpinner";
export default function settings() {
  const { user } = useUser();
  const [coachId, setCoachId] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    if (!isLoading) return;
    setLoading(true);
    const athlete0Id = user.sub;
    (async function () {
      try {
        const response = await fetch(
          `/api/athlete_coach?athlete0Id=${athlete0Id}`
        );
        const result = await response.json();
        console.log("resul", result);
        if (response.ok) {
          if (Array.isArray(result) && result.length < 1) {
            setCoachId(undefined);
          } else {
            setCoachId(result[0].coach_id);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, isLoading]);

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (coachId !== undefined) {
    return (
      <>
        <Meta title="Settings" />
        <Navbar title="Settings" backPath={"/athlete"} />
        <PageLayout>
          <Button
            path={`/settings/myCoach?coachId=${coachId}`}
            label="My Coach"
          ></Button>
          <div className="w-full flex justify-center">
            <p className="w-2/3 text-center border-2 black-2 rounded-md">
              Connect using a private code created by your coach
            </p>
          </div>
        </PageLayout>
      </>
    );
  } else {
    return (
      <>
        <Meta title="Settings" />
        <Navbar title="Settings" backPath={"/athlete"} />
        <PageLayout>
          <div className="w-full flex justify-center">
            <p className="w-2/3 text-center border-2 black-2 rounded-md">
              Connect using a private code created by your coach{" "}
            </p>
          </div>
          <Button
            path="/settings/connectToCoach"
            label="Connect With Coach"
          ></Button>
        </PageLayout>
      </>
    );
  }
}

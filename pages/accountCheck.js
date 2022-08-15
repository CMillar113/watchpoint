/**
 * Page that will link auth0 database and mysql - due to privlidges this iwll work for demoing
 * reality would prefer access between auth and mysql without a middleman
 */

import { useUser } from "@auth0/nextjs-auth0";
import router from "next/router";
import { useEffect, useState } from "react";

export default function accountChecking() {
  const { user, error, isLoading } = useUser();

  const auth0Email = user.name;
  console.log(auth0Email);
  //   const auth0PrimaryKey = user.sub;
  //TODO - create a function that gets the auth0user sub and then writes the user details to SQL - USER CREATION

  let userInfo = checkUserEmail(auth0Email); //TODO- need to put something incase no return
  console.log("YET AGAIN INTO THE ABYSS");
  console.log(userInfo);

  //Check if email is in sql - if not create a new user using the sub given by auth0, if email is used
  //continue with application
  //basiclaly make sure that auth0 accounts are in the sql database with the sub unique id as the primary key
  if (userInfo === user.name) {
    console.log("yes");
    router.push("/athlete");
  } else {
    console.log("ERROR");
  }
  return (
    <>
      <p>
        working on it {user.name} {userInfo}
      </p>
    </>
  );
}

function checkUserEmail(auth0Email) {
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("/api/userDetails");
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
    let userInfo = metrics
      .filter(function (metric) {
        return metric.email_address === auth0Email;
      })
      .map(function (metric) {
        // console.log(metric);
        return metric.email_address;
      });

    return userInfo[0];
  }
}
